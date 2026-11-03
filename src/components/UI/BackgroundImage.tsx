import React, { useEffect, useRef } from "react";
import type { BackgroundColorDepth } from "../../hooks/useGeneralSettings";
import { fourBitPalette } from "../../data/BackgroundPalettes";

interface BackgroundImageProps {
    src: string;
    pixelSize: number;
    colorDepth?: BackgroundColorDepth;
    className?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
    src,
    pixelSize,
    colorDepth = "default",
    className = "",
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        const image = new Image();
        let isActive = true;

        const draw = () => {
            if (!isActive || !image.naturalWidth || !canvas.clientWidth) return;

            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const scale = Math.max(
                width / image.naturalWidth,
                height / image.naturalHeight,
            );
            const drawWidth = image.naturalWidth * scale;
            const drawHeight = image.naturalHeight * scale;
            const blockSize = Math.max(1, pixelSize);
            const smallCanvas = document.createElement("canvas");
            smallCanvas.width = Math.max(1, Math.ceil(width / blockSize));
            smallCanvas.height = Math.max(1, Math.ceil(height / blockSize));

            const smallContext = smallCanvas.getContext("2d");
            if (!smallContext) return;

            smallContext.drawImage(
                image,
                (smallCanvas.width - drawWidth / blockSize) / 2,
                (smallCanvas.height - drawHeight / blockSize) / 2,
                drawWidth / blockSize,
                drawHeight / blockSize,
            );

            if (colorDepth !== "default") {
                const imageData = smallContext.getImageData(
                    0,
                    0,
                    smallCanvas.width,
                    smallCanvas.height,
                );

                for (let index = 0; index < imageData.data.length; index += 4) {
                    if (colorDepth === "4-bit") {
                        let nearestColor = fourBitPalette[0];
                        let nearestDistance = Number.POSITIVE_INFINITY;

                        for (const paletteColor of fourBitPalette) {
                            const redDifference =
                                imageData.data[index] - paletteColor[0];
                            const greenDifference =
                                imageData.data[index + 1] - paletteColor[1];
                            const blueDifference =
                                imageData.data[index + 2] - paletteColor[2];
                            const distance =
                                redDifference * redDifference +
                                greenDifference * greenDifference +
                                blueDifference * blueDifference;

                            if (distance < nearestDistance) {
                                nearestDistance = distance;
                                nearestColor = paletteColor;
                            }
                        }

                        imageData.data[index] = nearestColor[0];
                        imageData.data[index + 1] = nearestColor[1];
                        imageData.data[index + 2] = nearestColor[2];
                    } else {
                        const channelBits = [3, 3, 2];
                        for (let channel = 0; channel < 3; channel += 1) {
                            const levels = 2 ** channelBits[channel] - 1;
                            imageData.data[index + channel] = Math.round(
                                (imageData.data[index + channel] / 255) * levels,
                            ) * (255 / levels);
                        }
                    }
                }

                smallContext.putImageData(imageData, 0, 0);
            }

            canvas.width = width;
            canvas.height = height;
            context.imageSmoothingEnabled = false;
            context.clearRect(0, 0, width, height);
            context.drawImage(smallCanvas, 0, 0, width, height);
        };

        image.onload = draw;
        image.src = src;

        const observer = new ResizeObserver(draw);
        observer.observe(canvas);

        return () => {
            isActive = false;
            observer.disconnect();
        };
    }, [colorDepth, pixelSize, src]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`absolute inset-0 -z-10 h-full w-full ${className}`}
        />
    );
};

export default BackgroundImage;