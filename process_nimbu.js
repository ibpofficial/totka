import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'd:\\metad\\totka\\uploaded_nimbu_mirchi.png';
const outputPath = 'd:\\metad\\totka\\public\\nimbu-mirchi.png';

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    // Check edge pixel brightnesses
    let maxBg = 0;
    for (let x = 0; x < 30; x++) {
      for (let y = 0; y < 30; y++) {
        const p = getPixel(this, x, y);
        const b = p.r * 0.299 + p.g * 0.587 + p.b * 0.114;
        if (b > maxBg) maxBg = b;
      }
    }
    console.log(`Max corner background brightness: ${maxBg}`);

    // The background in this image is dark gray / black (up to ~25).
    // Let's set clean thresholds:
    // Any pixel with brightness <= 26 is transparent.
    // Transition feather 26 to 40.
    // Also, if pixel has high green (chillies) or yellow (lemon), ensure it's not cut off!
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

        // Check if it's the thread at top center
        const isCenterTop = (y < 120 && Math.abs(x - this.width / 2) < 20);
        // Is it colorful (lemon or chilli)?
        const isChilli = (g > r + 15 && g > b + 15);
        const isLemon = (r > 60 && g > 60 && b < 100);

        if (isChilli || isLemon) {
          // Definitely keep foreground
          this.data[idx + 3] = 255;
        } else if (isCenterTop && (r > 30 || g > 30 || b > 25)) {
          // The hanging string
          this.data[idx + 3] = 255;
        } else if (brightness <= 24) {
          this.data[idx + 3] = 0;
        } else if (brightness < 38) {
          const factor = (brightness - 24) / (38 - 24);
          this.data[idx + 3] = Math.round(factor * 255);
        }
      }
    }

    this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log(`Clean transparent nimbu-mirchi written to ${outputPath}`);
    });
  });

function getPixel(png, x, y) {
  const idx = (png.width * y + x) << 2;
  return {
    r: png.data[idx],
    g: png.data[idx + 1],
    b: png.data[idx + 2],
    a: png.data[idx + 3]
  };
}
