import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface ImageItem {
  id: string;
  src: string;          // Full original high-res image URL (loaded on click / lightbox)
  thumbnailSrc: string; // Lightweight WebP template thumbnail URL (~15-40KB loaded in grid preview)
  title: string;
  filename: string;
}

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

// Default gallery files in bucket 'VishakaHu_Gallery'
const DEFAULT_GALLERY_FILES = [
  "IMG_1124.JPG", "IMG_1126.JPG", "IMG_1128.JPG", "IMG_1131.JPG",
  "IMG_1154.JPG", "IMG_1165.JPG", "IMG_1190.JPG", "IMG_1236.JPG",
  "IMG_1249.JPG", "IMG_1263.JPG", "IMG_1267.JPG", "IMG_4300.JPG",
  "IMG_E4300.JPG", "IMG_E4314.JPG"
];

function formatTitle(name: string): string {
  const nameWithoutExt = name.replace(/\.[^/.]+$/, "");
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildImageUrls(supabaseUrl: string, bucket: string, rawFilename: string): { src: string; thumbnailSrc: string } {
  const cleanBase = supabaseUrl.replace(/\/+$/, '');
  const cleanFilename = rawFilename.replace(/^.*[\\\/]/, '');
  const baseName = cleanFilename.replace(/\.[^/.]+$/, "");

  // Original high-res image points to orginl/ folder
  const src = `${cleanBase}/storage/v1/object/public/${bucket}/orginl/${cleanFilename}`;
  
  // Lightweight WebP template thumbnail points to template/ folder (.webp format)
  const thumbnailSrc = `${cleanBase}/storage/v1/object/public/${bucket}/template/${baseName}.webp?v=2`;

  return { src, thumbnailSrc };
}

export async function GET() {
  try {
    const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseUrl = rawUrl.trim().replace(/^["']|["']$/g, '');
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ items: [], source: 'unconfigured' }, {
        headers: { 'Cache-Control': 'no-store' }
      });
    }

    const bucketName = 'VishakaHu_Gallery';
    const items: ImageItem[] = [];
    const seenBases = new Set<string>();

    // 1. Scan orginl/ folder for original photos
    const { data: orgFiles } = await supabase
      .storage
      .from(bucketName)
      .list('orginl', { limit: 100 });

    if (orgFiles && orgFiles.length > 0) {
      for (const file of orgFiles) {
        if (file.name.startsWith('.')) continue;
        const ext = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')).toLowerCase() : '';
        
        if (SUPPORTED_EXTENSIONS.has(ext)) {
          const baseName = file.name.replace(/\.[^/.]+$/, "");
          if (!seenBases.has(baseName)) {
            seenBases.add(baseName);
            const { src, thumbnailSrc } = buildImageUrls(supabaseUrl, bucketName, file.name);
            items.push({
              id: baseName,
              src,
              thumbnailSrc,
              title: formatTitle(file.name),
              filename: file.name
            });
          }
        }
      }
    }

    // 2. Scan root folder for any newly uploaded images not yet in orginl/
    const { data: rootFiles } = await supabase
      .storage
      .from(bucketName)
      .list('', { limit: 100 });

    if (rootFiles && rootFiles.length > 0) {
      for (const file of rootFiles) {
        if (file.name.startsWith('.') || !file.name.includes('.')) continue;
        const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        if (SUPPORTED_EXTENSIONS.has(ext)) {
          const baseName = file.name.replace(/\.[^/.]+$/, "");
          if (!seenBases.has(baseName)) {
            seenBases.add(baseName);
            const { src, thumbnailSrc } = buildImageUrls(supabaseUrl, bucketName, file.name);
            items.push({
              id: baseName,
              src,
              thumbnailSrc,
              title: formatTitle(file.name),
              filename: file.name
            });
          }
        }
      }
    }

    // 3. Fallback if SDK list returns empty (e.g. RLS on list())
    if (items.length === 0) {
      for (const filename of DEFAULT_GALLERY_FILES) {
        const baseName = filename.replace(/\.[^/.]+$/, "");
        if (!seenBases.has(baseName)) {
          seenBases.add(baseName);
          const { src, thumbnailSrc } = buildImageUrls(supabaseUrl, bucketName, filename);
          items.push({
            id: baseName,
            src,
            thumbnailSrc,
            title: formatTitle(filename),
            filename
          });
        }
      }
    }

    return NextResponse.json({ items, source: `supabase-storage:${bucketName}` }, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
      }
    });
  } catch (error) {
    console.error("Error loading gallery photos from Supabase:", error);
    return NextResponse.json({ items: [], error: String(error) }, {
      headers: { 'Cache-Control': 'no-store' }
    });
  }
}
