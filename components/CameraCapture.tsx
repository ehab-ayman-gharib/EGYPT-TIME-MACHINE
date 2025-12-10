import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RefreshCw, AlertCircle, ChevronLeft, Upload } from 'lucide-react';
import { loadFaceApiModels, detectFaces } from '../services/faceService';
import { FaceDetectionResult } from '../types';

interface CameraCaptureProps {
  onCapture: (image: string, faceData: FaceDetectionResult) => void;
  onBack: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
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
    if (!videoRef.current || !canvasRef.current) return;
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
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);

        // Run detection on the image element directly
        const faceData = await detectFaces(img, modelsLoaded);
        onCapture(imageData, faceData);
      }
      setIsDetecting(false);
    };
  };

  // Handle countdown logic
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Execute capture
      handleCaptureImmediate();
      // Delay clearing the "SMILE" text slightly
      setTimeout(() => setCountdown(null), 500);
    }
  }, [countdown, handleCaptureImmediate]);

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

      {/* Face Guide Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div className="w-[70%] aspect-[3/4] border-2 border-white/20 rounded-[3rem] shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]"></div>
      </div>

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="text-9xl font-bold text-white drop-shadow-2xl animate-ping-large brand-font">
            {countdown === 0 ? 'SMILE!' : countdown}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
        <button
          onClick={onBack}
          className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Footer Controls */}
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
          className={`
            w-20 h-20 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all duration-200
            ${(isDetecting || countdown !== null) ? 'bg-slate-500 scale-95 cursor-not-allowed' : 'bg-red-600 hover:scale-105 active:scale-95 cursor-pointer'}
          `}
        >
          {isDetecting ? (
            <RefreshCw className="w-8 h-8 text-white animate-spin" />
          ) : (
            <div className="w-16 h-16 rounded-full border-2 border-black/10"></div>
          )}
        </button>

        {/* Placeholder for symmetry */}
        <div className="w-[56px]"></div>
      </div>
    </div>
  );
};