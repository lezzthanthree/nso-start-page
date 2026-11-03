import React, { useEffect, useRef } from "react";

interface BackgroundImageProps {
    src: string;
    pixelSize: number;
    className?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
    src,
    pixelSize,
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
    }, [pixelSize, src]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`absolute inset-0 -z-10 h-full w-full ${className}`}
        />
    );
};

export default BackgroundImage;