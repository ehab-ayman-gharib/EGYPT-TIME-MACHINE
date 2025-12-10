export enum AppScreen {
  SPLASH = 'SPLASH',
  ERA_SELECTION = 'ERA_SELECTION',
  CAMERA = 'CAMERA',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
}

export enum EraId {
  OLD_EGYPT = 'OLD_EGYPT',
  COPTIC_EGYPT = 'COPTIC_EGYPT',
  ISLAMIC_EGYPT = 'ISLAMIC_EGYPT',
}

export interface EraData {
  id: EraId;
  name: string;
  description: string;
  previewImage: string;
  promptStyle: string;

}

export interface FaceDetectionResult {
  maleCount: number;
  femaleCount: number;
  totalPeople: number;
}