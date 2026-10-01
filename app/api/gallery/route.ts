import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('is_pinned', { ascending: false, nullsLast: true })
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ items: data || [], source: 'supabase-db' }, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=60'
      }
    });
  } catch (error) {
    console.error("Error loading gallery photos from DB:", error);
    return NextResponse.json({ items: [], error: String(error) }, {
      headers: { 'Cache-Control': 'no-store' }
    });
  }
}
