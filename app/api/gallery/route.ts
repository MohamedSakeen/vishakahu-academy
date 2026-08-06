import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface ImageItem {
  id: string;
  src: string;
  title: string;
  filename: string;
}

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

function formatTitle(name: string): string {
  const nameWithoutExt = name.replace(/\.[^/.]+$/, "");
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Read photos recursively from local app/gallery/uploads as fallback
function getLocalPhotos(): ImageItem[] {
  const uploadsDir = path.join(process.cwd(), 'app', 'gallery', 'uploads');
  
  if (!fs.existsSync(uploadsDir)) {
    return [];
  }

  const items: ImageItem[] = [];

  function scanDir(dirPath: string, relativePath: string = '') {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        scanDir(fullPath, relPath);
      } else if (entry.isFile() && SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        const src = `/gallery/uploads/${relPath.split('/').map(encodeURIComponent).join('/')}`;
        items.push({
          id: relPath,
          src,
          title: formatTitle(entry.name),
          filename: entry.name
        });
      }
    }
  }

  scanDir(uploadsDir);
  return items;
}

export async function GET() {
  try {
    const supabaseUrlConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrlConfigured) {
      // 1. Try fetching from Supabase 'gallery_photos' table
      const { data: dbPhotos, error: dbError } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!dbError && dbPhotos && dbPhotos.length > 0) {
        const items = dbPhotos.map((photo) => ({
          id: photo.id.toString(),
          src: photo.url || photo.src,
          title: photo.title || photo.filename || 'Karate Photo',
          filename: photo.filename || ''
        }));
        return NextResponse.json({ items, source: 'supabase' });
      }

      // 2. Try listing files from Supabase Storage bucket 'gallery'
      const { data: storageFiles, error: storageError } = await supabase
        .storage
        .from('gallery')
        .list('', { limit: 100 });

      if (!storageError && storageFiles && storageFiles.length > 0) {
        const items: ImageItem[] = [];

        for (const file of storageFiles) {
          if (file.name.startsWith('.')) continue;

          if (!file.id) {
            // Folder inside bucket
            const { data: subFiles } = await supabase
              .storage
              .from('gallery')
              .list(file.name);

            if (subFiles) {
              for (const subFile of subFiles) {
                const { data: publicUrlData } = supabase
                  .storage
                  .from('gallery')
                  .getPublicUrl(`${file.name}/${subFile.name}`);

                items.push({
                  id: `${file.name}-${subFile.name}`,
                  src: publicUrlData.publicUrl,
                  title: formatTitle(subFile.name),
                  filename: subFile.name
                });
              }
            }
          } else {
            const { data: publicUrlData } = supabase
              .storage
              .from('gallery')
              .getPublicUrl(file.name);

            items.push({
              id: file.id,
              src: publicUrlData.publicUrl,
              title: formatTitle(file.name),
              filename: file.name
            });
          }
        }

        if (items.length > 0) {
          return NextResponse.json({ items, source: 'supabase-storage' });
        }
      }
    }

    // Fallback to local files
    const items = getLocalPhotos();
    return NextResponse.json({ items, source: 'local-fallback' });
  } catch (error) {
    console.error("Error loading gallery photos:", error);
    const items = getLocalPhotos();
    return NextResponse.json({ items, source: 'local-fallback-error' });
  }
}
