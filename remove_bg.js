import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const inputPath = 'd:\\metad\\totka\\original_logo.png';
const publicDir = 'd:\\metad\\totka\\public';
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const outputPath = path.join(publicDir, 'totka-logo.png');

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    console.log(`Image dimensions: ${this.width}x${this.height}`);

    // Sample background color from top-left, top-right, bottom-left corners
    const samples = [
      getPixel(this, 10, 10),
      getPixel(this, this.width - 10, 10),
      getPixel(this, 10, this.height - 10),
      getPixel(this, this.width - 10, this.height - 10),
      getPixel(this, 2, 2)
    ];
    console.log('Corner samples:', samples);

    const bgR = samples[0].r;
    const bgG = samples[0].g;
    const bgB = samples[0].b;
    console.log(`Reference BG color: rgb(${bgR}, ${bgG}, ${bgB})`);

    // Color distance thresholding with smooth alpha feathering
    // Background is dark greenish charcoal ~ (20-30, 35-48, 30-40)
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // Euclidean color distance to background color
        const dist = Math.sqrt(
          (r - bgR) * (r - bgR) +
          (g - bgG) * (g - bgG) +
          (b - bgB) * (b - bgB)
        );

        // Thresholds:
        // Below innerThreshold: definitely background -> alpha = 0
        // Between inner and outerThreshold: smooth feathering
        // Above outerThreshold: foreground text/logo -> alpha = 255
        const innerThreshold = 18;
        const outerThreshold = 35;

        if (dist <= innerThreshold) {
          this.data[idx + 3] = 0; // fully transparent
        } else if (dist < outerThreshold) {
          const factor = (dist - innerThreshold) / (outerThreshold - innerThreshold);
          this.data[idx + 3] = Math.round(factor * 255);
        }
      }
    }

    // Also auto-crop empty transparent borders
    let minX = this.width, minY = this.height, maxX = 0, maxY = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        if (this.data[idx + 3] > 10) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const padding = 12;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(this.width - 1, maxX + padding);
    maxY = Math.min(this.height - 1, maxY + padding);

    const croppedW = maxX - minX + 1;
    const croppedH = maxY - minY + 1;
    console.log(`Cropped bounds: ${croppedW}x${croppedH} from (${minX},${minY})`);

    const cropped = new PNG({ width: croppedW, height: croppedH });
    for (let y = 0; y < croppedH; y++) {
      for (let x = 0; x < croppedW; x++) {
        const srcIdx = (this.width * (minY + y) + (minX + x)) << 2;
        const dstIdx = (croppedW * y + x) << 2;
        cropped.data[dstIdx] = this.data[srcIdx];
        cropped.data[dstIdx + 1] = this.data[srcIdx + 1];
        cropped.data[dstIdx + 2] = this.data[srcIdx + 2];
        cropped.data[dstIdx + 3] = this.data[srcIdx + 3];
      }
    }

    cropped.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log(`Saved transparent logo to ${outputPath}`);
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

