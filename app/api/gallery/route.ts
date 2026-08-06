import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface ImageItem {
  id: string;
  src: string;          // Full original high-res image URL
  thumbnailSrc: string; // Lightweight WebP template thumbnail URL (~40KB)
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

function buildImageUrls(supabaseUrl: string, bucket: string, pathOrFilename: string): { src: string; thumbnailSrc: string } {
  const cleanPath = pathOrFilename.replace(/^\/+/, '');
  const cleanBase = supabaseUrl.replace(/\/+$/, '');

  let src = `${cleanBase}/storage/v1/object/public/${bucket}/${cleanPath}`;
  let thumbnailSrc = `${cleanBase}/storage/v1/render/image/public/${bucket}/${cleanPath}?width=450&quality=75&format=webp`;

  // Handle specific template / orginl folder path conventions
  if (cleanPath.startsWith('template/') || cleanPath.startsWith('templates/')) {
    thumbnailSrc = `${cleanBase}/storage/v1/object/public/${bucket}/${cleanPath}`;
    const origPath = cleanPath.replace(/^templates?\//, 'orginl/');
    src = `${cleanBase}/storage/v1/object/public/${bucket}/${origPath}`;
  } else if (cleanPath.startsWith('orginl/') || cleanPath.startsWith('original/') || cleanPath.startsWith('originals/')) {
    src = `${cleanBase}/storage/v1/object/public/${bucket}/${cleanPath}`;
    const tempPath = cleanPath.replace(/^(orginl|originals?)\//, 'template/');
    thumbnailSrc = `${cleanBase}/storage/v1/object/public/${bucket}/${tempPath}`;
  }

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
    const seenIds = new Set<string>();

    // 1. Try listing files from Supabase Storage bucket 'VishakaHu_Gallery'
    const foldersToScan = ['', 'template', 'orginl', 'original'];
    for (const folder of foldersToScan) {
      const { data: storageFiles } = await supabase
        .storage
        .from(bucketName)
        .list(folder, { limit: 100 });

      if (storageFiles && storageFiles.length > 0) {
        for (const file of storageFiles) {
          if (file.name.startsWith('.')) continue;
          const ext = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')).toLowerCase() : '';
          
          if (SUPPORTED_EXTENSIONS.has(ext) || file.id) {
            const relativeFilePath = folder ? `${folder}/${file.name}` : file.name;
            const uniqueId = file.id || relativeFilePath;

            if (!seenIds.has(uniqueId)) {
              seenIds.add(uniqueId);
              const { src, thumbnailSrc } = buildImageUrls(supabaseUrl, bucketName, relativeFilePath);
              items.push({
                id: uniqueId,
                src,
                thumbnailSrc,
                title: formatTitle(file.name),
                filename: file.name
              });
            }
          }
        }
      }
    }

    // 2. If SDK list returns nothing (e.g. RLS on list()), generate optimized items for default gallery files
    if (items.length === 0) {
      for (const filename of DEFAULT_GALLERY_FILES) {
        const { src, thumbnailSrc } = buildImageUrls(supabaseUrl, bucketName, filename);
        items.push({
          id: filename,
          src,
          thumbnailSrc,
          title: formatTitle(filename),
          filename
        });
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
