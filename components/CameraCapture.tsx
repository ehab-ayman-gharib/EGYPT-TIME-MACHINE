import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RefreshCw, AlertCircle, ChevronLeft, Upload } from 'lucide-react';
import { loadFaceApiModels, detectFaces } from '../services/faceService';
import { FaceDetectionResult } from '../types';

interface CameraCaptureProps {
  onCapture: (image: string, faceData: FaceDetectionResult) => void;
  onBack: () => void;
  isProcessing?: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onBack, isProcessing = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const loaded = await loadFaceApiModels();
        setModelsLoaded(loaded);

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 720 },
            height: { ideal: 1280 }
          }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("Camera access denied or unavailable.");
        console.error(err);
      }
    };
    init();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCaptureImmediate = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || isDetecting) return;
    setIsDetecting(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Draw standard
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.9);

      // Pass modelsLoaded state to service
      const faceData = await detectFaces(video, modelsLoaded);
      onCapture(imageData, faceData);
    }
    setIsDetecting(false);
  }, [modelsLoaded, onCapture]);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsDetecting(true);

    // Create an image element to read the file
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      // Resize logic to prevent huge payloads
      const MAX_DIMENSION = 1500;
      let width = img.width;
      let height = img.height;

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);

        // Run detection on the image element directly
        const faceData = await detectFaces(img, modelsLoaded);
        onCapture(imageData, faceData);
      }
      setIsDetecting(false);
      if (event.target) event.target.value = ''; // Reset input
    };
  };

  // Store capture handler in ref to avoid effect dependency issues
  const captureRef = useRef(handleCaptureImmediate);
  useEffect(() => {
    captureRef.current = handleCaptureImmediate;
  }, [handleCaptureImmediate]);

  // Handle countdown logic
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Trigger Flash
      setShowFlash(true);

      const captureTimer = setTimeout(() => {
        captureRef.current?.();

        // Cleanup flash and countdown
        setTimeout(() => {
          setShowFlash(false);
          setCountdown(null);
        }, 500);
      }, 50);
      return () => clearTimeout(captureTimer);
    }
  }, [countdown]);

  const startCaptureSequence = () => {
    if (countdown !== null || isDetecting) return;
    setCountdown(3);
  };

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
    <div className="h-full w-full bg-black relative flex flex-col">
      {/* Video Feed - Full Screen Portrait */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform -scale-x-100"
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>



      {/* Model Loading Overlay */}
      {!modelsLoaded && !error && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <RefreshCw className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
          <p className="text-white text-lg font-bold brand-font tracking-wider">INITIALIZING AI</p>
          <p className="text-slate-300 text-xs mt-2 font-mono">Loading neural networks...</p>
        </div>
      )}

      {/* Countdown Overlay - Solid Pie Slice */}
      {countdown !== null && countdown > 0 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
          <div className="relative w-56 h-56 flex items-center justify-center rounded-full border-[8px] border-white shadow-2xl">
            {/* The Pie Slice Fill */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-1000 ease-linear"
              style={{
                background: `conic-gradient(#eab308 ${(countdown / 3) * 360}deg, rgba(234, 179, 8, 0.2) 0deg)`
              }}
            />

            {/* Centered Text */}
            <span className="relative z-10 text-8xl font-bold text-white brand-font drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
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

          {/* Empty spacer for flex alignment */}
          <div className="w-12" />
        </div>
      )}

      {/* Footer Controls */}
      {!isProcessing && (
        <div className="absolute bottom-0 left-0 right-0 p-10 pb-16 z-20 flex justify-center items-center gap-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          {/* Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={handleFileUpload}
            disabled={isDetecting || countdown !== null}
            className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors disabled:opacity-50"
          >
            <Upload size={24} />
          </button>

          {/* Capture Button */}
          <button
            onClick={startCaptureSequence}
            disabled={isDetecting || countdown !== null}
            className="group relative w-28 h-28 flex items-center justify-center focus:outline-none"
          >
            {/* Idle Pulse Ring - Only visible when idle */}
            {!isDetecting && countdown === null && (
              <div className="absolute inset-0 rounded-full border-[6px] border-white/30 animate-pulse-medium"></div>
            )}

            {/* Main Button Construction */}
            <div className={`
            relative w-20 h-20 rounded-full border-[4px] flex items-center justify-center transition-all duration-300 z-10 bg-black/20 backdrop-blur-sm
            ${isDetecting
                ? 'border-slate-500 scale-95'
                : countdown !== null
                  ? 'border-white scale-100' // Static during countdown
                  : 'border-white group-hover:scale-105 group-active:scale-95' // Interactive idle
              }
          `}>
              {/* Inner Shutter Circle */}
              <div className={`
               rounded-full transition-all duration-300 shadow-sm
               ${isDetecting
                  ? 'w-2 h-2 bg-slate-500 opacity-0'
                  : 'w-16 h-16 bg-white' // Simple white circle always
                }
             `}></div>

              {/* Spinner Overlay */}
              {isDetecting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
            </div>
          </button>

          {/* Placeholder for symmetry */}
          <div className="w-[56px]"></div>
        </div>
      )}
    </div>
  );
};