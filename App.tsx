import React, { useState } from 'react';
import { AppScreen, EraData, FaceDetectionResult } from './types';
import { SplashScreen } from './components/SplashScreen';
import { CameraCapture } from './components/CameraCapture';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { generateHistoricalImage } from './services/geminiService';
import { applyEraStamp } from './services/stampService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [selectedEra, setSelectedEra] = useState<EraData | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [faceDetectionResult, setFaceDetectionResult] = useState<FaceDetectionResult | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleStart = () => {
    setCurrentScreen(AppScreen.ERA_SELECTION);
  };

  const handleEraSelect = (era: EraData) => {
    setSelectedEra(era);
    setCurrentScreen(AppScreen.CAMERA);
  };

  const handleCapture = async (imageSrc: string, faceData: FaceDetectionResult) => {
    if (!selectedEra) return;

    setFaceDetectionResult(faceData);
    setCurrentScreen(AppScreen.PROCESSING);

    try {
      const resultImage = await generateHistoricalImage(imageSrc, selectedEra, faceData);

      // Apply Era Stamp
      const stampedImage = await applyEraStamp(resultImage, selectedEra);

      setGeneratedImage(stampedImage);
      setCurrentScreen(AppScreen.RESULT);
    } catch (error) {
      console.error("Generation failed", error);
      alert("Sorry, the time machine malfunctioned. Please try again.");
      setCurrentScreen(AppScreen.CAMERA);
    }
  };

  const handleRestart = () => {
    setGeneratedImage(null);
    setSelectedEra(null);
    setFaceDetectionResult(null);
    setCurrentScreen(AppScreen.ERA_SELECTION);
  };

  const handleUpdateImage = (newImage: string) => {
    setGeneratedImage(newImage);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.SPLASH:
        return <SplashScreen onStart={handleStart} onSelectEra={handleEraSelect} isMuted={isMuted} setIsMuted={setIsMuted} />;
      case AppScreen.ERA_SELECTION:
        // This screen is now merged with SPLASH
        return <SplashScreen onStart={handleStart} onSelectEra={handleEraSelect} isMuted={isMuted} setIsMuted={setIsMuted} />;
      case AppScreen.CAMERA:
        return <CameraCapture onCapture={handleCapture} onBack={() => setCurrentScreen(AppScreen.ERA_SELECTION)} />;
      case AppScreen.PROCESSING:
        return <CameraCapture onCapture={handleCapture} onBack={() => setCurrentScreen(AppScreen.ERA_SELECTION)} isProcessing={true} />;
      case AppScreen.RESULT:
        return (
          selectedEra && generatedImage ? (
            <ResultScreen
              imageSrc={generatedImage}
              era={selectedEra}
              faceData={faceDetectionResult}
              onRestart={handleRestart}
              onUpdateImage={handleUpdateImage}
            />
          ) : <LoadingScreen />
        );
      default:
        return <SplashScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="h-[100dvh] w-screen bg-slate-900 text-slate-100 flex flex-col overflow-hidden">
      <main className="flex-grow relative h-full w-full">
        {renderScreen()}
        {currentScreen === AppScreen.PROCESSING && <LoadingScreen />}
      </main>
    </div>
  );
};

export default App;