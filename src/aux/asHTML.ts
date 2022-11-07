const r = [1, 222, 57, 255, 0, 118, 44, 204, 128, 255, 0, 255, 0, 255, 0, 255];
const g = [
  1, 56, 181, 199, 111, 38, 181, 204, 128, 0, 255, 255, 0, 0, 255, 255,
];
const b = [1, 43, 74, 6, 184, 113, 233, 204, 128, 0, 0, 0, 255, 255, 255, 255];

function rgb8(n) {
  return n < 16
    ? { r: r[n], g: g[n], b: b[n] }
    : n >= 232
    ? {
        r: Math.trunc((n - 232) * (255 / 23)),
        g: Math.trunc((n - 232) * (255 / 23)),
        b: Math.trunc((n - 232) * (255 / 23)),
      }
    : {
        r: Math.trunc((n - 16) / 36),
        g: Math.trunc((n - 16) / 6),
        b: (n - 16) % 6,
      };
}