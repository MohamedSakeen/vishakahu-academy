import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface ImageItem {
  id: string;
  src: string;
  title: string;
  filename: string;
}

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

// Known gallery images uploaded to Supabase storage bucket 'VishakaHu_Gallery'
const KNOWN_GALLERY_IMAGES = [
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

export async function GET() {
  try {
    const supabaseUrlConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrlConfigured) {
      return NextResponse.json({ items: [], source: 'unconfigured' });
    }

    const bucketName = 'VishakaHu_Gallery';
    const items: ImageItem[] = [];

    // 1. Try listing directly from Supabase Storage bucket 'VishakaHu_Gallery'
    const { data: storageFiles, error: storageError } = await supabase
      .storage
      .from(bucketName)
      .list('', { limit: 100 });

    if (!storageError && storageFiles && storageFiles.length > 0) {
      for (const file of storageFiles) {
        if (file.name.startsWith('.')) continue;
        const ext = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')).toLowerCase() : '';
        if (SUPPORTED_EXTENSIONS.has(ext) || file.id) {
          const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(file.name);
          items.push({
            id: file.id || file.name,
            src: publicUrlData.publicUrl,
            title: formatTitle(file.name),
            filename: file.name
          });
        }
      }
    }

    // 2. If list() is restricted by RLS but bucket is public, construct public URLs for uploaded images
    if (items.length === 0) {
      for (const filename of KNOWN_GALLERY_IMAGES) {
        const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filename);
        items.push({
          id: filename,
          src: publicUrlData.publicUrl,
          title: formatTitle(filename),
          filename: filename
        });
      }
    }

    return NextResponse.json({ items, source: `supabase-storage:${bucketName}` });
  } catch (error) {
    console.error("Error loading gallery photos from Supabase:", error);
    return NextResponse.json({ items: [], error: String(error) });
  }
}
