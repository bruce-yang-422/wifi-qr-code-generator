// One closed rectangle subpath per dark module. Integer coordinates are shared
// at adjacent edges: no strokes, overlap, raster images, text or background fill.
function wifiQrVector(model, format) {
    if (!['svg', 'eps'].includes(format)) throw new Error('Unsupported vector format');
    const count = model.getModuleCount();
    const unit = 10;
    const quiet = 4;
    const size = (count + quiet * 2) * unit;
    const paths = [];
    for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
            if (!model.isDark(row, col)) continue;
            const x = (col + quiet) * unit;
            if (format === 'svg') {
                const y = (row + quiet) * unit;
                paths.push(`M${x} ${y}h${unit}v${unit}h-${unit}z`);
            } else {
                // PostScript uses a bottom-left origin; keep the QR upright.
                const y = (count - row - 1 + quiet) * unit;
                paths.push(`${x} ${y} moveto ${unit} 0 rlineto 0 ${unit} rlineto -${unit} 0 rlineto closepath`);
            }
        }
    }
    if (format === 'svg') return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">\n<path fill="#000000" stroke="none" shape-rendering="crispEdges" d="${paths.join('')}"/>\n</svg>\n`;
    return `%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: 0 0 ${size} ${size}
%%HiResBoundingBox: 0 0 ${size} ${size}
%%Creator: WiFi Studio
%%Title: WiFi QR Code
%%LanguageLevel: 2
%%DocumentData: Clean7Bit
%%DocumentProcessColors: Black
%%EndComments
gsave
0 0 0 1 setcmykcolor
newpath
${paths.join('\n')}
fill
grestore
%%EOF
`;
}
