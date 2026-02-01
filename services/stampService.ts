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

            // Fixed canvas size based on background requirements: 1080 x 1920
            canvas.width = 1080;
            canvas.height = 1920;

            // 1. Draw Background - BASE layer
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

            // 2. Draw Main Image - MIDDLE layer (contained within the background)
            // Define the containment area (leaving space for background to show around edges)
            const containmentWidth = canvas.width * 0.92;  // Use 92% of canvas width
            const containmentHeight = canvas.height * 0.92; // Use 92% of canvas height

            // Scale the image to fit within the containment area while maintaining aspect ratio
            const scale = Math.min(containmentWidth / mainImage.width, containmentHeight / mainImage.height);
            const targetWidth = mainImage.width * scale;
            const targetHeight = mainImage.height * scale;

            // Center the contained image on the canvas
            const targetX = (canvas.width - targetWidth) / 2;
            const targetY = (canvas.height - targetHeight) / 2;

            ctx.drawImage(mainImage, targetX, targetY, targetWidth, targetHeight);

            // 3. Draw Frame - TOP layer (overlay on captured image area only)
            if (hasFrame && frameImg) {
                // Draw frame at the same position and size as the main image
                // This creates a decorative border around the photo, not the full canvas
                ctx.drawImage(frameImg, targetX, targetY, targetWidth, targetHeight);
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
