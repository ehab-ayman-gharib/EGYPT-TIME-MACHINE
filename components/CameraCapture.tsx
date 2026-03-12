import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RefreshCw, AlertCircle, ChevronLeft, ImagePlus, Camera, Loader2, Printer, QrCode, X, CheckCircle2, XCircle } from 'lucide-react';
import {
  bootstrapCameraKit,
  createMediaStreamSource,
  createImageSource,
  CameraKitSession,
} from '@snap/camera-kit';
import { CAMERAKIT_CONFIG } from '../services/camerakitConfig';
import { EraData, FaceDetectionResult } from '../types';

interface CameraCaptureProps {
  era: EraData | null;
  onCapture: (image: string, faceData: FaceDetectionResult) => void;
  onBack: () => void;
  isProcessing?: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ era, onCapture, onBack, isProcessing = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationFrameIdRef = useRef<number | null>(null);
  const [session, setSession] = useState<CameraKitSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [sourceMode, setSourceMode] = useState<'camera' | 'image'>('camera');
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);

  // QR Code & Print state
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showQrOverlay, setShowQrOverlay] = useState(false);
  const [printStatus, setPrintStatus] = useState<'idle' | 'printing' | 'success' | string>('idle');

  // Helper: create a rotated + mirrored stream from a raw camera stream
  // Draws each frame from the landscape camera onto an offscreen canvas rotated 90° CW and mirrored,
  // then returns a new MediaStream via captureStream() that is already portrait-oriented.
  const createRotatedStream = useCallback((rawStream: MediaStream): MediaStream => {
    const videoTrack = rawStream.getVideoTracks()[0];
    const settings = videoTrack.getSettings();
    const srcW = settings.width || 1920;
    const srcH = settings.height || 1080;

    // After 90° rotation: output width = srcH, output height = srcW
    const outW = srcH; // e.g. 1080
    const outH = srcW; // e.g. 1920

    // Create or reuse offscreen canvas
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    const offCanvas = offscreenCanvasRef.current;
    offCanvas.width = outW;
    offCanvas.height = outH;
    const ctx = offCanvas.getContext('2d')!;

    // Create a hidden video element to read frames from the raw stream
    const video = document.createElement('video');
    video.srcObject = rawStream;
    video.muted = true;
    video.playsInline = true;
    video.play();

    // Cancel any previous render loop
    if (rotationFrameIdRef.current !== null) {
      cancelAnimationFrame(rotationFrameIdRef.current);
    }

    const drawFrame = () => {
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        ctx.save();
        ctx.clearRect(0, 0, outW, outH);
        // Move origin to center, rotate 90° CW, mirror horizontally
        ctx.translate(outW / 2, outH / 2);
        ctx.rotate(Math.PI / 2);
        ctx.scale(-1, 1); // mirror for selfie
        // Draw the video centered (remember: after rotation, axes are swapped)
        ctx.drawImage(video, -srcW / 2, -srcH / 2, srcW, srcH);
        ctx.restore();
      }
      rotationFrameIdRef.current = requestAnimationFrame(drawFrame);
    };
    drawFrame();

    // Capture the offscreen canvas as a MediaStream
    const rotatedStream = (offCanvas as any).captureStream(30) as MediaStream;
    console.log(`[CameraKit] Rotated stream created: ${outW}x${outH} from ${srcW}x${srcH}`);
    return rotatedStream;
  }, []);

  // Initialize CameraKit
  useEffect(() => {
    let currentSession: CameraKitSession | null = null;
    let stream: MediaStream | null = null;

    const init = async () => {
      try {
        setIsInitializing(true);

        // Bootstrap CameraKit
        const cameraKit = await bootstrapCameraKit({
          apiToken: CAMERAKIT_CONFIG.API_TOKEN,
        });

        // Create Session - IMPORTANT: Set dimensions BEFORE createSession
        if (!canvasRef.current) return;

        canvasRef.current.width = 1080;
        canvasRef.current.height = 1920;
        console.log(`[CameraKit] Canvas dimensions set to 1080x1920 before session creation`);

        currentSession = await cameraKit.createSession({
          liveRenderTarget: canvasRef.current,
        });
        setSession(currentSession);

        // Get Camera Stream — request landscape since most webcams are landscape
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        });

        // Store raw stream ref so we can stop it on cleanup
        streamRef.current = stream;

        // Log raw stream settings
        const videoTrack = stream.getVideoTracks()[0];
        const settings = videoTrack.getSettings();
        console.log(`[CameraKit] Raw camera resolution: ${settings.width}x${settings.height}`);

        // Create a rotated stream (landscape → portrait) to feed to CameraKit
        const rotatedStream = createRotatedStream(stream);

        // Set Source using the rotated stream
        const source = createMediaStreamSource(rotatedStream);

        await currentSession.setSource(source);

        // EXPLICITLY set render size on BOTH source and session to ensure high quality UI/Text
        // This MUST be called after setSource, otherwise it throws an "not attached" error
        if (source.setRenderSize) {
          await source.setRenderSize(1080, 1920);
          console.log(`[CameraKit] Source render size set to 1080x1920`);
        }

        // Some SDK versions support setRenderSize on the session as well
        if ((currentSession as any).setRenderSize) {
          (currentSession as any).setRenderSize(1080, 1920);
          console.log(`[CameraKit] Session render size set to 1080x1920`);
        }

        // Ensure canvas width/height hasn't been reset by CameraKit
        if (canvasRef.current.width !== 1080 || canvasRef.current.height !== 1920) {
          console.warn(`[CameraKit] Canvas was resized to ${canvasRef.current.width}x${canvasRef.current.height}, restoring to 1080x1920`);
          canvasRef.current.width = 1080;
          canvasRef.current.height = 1920;
        }

        currentSession.play();

        // Load the era-specific lens, or fall back to default
        const lensIdToLoad = era?.lensId || CAMERAKIT_CONFIG.DEFAULT_LENS_ID;
        if (lensIdToLoad) {
          try {
            console.log(`[CameraKit] Loading lens: ${lensIdToLoad} (era: ${era?.name || 'default'})`);
            const lens = await cameraKit.lensRepository.loadLens(lensIdToLoad, CAMERAKIT_CONFIG.GROUP_ID);
            await currentSession.applyLens(lens);
            console.log(`[CameraKit] Lens applied successfully`);
          } catch (lensErr: any) {
            console.warn(`[CameraKit] Failed to load lens (camera will work without it):`, lensErr?.message || lensErr);
          }
        }

        setIsInitializing(false);
      } catch (err: any) {
        console.error('[CameraKit] Initialization failed:', err?.message || err);
        console.error('[CameraKit] Full error:', err);
        setError(`Failed to initialize CameraKit: ${err?.message || 'camera access denied'}`);
        setIsInitializing(false);
      }
    };

    init();

    return () => {
      // Stop rotation render loop
      if (rotationFrameIdRef.current !== null) {
        cancelAnimationFrame(rotationFrameIdRef.current);
        rotationFrameIdRef.current = null;
      }
      if (currentSession) {
        currentSession.pause();
        currentSession.destroy();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [era]);

  const handleCapture = useCallback(async () => {
    if (!canvasRef.current || isCapturing) return;
    setIsCapturing(true);

    try {
      // Small artificial delay for the flash effect
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 500);

      // Capture photo from canvas with MAX quality
      // We use the canvas internal dimensions which we set to match the stream resolution
      console.log(`[Capture] Capturing from canvas: ${canvasRef.current.width}x${canvasRef.current.height}`);
      const imageData = canvasRef.current.toDataURL('image/jpeg', 1.0);

      // Since we are skipping AI for now, we provide a default face detection result
      const faceData: FaceDetectionResult = {
        maleCount: 1,
        femaleCount: 0,
        childCount: 0,
        totalPeople: 1
      };

      onCapture(imageData, faceData);
    } catch (err) {
      console.error("Capture failed:", err);
    } finally {
      setIsCapturing(false);
    }
  }, [onCapture, isCapturing]);

  // Handle countdown logic
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      handleCapture();
      setCountdown(null);
    }
  }, [countdown, handleCapture]);

  const startCaptureSequence = () => {
    if (countdown !== null || isInitializing || isCapturing) return;
    setCountdown(3);
  };

  // Switch lens source to an uploaded image
  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session) return;

    const objectUrl = URL.createObjectURL(file);
    setUploadedImageSrc(objectUrl);

    const img = new Image();
    img.src = objectUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
    });

    try {
      // Stop live camera stream tracks to free the camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      const imageSource = createImageSource(img);

      await session.setSource(imageSource);

      // Enforce high resolution for image source as well - must be AFTER setSource
      if (imageSource.setRenderSize) {
        await imageSource.setRenderSize(1080, 1920);
      }

      if ((session as any).setRenderSize) {
        (session as any).setRenderSize(1080, 1920);
      }

      session.play();
      setSourceMode('image');
    } catch (err) {
      console.error('[CameraKit] Failed to set image source:', err);
    }

    // Reset file input so the same file can be re-selected
    e.target.value = '';
  }, [session]);

  // Switch lens source back to live camera
  const handleSwitchToCamera = useCallback(async () => {
    if (!session) return;
    try {
      const rawStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      streamRef.current = rawStream;

      // Rotate the stream before feeding to CameraKit
      const rotatedStream = createRotatedStream(rawStream);
      const source = createMediaStreamSource(rotatedStream);

      await session.setSource(source);

      // Enforce high resolution - must be AFTER setSource
      if (source.setRenderSize) {
        await source.setRenderSize(1080, 1920);
      }

      if ((session as any).setRenderSize) {
        (session as any).setRenderSize(1080, 1920);
      }

      session.play();
      setSourceMode('camera');
      setUploadedImageSrc(null);
    } catch (err) {
      console.error('[CameraKit] Failed to switch back to camera:', err);
    }
  }, [session, createRotatedStream]);

  // Capture only the rectangular frame region from the CameraKit canvas, scaled to 1200x1800
  const captureFramedImage = useCallback((): string | null => {
    if (!canvasRef.current) return null;

    const srcCanvas = canvasRef.current;
    const srcW = srcCanvas.width;  // 1080
    const srcH = srcCanvas.height; // 1920

    // ─── FRAME CROP REGION (percentage of canvas) ───
    // Adjust these values to match exactly where the frame sits on your lens.
    // Use the browser DevTools to fine-tune if needed.
    const frameLeft = 0.095;  // 5% from left
    const frameTop = 0.11;  // 6% from top
    const frameRight = 0.095;  // 5% from right
    const frameBottom = 0.25;  // 22% from bottom (buttons area below frame)

    const cropX = Math.round(srcW * frameLeft);
    const cropY = Math.round(srcH * frameTop);
    const cropW = Math.round(srcW * (1 - frameLeft - frameRight));
    const cropH = Math.round(srcH * (1 - frameTop - frameBottom));

    console.log(`[Capture] Frame crop region: x=${cropX}, y=${cropY}, w=${cropW}, h=${cropH} (from ${srcW}x${srcH})`);

    // Output: 1200x1800 (2:3)
    const targetW = 1200;
    const targetH = 1800;

    const captureCanvas = document.createElement('canvas');
    captureCanvas.width = targetW;
    captureCanvas.height = targetH;
    const ctx = captureCanvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(srcCanvas, cropX, cropY, cropW, cropH, 0, 0, targetW, targetH);
    const imageData = captureCanvas.toDataURL('image/jpeg', 0.95);
    console.log(`[Capture] Framed image captured: ${targetW}x${targetH}`);
    return imageData;
  }, []);

  // Handle Get QR Code button
  const handleGetQRCode = useCallback(async () => {
    if (isUploading) return;

    const imageData = captureFramedImage();
    if (!imageData) return;

    setIsUploading(true);
    setShowQrOverlay(true);
    setQrCodeUrl(null);

    try {
      const response = await fetch(imageData);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('image', blob, 'result.png');
      formData.append('folder', 'kemet-mirror');
      formData.append('metadata', JSON.stringify({
        event: 'Cairo Airport Photobooth',
        photobooth_id: 'kemet_mirror_1',
        era: era?.name || 'unknown',
      }));

      const uploadResponse = await fetch('https://qr-web-api.vercel.app/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error('Upload failed');

      const data = await uploadResponse.json();
      setQrCodeUrl(data.qrCodeUrl);
      console.log('[QR] Upload successful, QR URL:', data.qrCodeUrl);
    } catch (error) {
      console.error('[QR] Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  }, [isUploading, captureFramedImage, era]);

  // Handle Print Photo button
  const handlePrintPhoto = useCallback(async () => {
    const imageData = captureFramedImage();
    if (!imageData) return;

    setPrintStatus('printing');

    const isElectron = navigator.userAgent.indexOf('Electron') !== -1;
    if (isElectron && (window as any).require) {
      try {
        const { ipcRenderer } = (window as any).require('electron');
        const preferredPrinter = localStorage.getItem('preferredPrinter') || '';

        // --- Rotate the image 90 degrees to Landscape (1800x1200) for native DNP printing ---
        const rotDataUrl = await new Promise<string>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const tempCanvas = document.createElement('canvas');
            // Swap width and height for a 90-degree rotation (1200x1800 -> 1800x1200)
            tempCanvas.width = img.height; 
            tempCanvas.height = img.width; 
            const tCtx = tempCanvas.getContext('2d');
            if (tCtx) {
              tCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
              // Rotate 90 degrees clockwise
              tCtx.rotate((90 * Math.PI) / 180);
              tCtx.drawImage(img, -img.width / 2, -img.height / 2);
              resolve(tempCanvas.toDataURL('image/jpeg', 1.0));
            } else {
              resolve(imageData); // Fallback
            }
          };
          img.src = imageData;
        });

        const result = await ipcRenderer.invoke('print-image', {
          imageSrc: rotDataUrl,
          printerName: preferredPrinter,
        });

        if (result.success) {
          setPrintStatus('success');
          setTimeout(() => setPrintStatus('idle'), 3000);
        } else {
          setPrintStatus(`error:${result.failureReason}`);
          setTimeout(() => setPrintStatus('idle'), 5000);
        }
      } catch (e) {
        console.error('[Print] Electron print failed:', e);
        setPrintStatus('error:Print failed');
        setTimeout(() => setPrintStatus('idle'), 5000);
      }
    } else {
      // Browser fallback print
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
      document.body.appendChild(iframe);
      const doc = iframe.contentWindow?.document || iframe.contentDocument;
      if (doc) {
        doc.write(`<html><head><style>@page{margin:0;size:4in 6in;}body{margin:0;display:flex;justify-content:center;align-items:center;background:white;}img{max-width:100%;height:auto;display:block;}</style></head><body><img src="${imageData}"/><script>window.onload=()=>{window.focus();window.print();setTimeout(()=>{window.parent.document.body.removeChild(window.frameElement);},1000);};<\/script></body></html>`);
        doc.close();
      }
      setPrintStatus('idle');
    }
  }, [captureFramedImage]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-900">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-slate-400">{error}</p>
        <button onClick={onBack} className="mt-8 px-8 py-3 bg-slate-800 text-white rounded-full">Go Back</button>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-black relative flex flex-col overflow-hidden">
      {/* CameraKit Canvas */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Invisible overlay buttons — positioned over the lens-rendered buttons */}
      {!isInitializing && !isProcessing && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Print Photo — positioned over the left lens button */}
          <button
            onClick={handlePrintPhoto}
            className="pointer-events-auto absolute opacity-0"
            style={{
              left: '13%',
              bottom: '18%',
              width: '30%',
              height: '3%',
            }}
            aria-label="Print Photo"
          />
          {/* Get QR Code — positioned over the right lens button */}
          <button
            onClick={handleGetQRCode}
            className="pointer-events-auto absolute opacity-0"
            style={{
              right: '13%',
              bottom: '18%',
              width: '30%',
              height: '3%',
            }}
            aria-label="Get QR Code"
          />
        </div>
      )}

      {/* Print Status Overlay */}
      {printStatus !== 'idle' && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-[110] flex flex-col items-center justify-center">
          <div className="bg-black/80 backdrop-blur-xl border border-yellow-500/30 p-12 rounded-full flex flex-col items-center gap-6 shadow-[0_0_100px_rgba(0,0,0,0.9)] min-w-[300px]">
            {printStatus === 'printing' && (
              <>
                <div className="relative">
                  <Printer className="text-yellow-500 animate-bounce" size={64} />
                  <div className="absolute -inset-4 bg-yellow-500/20 blur-2xl rounded-full animate-pulse" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl font-black text-white uppercase tracking-widest">Printing...</span>
                  <span className="text-xs text-yellow-500/70 font-bold uppercase tracking-widest">Your photo is being prepared</span>
                </div>
              </>
            )}
            {printStatus === 'success' && (
              <>
                <CheckCircle2 className="text-green-500" size={64} />
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl font-black text-white uppercase tracking-widest">Completed!</span>
                  <span className="text-xs text-green-500/70 font-bold uppercase tracking-widest">Take your memory with you</span>
                </div>
              </>
            )}
            {typeof printStatus === 'string' && printStatus.startsWith('error') && (
              <>
                <XCircle className="text-red-500" size={64} />
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl font-black text-white uppercase tracking-widest">Printer Error</span>
                  <span className="text-xs text-red-500/70 font-bold uppercase tracking-widest text-center max-w-[250px]">
                    {printStatus.split(':')[1] || 'Unknown error occurred'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* QR Code Overlay */}
      {showQrOverlay && (
        <div className="absolute inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center">
          <div className="relative bg-slate-900/90 border border-yellow-500/30 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-[0_0_80px_rgba(0,0,0,0.9)] max-w-sm w-[90%]">
            {/* Close button */}
            <button
              onClick={() => { setShowQrOverlay(false); setQrCodeUrl(null); }}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-black text-yellow-500 uppercase tracking-widest">Scan QR Code</h2>
            <p className="text-xs text-slate-400 text-center -mt-3">Scan to download your photo to your phone</p>

            <div className="w-48 h-48 bg-white rounded-2xl shadow-2xl p-2 flex items-center justify-center border-2 border-yellow-600/50">
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-yellow-600" size={40} />
                  <span className="text-xs text-slate-600 font-bold uppercase">Uploading...</span>
                </div>
              ) : qrCodeUrl ? (
                <img src={qrCodeUrl} alt="QR Code" draggable="false" className="w-full h-full object-contain" />
              ) : (
                <QrCode className="text-slate-400 opacity-20" size={48} />
              )}
            </div>

            <button
              onClick={() => { setShowQrOverlay(false); setQrCodeUrl(null); }}
              className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-xl transition-all uppercase tracking-widest text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Initializing Overlay */}
      {isInitializing && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <RefreshCw className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
          <p className="text-white text-lg font-bold brand-font tracking-wider uppercase">Initializing CameraKit</p>
          <p className="text-slate-300 text-xs mt-2 font-mono">Loading face swap technology...</p>
        </div>
      )}

      {/* Countdown Overlay */}
      {countdown !== null && countdown > 0 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 pointer-events-none">
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-pulse-slow">
            <img
              src="./Countdown_Container.png"
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
            />
            <span className="relative z-10 text-7xl md:text-[9rem] font-bold text-white countdown-font drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              {countdown}
            </span>
          </div>
        </div>
      )}

      {/* Flash Effect */}
      {showFlash && (
        <div className="absolute inset-0 z-[100] bg-white animate-flash-out pointer-events-none" />
      )}

      {/* Header */}
      {!isProcessing && (
        <div className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
          <button
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
      )}

      {/* Bottom Source Toolbar */}
      {!isProcessing && !isInitializing && (
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-4 px-6 pb-8 pt-4 bg-gradient-to-t from-black/70 to-transparent">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          {sourceMode === 'camera' ? (
            // Show upload-image button while in camera mode
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              title="Upload an image to use as the lens source"
            >
              <ImagePlus size={18} />
              <span>Upload Image</span>
            </button>
          ) : (
            // Show switch-to-camera button while in image mode
            <button
              onClick={handleSwitchToCamera}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(255,200,0,0.25), rgba(255,200,0,0.10))',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,200,0,0.4)',
                boxShadow: '0 4px 20px rgba(255,180,0,0.2)',
              }}
              title="Switch back to live camera"
            >
              <Camera size={18} />
              <span>Use Camera</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};