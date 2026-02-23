const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TARGET_SIZE_KB = 225; // Target 225KB to be safe under 250KB limit
const TARGET_SIZE_BYTES = TARGET_SIZE_KB * 1024;

async function compressImage(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const fileSizeKB = Math.round(stats.size / 1024);
    
    if (fileSizeKB <= 250) {
      console.log(`⏭️  Skipping ${path.basename(filePath)} (${fileSizeKB}KB - already under limit)`);
      return;
    }

    console.log(`🔄 Processing ${path.basename(filePath)} (${fileSizeKB}KB)...`);
    
    const ext = path.extname(filePath).toLowerCase();
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Start with quality 85
    let quality = 85;
    let compressed;
    let compressedSize;
    
    // Try different quality levels until we get under target size
    for (let attempt = 0; attempt < 10; attempt++) {
      if (ext === '.png') {
        compressed = await image
          .png({ quality, compressionLevel: 9, effort: 10 })
          .toBuffer();
      } else {
        compressed = await image
          .jpeg({ quality, mozjpeg: true })
          .toBuffer();
      }
      
      compressedSize = compressed.length;
      
      if (compressedSize <= TARGET_SIZE_BYTES) {
        break;
      }
      
      // Reduce quality for next attempt
      quality -= 5;
      
      if (quality < 40) {
        // If quality is too low, try resizing instead
        const scaleFactor = Math.sqrt(TARGET_SIZE_BYTES / compressedSize);
        const newWidth = Math.floor(metadata.width * scaleFactor * 0.9);
        
        image.resize(newWidth, null, {
          fit: 'inside',
          withoutEnlargement: true
        });
        
        quality = 85; // Reset quality after resize
      }
    }
    
    // Save the compressed image
    fs.writeFileSync(filePath, compressed);
    
    const newSizeKB = Math.round(compressedSize / 1024);
    const savings = Math.round(((fileSizeKB - newSizeKB) / fileSizeKB) * 100);
    console.log(`✅ Compressed ${path.basename(filePath)}: ${fileSizeKB}KB → ${newSizeKB}KB (${savings}% reduction)`);
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        await compressImage(fullPath);
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting image compression...\n');
  console.log(`Target: All images under ${TARGET_SIZE_KB}KB\n`);
  
  const publicDir = path.join(__dirname, 'public');
  await processDirectory(publicDir);
  
  console.log('\n✨ Image compression complete!');
}

main().catch(console.error);
