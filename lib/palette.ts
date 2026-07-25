export type RGB = [number, number, number]; // 0..255
export interface Palette {
    a: RGB; // dominant accent (shader colorA + cursor glow)
    b: RGB; // secondary
    c: RGB; // tertiary
}

const BASE_DRIFT = 12; // degrees/second of steady hue travel (the rest wanders)

function mod360(h: number): number {
    return ((h % 360) + 360) % 360;
}

// h: 0..360, s/l: 0..1 → [r,g,b] 0..255
function hslToRgb(h: number, s: number, l: number): RGB {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hp = mod360(h) / 60;
    const x = c * (1 - Math.abs((hp % 2) - 1));
    let r = 0,
        g = 0,
        b = 0;
    if (hp < 1) [r, g, b] = [c, x, 0];
    else if (hp < 2) [r, g, b] = [x, c, 0];
    else if (hp < 3) [r, g, b] = [0, c, x];
    else if (hp < 4) [r, g, b] = [0, x, c];
    else if (hp < 5) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    const m = l - c / 2;
    return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255),
    ];
}

export function paletteAt(t: number): Palette {
    const base =
        t * BASE_DRIFT + 55 * Math.sin(t * 0.021) + 30 * Math.sin(t * 0.047);
    return {
        a: hslToRgb(base, 0.85, 0.62),
        b: hslToRgb(base + 130 + 18 * Math.sin(t * 0.013), 0.58, 0.5),
        c: hslToRgb(base + 235 + 14 * Math.sin(t * 0.029), 0.8, 0.62),
    };
}

export function cssRgb([r, g, b]: RGB): string {
    return `rgb(${r} ${g} ${b})`;
}
