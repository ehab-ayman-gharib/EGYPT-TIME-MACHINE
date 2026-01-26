import { EraData, EraId } from '../types';

export const applyEraStamp = (imageSrc: string, era: EraData): Promise<string> => {
    return new Promise((resolve) => {
        const hasStamp = era.id !== EraId.MODERN_EGYPT && era.stamps && era.stamps.length > 0;
        const hasFrame = era.frames && era.frames.length > 0;

        let assetsLoaded = 0;
        const totalAssets = (hasFrame ? 1 : 0) + (hasStamp ? 2 : 0) + 2; // +1 for mainImage, +1 for secondary logo

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
        const logoImage = createSafeImage(['./Logos/Gold-Logo.png', './Logos/Original-Logo.png'][Math.floor(Math.random() * 2)]);

        // Conditional assets
        let frameImg: HTMLImageElement | null = null;
        let stampImg: HTMLImageElement | null = null;
        let sloganImg: HTMLImageElement | null = null;

        if (hasFrame) {
            const randomFrame = era.frames[Math.floor(Math.random() * era.frames.length)];
            frameImg = createSafeImage(randomFrame);
        }

        if (hasStamp) {
            const randomStamp = era.stamps[Math.floor(Math.random() * era.stamps.length)];
            stampImg = createSafeImage(randomStamp);
            sloganImg = createSafeImage('./Text-Slogan.png');
        }

        const processComposition = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                resolve(imageSrc);
                return;
            }

            const FRAME_WIDTH = 700;
            const FRAME_HEIGHT = 1083;

            if (hasFrame) {
                canvas.width = FRAME_WIDTH;
                canvas.height = FRAME_HEIGHT;
            } else {
                canvas.width = mainImage.width;
                canvas.height = mainImage.height;
            }

            // 1. Draw Frame - BASE layer
            if (hasFrame && frameImg) {
                ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
            }

            // 2. Draw Main Image - TOP layer
            const marginX = hasFrame ? canvas.width * 0.12 : 0;
            const targetWidth = canvas.width - (marginX * 2);
            const targetHeight = targetWidth * (mainImage.height / mainImage.width);
            const targetX = marginX;
            const targetY = (canvas.height - targetHeight) / 2;

            ctx.drawImage(mainImage, targetX, targetY, targetWidth, targetHeight);

            // 3. Draw Branding Overlays
            const logoInternalPadding = targetWidth * 0.05;
            const logoScale = 0.385; // Increased by 10% from 0.35
            const logoWidth = targetWidth * logoScale;
            const logoHeight = logoWidth * (logoImage.height / logoImage.width);
            const logoX = targetX + logoInternalPadding;
            const logoY = targetY + logoInternalPadding;

            ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);

            if (hasStamp && stampImg && sloganImg) {
                const overlayPadding = targetWidth * 0.05;

                const stampScale = 0.20;
                const stampWidth = targetWidth * stampScale;
                const stampHeight = stampWidth * (stampImg.height / stampImg.width);
                const stampX = targetX + targetWidth - stampWidth - overlayPadding;
                const stampY = targetY + targetHeight - stampHeight - (overlayPadding * 1.5);

                ctx.drawImage(stampImg, stampX, stampY, stampWidth, stampHeight);

                const sloganScale = 0.28;
                const sloganWidth = targetWidth * sloganScale;
                const sloganHeight = sloganWidth * (sloganImg.height / sloganImg.width);
                const sloganX = targetX + overlayPadding;
                const sloganY = targetY + targetHeight - sloganHeight - (overlayPadding * 1.5);

                ctx.drawImage(sloganImg, sloganX, sloganY, sloganWidth, sloganHeight);
            }

            resolve(canvas.toDataURL('image/png'));
        };
    });
};
