const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');

// Read env variables from .env.local
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*["']?(.*?)["']?\s*$/);
      if (match) {
        process.env[match[1]] = match[2];
      }
    });
  }
}

loadEnv();

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or API Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET = 'VishakaHu_Gallery';

const DEFAULT_IMAGES = [
  "IMG_1124.JPG", "IMG_1126.JPG", "IMG_1128.JPG", "IMG_1131.JPG",
  "IMG_1154.JPG", "IMG_1165.JPG", "IMG_1190.JPG", "IMG_1236.JPG",
  "IMG_1249.JPG", "IMG_1263.JPG", "IMG_1267.JPG", "IMG_4300.JPG",
  "IMG_E4300.JPG", "IMG_E4314.JPG"
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function runSync() {
  console.log("==========================================");
  console.log("📸 VishakaHu Gallery Auto-Sync & Optimizer");
  console.log("==========================================");

  // 1. Scan orginl/ folder and root
  const { data: orginlFiles } = await supabase.storage.from(BUCKET).list('orginl', { limit: 100 });
  const { data: rootFiles } = await supabase.storage.from(BUCKET).list('', { limit: 100 });

  const targetFiles = new Set();

  if (orginlFiles && orginlFiles.length > 0) {
    orginlFiles.forEach(f => {
      if (!f.name.startsWith('.')) targetFiles.add({ name: f.name, path: `orginl/${f.name}` });
    });
  }

  if (rootFiles && rootFiles.length > 0) {
    rootFiles.forEach(f => {
      if (!f.name.startsWith('.') && f.name.includes('.')) {
        targetFiles.add({ name: f.name, path: f.name });
      }
    });
  }

  // Fallback to default list if RLS restricts list()
  if (targetFiles.size === 0) {
    DEFAULT_IMAGES.forEach(filename => {
      targetFiles.add({ name: filename, path: filename });
    });
  }

  console.log(`Found ${targetFiles.size} original images to process.\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const item of targetFiles) {
    const filename = item.name;
    const baseName = filename.replace(/\.[^/.]+$/, "");
    const orgPath = item.path;
    const targetOrgPath = `orginl/${filename}`;
    const targetTempPath = `template/${baseName}.webp`;

    console.log(`▶ Processing: ${filename}`);

    let imageBuffer = null;

    // Fetch original image
    const publicOrgUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${orgPath}`;
    try {
      imageBuffer = await fetchBuffer(publicOrgUrl);
      console.log(`  └ Original loaded: ${(imageBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    } catch (err) {
      console.error(`  └ Failed to fetch original from ${publicOrgUrl}: ${err.message}`);
      errorCount++;
      continue;
    }

    // Migrate root file to orginl/ if needed
    if (!orgPath.startsWith('orginl/')) {
      const { error: copyErr } = await supabase.storage.from(BUCKET).copy(orgPath, targetOrgPath);
      if (!copyErr) {
        console.log(`  └ Migrated ${orgPath} ➔ ${targetOrgPath}`);
      }
    }

    // Convert and normalize orientation using sharp
    try {
      // 1. Normalize original high-res image (bake EXIF orientation into pixels)
      const normalizedOrgBuffer = await sharp(imageBuffer)
        // .rotate()
        .jpeg({ quality: 92 })
        .toBuffer();

      await supabase.storage.from(BUCKET).upload(targetOrgPath, normalizedOrgBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

      // 2. Generate WebP thumbnail from normalized image
      const webpBuffer = await sharp(normalizedOrgBuffer)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      console.log(`  └ Generated WebP thumbnail: ${(webpBuffer.length / 1024).toFixed(2)} KB`);

      // Upload WebP thumbnail to template/
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(targetTempPath, webpBuffer, {
        contentType: 'image/webp',
        upsert: true
      });

      if (upErr) {
        console.error(`  └ Upload to ${targetTempPath} failed: ${upErr.message}`);
        console.error(`    (Tip: Ensure INSERT RLS policy is enabled on '${BUCKET}' or set SUPABASE_SERVICE_ROLE_KEY in .env.local)`);
        errorCount++;
      } else {
        console.log(`  └ ✅ Uploaded thumbnail to ${targetTempPath}`);
        successCount++;
      }
    } catch (sharpErr) {
      console.error(`  └ Sharp conversion error: ${sharpErr.message}`);
      errorCount++;
    }
  }

  console.log("\n==========================================");
  console.log(`Finished: ${successCount} successful, ${errorCount} errors/restricted`);
  console.log("==========================================");
}

runSync().catch(console.error);
