import { EraData, EraId } from '../types';

export const applyEraStamp = (imageSrc: string, era: EraData): Promise<string> => {
    return new Promise((resolve, reject) => {
        const mainImage = new Image();
        const stampImage = new Image();
        const logoImage = new Image();
        const sloganImage = new Image();

        mainImage.crossOrigin = "anonymous";
        stampImage.crossOrigin = "anonymous";
        logoImage.crossOrigin = "anonymous";
        sloganImage.crossOrigin = "anonymous";

        const hasStamp = era.id !== EraId.MODERN_EGYPT && era.stamps && era.stamps.length > 0;
        let assetsLoaded = 0;
        const totalAssets = hasStamp ? 4 : 2; // logo + main + (stamp + slogan if not modern)

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
        logoImage.onload = onAssetLoad;
        logoImage.onerror = onError;

        mainImage.src = imageSrc;
        logoImage.src = './Eagle-Logo.png';

        if (hasStamp) {
            stampImage.onload = onAssetLoad;
            stampImage.onerror = onError;
            const randomStamp = era.stamps[Math.floor(Math.random() * era.stamps.length)];
            stampImage.src = randomStamp;

            sloganImage.onload = onAssetLoad;
            sloganImage.onerror = onError;
            sloganImage.src = './Text-Slogan.png';
        }

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

            // 2. Draw Era Stamp - Bottom Right (with extra vertical lift for safety)
            if (hasStamp) {
                const stampScale = 0.26;
                const stampWidth = canvas.width * stampScale;
                const stampHeight = stampWidth * (stampImage.height / stampImage.width);
                const x = canvas.width - stampWidth - padding;
                const y = canvas.height - stampHeight - (padding * 1.6); // Lifted slightly higher

                ctx.drawImage(stampImage, x, y, stampWidth, stampHeight);

                // 3. Draw Text Slogan - Bottom Left (Mirrors Stamp Position)
                const sloganScale = 0.35; // Slogans are usually wider, so giving it more scale
                const sloganWidth = canvas.width * sloganScale;
                const sloganHeight = sloganWidth * (sloganImage.height / sloganImage.width);
                const sloganX = padding;
                const sloganY = canvas.height - sloganHeight - (padding * 1.6);

                ctx.drawImage(sloganImage, sloganX, sloganY, sloganWidth, sloganHeight);
            }

            resolve(canvas.toDataURL('image/jpeg', 0.95));
        };
    });
};
