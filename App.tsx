import React, { useState } from 'react';
import { AppScreen, EraData, FaceDetectionResult, EraId } from './types';
import { SplashScreen } from './components/SplashScreen';
import { CameraCapture } from './components/CameraCapture';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { applyEraStamp } from './services/stampService';
import { ERAS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [selectedEra, setSelectedEra] = useState<EraData | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [faceDetectionResult, setFaceDetectionResult] = useState<FaceDetectionResult | null>(null);
  const [sessionKey, setSessionKey] = useState(0);
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
      console.log(`[Processing] Applying era stamp...`);

      // Apply Era Stamp/Frame (Works for all modes)
      const stampedImage = await applyEraStamp(imageSrc, selectedEra);

      setGeneratedImage(stampedImage);
      setGeneratedPrompt('CameraKit Lens (No AI Generation)');
      setCurrentScreen(AppScreen.RESULT);
    } catch (error) {
      console.error(`Processing failed:`, error);
      handleRestart();
      setCurrentScreen(AppScreen.SPLASH);
    }
  };

  const handleRestart = () => {
    setGeneratedImage(null);
    setGeneratedPrompt('');
    setSelectedEra(null);
    setFaceDetectionResult(null);
    setSessionKey(prev => prev + 1);
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
        return <CameraCapture era={selectedEra} onCapture={handleCapture} onBack={() => setCurrentScreen(AppScreen.ERA_SELECTION)} />;
      case AppScreen.PROCESSING:
        return <CameraCapture era={selectedEra} onCapture={handleCapture} onBack={() => setCurrentScreen(AppScreen.ERA_SELECTION)} isProcessing={true} />;
      case AppScreen.RESULT:
        return (
          selectedEra && generatedImage ? (
            <ResultScreen
              imageSrc={generatedImage}
              prompt={generatedPrompt}
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
      <main className="flex-grow relative h-full w-full" key={sessionKey}>
        {renderScreen()}
        {currentScreen === AppScreen.PROCESSING && <LoadingScreen />}
      </main>
    </div>
  );
};

export default App;