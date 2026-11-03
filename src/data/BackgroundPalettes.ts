export type RGBColor = readonly [number, number, number];

export const fourBitPalette: readonly RGBColor[] = [
    [0, 0, 0],
    [0, 0, 170],
    [0, 170, 0],
    [0, 170, 170],
    [170, 0, 0],
    [170, 0, 170],
    [170, 85, 0],
    [170, 170, 170],
    [85, 85, 85],
    [85, 85, 255],
    [85, 255, 85],
    [85, 255, 255],
    [255, 85, 85],
    [255, 85, 255],
    [255, 255, 85],
    [255, 255, 255],
];

export const eightBitPalette: readonly RGBColor[] = Array.from(
    { length: 256 },
    (_, index) => {
        const red = (index >> 5) & 0b111;
        const green = (index >> 2) & 0b111;
        const blue = index & 0b11;

        return [
            Math.round((red / 7) * 255),
            Math.round((green / 7) * 255),
            Math.round((blue / 3) * 255),
        ];
    },
);