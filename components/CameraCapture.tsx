import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RefreshCw, AlertCircle, ChevronLeft } from 'lucide-react';
import {
  bootstrapCameraKit,
  createMediaStreamSource,
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
  const [session, setSession] = useState<CameraKitSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

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

        // Create Session
        if (!canvasRef.current) return;
        currentSession = await cameraKit.createSession({
          liveRenderTarget: canvasRef.current,
        });
        setSession(currentSession);

        // Get Camera Stream
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1080 },
            height: { ideal: 1920 },
          },
        });

        // Set Source
        const source = createMediaStreamSource(stream);
        currentSession.setSource(source);
        currentSession.play();

        // Apply Lens if era has one
        if (era?.lensId) {
          const lens = await cameraKit.lensRepository.loadLens(era.lensId, CAMERAKIT_CONFIG.GROUP_ID);
          await currentSession.applyLens(lens);
        } else if (CAMERAKIT_CONFIG.DEFAULT_LENS_ID) {
          const lens = await cameraKit.lensRepository.loadLens(CAMERAKIT_CONFIG.DEFAULT_LENS_ID, CAMERAKIT_CONFIG.GROUP_ID);
          await currentSession.applyLens(lens);
        }

        setIsInitializing(false);
      } catch (err) {
        setError("Failed to initialize CameraKit or camera access denied.");
        console.error(err);
        setIsInitializing(false);
      }
    };

    init();

    return () => {
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

      // Capture photo from canvas
      const imageData = canvasRef.current.toDataURL('image/jpeg', 0.95);

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
          className="w-full h-full object-cover transform -scale-x-100"
        />
      </div>

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

      {/* Footer Controls */}
      {!isProcessing && (
        <div className="absolute bottom-0 left-0 right-0 p-10 pb-16 z-20 flex justify-center items-center gap-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <button
            onClick={startCaptureSequence}
            disabled={isInitializing || isCapturing || countdown !== null}
            className="group relative w-28 h-28 flex items-center justify-center focus:outline-none"
          >
            {!isCapturing && countdown === null && (
              <div className="absolute inset-0 rounded-full border-[6px] border-white/30 animate-pulse-medium"></div>
            )}

            <div className={`
              relative w-20 h-20 rounded-full border-[4px] flex items-center justify-center transition-all duration-300 z-10 bg-black/20 backdrop-blur-sm
              ${isCapturing
                ? 'border-slate-500 scale-95'
                : countdown !== null
                  ? 'border-white scale-100'
                  : 'border-white group-hover:scale-105 group-active:scale-95'
              }
            `}>
              <div className={`
                rounded-full transition-all duration-300 shadow-sm
                ${isCapturing
                  ? 'w-2 h-2 bg-slate-500 opacity-0'
                  : 'w-16 h-16 bg-white'
                }
              `}></div>

              {(isCapturing || isProcessing) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};