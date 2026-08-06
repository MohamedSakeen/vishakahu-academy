import { createClient } from '@supabase/supabase-js';

const getEnvVar = (key: string) => {
  const raw = process.env[key] || '';
  return raw.trim().replace(/^["']|["']$/g, '');
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export interface GalleryPhoto {
  id: string;
  src: string;
  category: string;
  title: string;
  filename: string;
  created_at?: string;
}
