
import { EraId } from '../types';

const STAMP_MAP: Record<EraId, string> = {
    [EraId.OLD_EGYPT]: '/Stamps/1.png',
    [EraId.COPTIC_EGYPT]: '/Stamps/2.png',
    [EraId.ISLAMIC_EGYPT]: '/Stamps/3.png',
};

export const applyEraStamp = (imageSrc: string, eraId: EraId): Promise<string> => {
    return new Promise((resolve, reject) => {
        const mainImage = new Image();
        const stampImage = new Image();

        // Allow cross-origin operations if needed (though these are likely local or data URIs)
        mainImage.crossOrigin = "anonymous";
        stampImage.crossOrigin = "anonymous";

        let assetsLoaded = 0;
        const totalAssets = 2;

        const onAssetLoad = () => {
            assetsLoaded++;
            if (assetsLoaded === totalAssets) {
                processComposition();
            }
        };

        const onError = (err: any) => {
            console.error("Error loading images for stamping", err);
            // Fallback: just return the original image if stamping fails
            resolve(imageSrc);
        };

        mainImage.onload = onAssetLoad;
        mainImage.onerror = onError;

        stampImage.onload = onAssetLoad;
        stampImage.onerror = onError;

        // Start loading
        mainImage.src = imageSrc;
        stampImage.src = STAMP_MAP[eraId];

        const processComposition = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                resolve(imageSrc);
                return;
            }

            // Set canvas size to match the main image
            canvas.width = mainImage.width;
            canvas.height = mainImage.height;

            // Draw the main image
            ctx.drawImage(mainImage, 0, 0);

            // Calculate stamp size and position
            // Let's make the stamp about 20% of the image width
            const stampScale = 0.20;
            const stampWidth = canvas.width * stampScale;
            // Maintain aspect ratio of the stamp
            const stampAspectRatio = stampImage.width / stampImage.height;
            const stampHeight = stampWidth / stampAspectRatio;

            // Padding from the edge (5%)
            const padding = canvas.width * 0.05;

            // Randomize corner: 0=TL, 1=TR, 2=BL, 3=BR
            const corner = Math.floor(Math.random() * 4);

            let x = 0;
            let y = 0;

            switch (corner) {
                case 0: // Top Left
                    x = padding;
                    y = padding;
                    break;
                case 1: // Top Right
                    x = canvas.width - stampWidth - padding;
                    y = padding;
                    break;
                case 2: // Bottom Left
                    x = padding;
                    y = canvas.height - stampHeight - padding;
                    break;
                case 3: // Bottom Right
                    x = canvas.width - stampWidth - padding;
                    y = canvas.height - stampHeight - padding;
                    break;
            }

            // Draw the stamp
            ctx.drawImage(stampImage, x, y, stampWidth, stampHeight);

            // Return the result
            resolve(canvas.toDataURL('image/jpeg', 0.95));
        };
    });
};
