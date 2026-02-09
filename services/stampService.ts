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

            // Canvas size for 4x6 inch printing at 300 DPI: 1800 x 2700 pixels
            canvas.width = 1800;
            canvas.height = 2700;

            // 1. Draw Background - BASE layer
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

            // 2. Draw Main Image - MIDDLE layer
            // Scale the photo area proportionally: original was 944x1652 at 1266x1836 canvas
            // New scale factor: 1800/1266 = 1.4218
            const scaleFactor = canvas.width / 1266;
            const targetImageWidth = Math.round(944 * scaleFactor);   // ~1342px
            const targetImageHeight = Math.round(1652 * scaleFactor); // ~2349px

            // Center the image on the canvas
            const imageX = (canvas.width - targetImageWidth) / 2;
            const imageY = (canvas.height - targetImageHeight) / 2;

            // Draw image to fill the target area (Cover)
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
                // Scale frame dimensions proportionally: original was 1181x1772 at 1266x1836 canvas
                const targetFrameWidth = Math.round(1181 * scaleFactor);  // ~1679px
                const targetFrameHeight = Math.round(1772 * scaleFactor); // ~2520px

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

            resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
    });
};
