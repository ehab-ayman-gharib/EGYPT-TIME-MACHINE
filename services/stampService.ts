import { EraData, EraId } from '../types';

export const applyEraStamp = (imageSrc: string, era: EraData): Promise<string> => {
    return new Promise((resolve) => {
        const hasFrame = era.frames && era.frames.length > 0;

        let assetsLoaded = 0;
        const totalAssets = 2 + (hasFrame ? 1 : 0); // Main Image + Background + Frame (if exists)

        const onAssetLoad = () => {
            assetsLoaded++;
            if (assetsLoaded === totalAssets) {
                processComposition();
            }
        };

        const createSafeImage = (src: string, isEssential = false) => {
            const img = new Image();
            if (!src.startsWith('data:')) {
                img.crossOrigin = "anonymous";
            }
            img.onload = onAssetLoad;
            img.onerror = (err) => {
                console.error(`[Composition] Failed to load image: ${src}`, err);
                if (isEssential) {
                    resolve(imageSrc);
                } else {
                    onAssetLoad();
                }
            };
            img.src = src;
            return img;
        };

        const mainImage = createSafeImage(imageSrc, true);

        // Background selection based on era
        const backgroundPath = era.id === EraId.OLD_EGYPT
            ? './Backgrounds/Old-Egyptian/Old-Egyptian-Background.jpg'
            : './Backgrounds/Generic-Background.jpg';
        const backgroundImg = createSafeImage(backgroundPath, true);

        // Frame selection (top layer)
        const frameImg = hasFrame ? createSafeImage(era.frames[0]) : null;

        const processComposition = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                resolve(imageSrc);
                return;
            }

            // Fixed canvas size based on background requirements: 1266 x 1836 (2:3 Ratio)
            canvas.width = 1266;
            canvas.height = 1836;

            // 1. Draw Background - BASE layer
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

            // 2. Draw Main Image - MIDDLE layer
            // User specified exact dimensions for the inner photo to fit the frame: 944 x 1652
            const targetImageWidth = 944;
            const targetImageHeight = 1652;

            // Center the image on the canvas
            const imageX = (canvas.width - targetImageWidth) / 2;
            const imageY = (canvas.height - targetImageHeight) / 2;

            // Draw image to fill the target area (Cover)
            // Calculate aspect ratios to perform a "cover" crop if necessary
            const imgAspect = mainImage.width / mainImage.height;
            const targetAspect = targetImageWidth / targetImageHeight;

            let sourceX = 0, sourceY = 0, sourceWidth = mainImage.width, sourceHeight = mainImage.height;

            if (imgAspect > targetAspect) {
                // Image is wider than target: Crop width
                sourceWidth = mainImage.height * targetAspect;
                sourceX = (mainImage.width - sourceWidth) / 2;
            } else {
                // Image is taller than target: Crop height
                sourceHeight = mainImage.width / targetAspect;
                sourceY = (mainImage.height - sourceHeight) / 2;
            }

            ctx.drawImage(mainImage, sourceX, sourceY, sourceWidth, sourceHeight, imageX, imageY, targetImageWidth, targetImageHeight);

            // 3. Draw Frame - TOP layer
            if (hasFrame && frameImg) {
                // User specified exact frame dimensions from Figma: 1181 x 1771.65
                const targetFrameWidth = 1181;
                const targetFrameHeight = 1772; // Rounded from 1771.65

                const frameX = (canvas.width - targetFrameWidth) / 2;
                const frameY = (canvas.height - targetFrameHeight) / 2;

                ctx.drawImage(frameImg, frameX, frameY, targetFrameWidth, targetFrameHeight);
            }

            // Stamping/Branding logic remains commented out per user request
            /*
            const logoImage = createSafeImage(['./Logos/Gold-Logo.png', './Logos/Original-Logo.png'][Math.floor(Math.random() * 2)]);
            const logoInternalPadding = targetWidth * 0.05;
            const logoScale = 0.385; 
            const logoWidth = targetWidth * logoScale;
            const logoHeight = logoWidth * (logoImage.height / logoImage.width);
            const logoX = targetX + logoInternalPadding;
            const logoY = targetY + logoInternalPadding;
            ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);
            */

            resolve(canvas.toDataURL('image/png', 0.9));
        };
    });
};
