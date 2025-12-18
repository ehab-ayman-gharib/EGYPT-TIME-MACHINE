import { EraData } from '../types';

export const applyEraStamp = (imageSrc: string, era: EraData): Promise<string> => {
    return new Promise((resolve, reject) => {
        const mainImage = new Image();
        const stampImage = new Image();
        const logoImage = new Image();

        mainImage.crossOrigin = "anonymous";
        stampImage.crossOrigin = "anonymous";
        logoImage.crossOrigin = "anonymous";

        let assetsLoaded = 0;
        const totalAssets = 3;

        const onAssetLoad = () => {
            assetsLoaded++;
            if (assetsLoaded === totalAssets) {
                processComposition();
            }
        };

        const onError = (err: any) => {
            console.error("Error loading images for stamping", err);
            resolve(imageSrc);
        };

        mainImage.onload = onAssetLoad;
        mainImage.onerror = onError;
        stampImage.onload = onAssetLoad;
        stampImage.onerror = onError;
        logoImage.onload = onAssetLoad;
        logoImage.onerror = onError;

        // Pick a random stamp from the era's stamps array
        const randomStamp = era.stamps[Math.floor(Math.random() * era.stamps.length)];

        mainImage.src = imageSrc;
        stampImage.src = randomStamp;
        logoImage.src = '/Eagle-Logo.png';

        const processComposition = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                resolve(imageSrc);
                return;
            }

            canvas.width = mainImage.width;
            canvas.height = mainImage.height;

            // Draw the main image
            ctx.drawImage(mainImage, 0, 0);

            // Settings for overlays
            const padding = canvas.width * 0.05;

            // 1. Draw Eagle Logo - Top Left
            const logoScale = 0.4;
            const logoWidth = canvas.width * logoScale;
            const logoHeight = logoWidth * (logoImage.height / logoImage.width);
            ctx.drawImage(logoImage, padding, padding, logoWidth, logoHeight);

            // 2. Draw Era Stamp - Bottom Right
            const stampScale = 0.26;
            const stampWidth = canvas.width * stampScale;
            const stampHeight = stampWidth * (stampImage.height / stampImage.width);
            const x = canvas.width - stampWidth - padding;
            const y = canvas.height - stampHeight - padding;

            ctx.drawImage(stampImage, x, y, stampWidth, stampHeight);

            resolve(canvas.toDataURL('image/jpeg', 0.95));
        };
    });
};
