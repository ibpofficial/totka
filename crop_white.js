import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'public/totka-tshirt-white.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    cropAndSave(this, 70, 380, 350, 380, 'public/totka-white-graphic.png');
    cropAndSave(this, 90, 220, 310, 210, 'public/totka-white-collar.png');
  });

function cropAndSave(src, sx, sy, sw, sh, outPath) {
  const cropped = new PNG({ width: sw, height: sh });
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const srcIdx = (src.width * (sy + y) + (sx + x)) << 2;
      const dstIdx = (sw * y + x) << 2;
      cropped.data[dstIdx] = src.data[srcIdx];
      cropped.data[dstIdx + 1] = src.data[srcIdx + 1];
      cropped.data[dstIdx + 2] = src.data[srcIdx + 2];
      cropped.data[dstIdx + 3] = src.data[srcIdx + 3];
    }
  }
  cropped.pack().pipe(fs.createWriteStream(outPath)).on('finish', () => {
    console.log(`Saved white tee crop: ${outPath} (${sw}x${sh})`);
  });
}

