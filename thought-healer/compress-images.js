/**
 * compress-images.js
 * Run from: C:\Users\mypc\Downloads\thought-healer-website\thought-healer
 * Step 1: npm install sharp
 * Step 2: node compress-images.js
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

// Script is inside thought-healer/, so public is at ./public
const publicDir = path.join(__dirname, 'public');

// Images to compress — (filename, maxWidth, quality)
const images = [
  { file: 'Dr._Sandeep_Jagtap.png',                   maxW: 500, quality: 80 },
  { file: 'Dr_Dipesh_Walte.png',                       maxW: 500, quality: 80 },
  { file: 'Dr._Swati_Jagtap.png',                      maxW: 500, quality: 80 },
  { file: 'Miss_Madhuri_Solanki-removebg-preview.png', maxW: 400, quality: 85 },
  { file: 'Miss_Prajakta_Gosavi-removebg-preview.png', maxW: 400, quality: 85 },
  { file: 'Untitled_design__2_-removebg-preview.png',  maxW: 400, quality: 85 },
];

async function compress() {
  console.log('\n🗜️  ThoughtHealer Image Compressor\n');

  for (const img of images) {
    const inputPath  = path.join(publicDir, img.file);

    if (!fs.existsSync(inputPath)) {
      console.warn(`  ⚠️  Not found: ${img.file}`);
      continue;
    }

    const before = fs.statSync(inputPath).size;

    // Backup original (only once, won't overwrite existing backup)
    const backupPath = inputPath + '.backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`  💾  Backed up: ${img.file}`);
    }

    try {
      const meta = await sharp(inputPath).metadata();
      console.log(`  📷  ${img.file}`);
      console.log(`       Original : ${meta.width}x${meta.height}px  |  ${(before/1024).toFixed(0)} KB`);

      const tmpPath = inputPath + '.tmp';

      await sharp(inputPath)
        .resize({
          width:  img.maxW,
          height: img.maxW,
          fit:    'inside',
          withoutEnlargement: true,
        })
        .png({
          quality:           img.quality,
          compressionLevel:  9,
          adaptiveFiltering: true,
        })
        .toFile(tmpPath);

      fs.renameSync(tmpPath, inputPath);

      const after = fs.statSync(inputPath).size;
      const pct   = Math.round((1 - after / before) * 100);
      console.log(`       Compressed: ${(after/1024).toFixed(0)} KB  |  saved ${pct}%\n`);

    } catch (err) {
      console.error(`  ❌  Error on ${img.file}:`, err.message);
    }
  }

  console.log('✅  Done! Originals saved with .backup extension.');
  console.log('    To restore any image, rename its .backup file back to original name.\n');
}

compress();
