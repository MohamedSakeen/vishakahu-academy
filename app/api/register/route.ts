import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// Strict email RFC 5322 simplified pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Strict name pattern allowing standard letters, spaces, dots, hyphens, and apostrophes
const NAME_REGEX = /^[a-zA-Z\s.'-]+$/;

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check (Anti-Brute Force / Anti-DDoS)
    const clientIp = getClientIp(req);
    // Allow at most 5 registration attempts per 15 minutes per IP address
    const rateCheck = rateLimit(`register:${clientIp}`, 5, 15 * 60 * 1000);

    if (!rateCheck.success) {
      console.warn(`[RateLimit] Registration rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { error: 'Too many registration attempts. Please wait a few minutes before trying again.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.retryAfterSeconds),
            'X-RateLimit-Limit': String(rateCheck.limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // 2. Parse & Extract Request Payload
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
    }

    const { name, email, phone, website, formTime } = body;

    // 3. Anti-Automation: Honeypot Detection
    // Invisible honeypot field filled only by automated scrapers/bots
    if (website && typeof website === 'string' && website.trim().length > 0) {
      console.warn(`[Anti-Bot] Honeypot triggered from IP: ${clientIp}`);
      // Sinkhole: return simulated success without storing in database
      return NextResponse.json({ success: true, message: 'Application submitted successfully.' });
    }

    // 4. Anti-Automation: Submission Velocity / Rapid Bot Trap
    // Humans take at least 1.2s to fill out and submit the form
    if (formTime && typeof formTime === 'number') {
      const elapsedMs = Date.now() - formTime;
      if (elapsedMs > 0 && elapsedMs < 1200) {
        console.warn(`[Anti-Bot] Sub-human submission speed (${elapsedMs}ms) detected from IP: ${clientIp}`);
        // Sinkhole: return simulated success
        return NextResponse.json({ success: true, message: 'Application submitted successfully.' });
      }
    }

    // 5. Strict Server-Side Validation & Sanitization
    if (!name || typeof name !== 'string' || !email || typeof email !== 'string' || !phone) {
      return NextResponse.json(
        { error: 'Full name, email address, and phone number are required.' },
        { status: 400 }
      );
    }

    // Sanitize and validate Name (prevent XSS, HTML tags, and CSV formula injection)
    let cleanName = name
      .replace(/[<>{}[\]\\\/]/g, '')
      .replace(/^[=\+\-@\t\r]+/, '') // Strip dangerous spreadsheet formula prefixes
      .trim();

    if (cleanName.length < 2 || cleanName.length > 100 || !NAME_REGEX.test(cleanName)) {
      return NextResponse.json(
        { error: 'Please enter a valid full name (2-100 characters, letters only).' },
        { status: 400 }
      );
    }

    // Sanitize and validate Email
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail.length > 254 || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Sanitize and validate Phone (Strict Indian 10-digit mobile)
    const cleanPhone = String(phone).replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: 'Mobile number must be exactly 10 digits.' },
        { status: 400 }
      );
    }

    // 6. Connect to Supabase
    const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseUrl = rawUrl.trim().replace(/^["']|["']$/g, '');
    const supabaseKey = (
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      ''
    ).trim().replace(/^["']|["']$/g, '');

    if (!supabaseUrl || !supabaseKey) {
      console.error("[Config Error] Supabase environment variables missing on server.");
      return NextResponse.json(
        { error: 'Registration service temporarily unavailable.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 7. Insert Cleaned Data into Database
    const { data, error } = await supabase
      .from('student_registrations')
      .insert([{ name: cleanName, email: cleanEmail, phone: cleanPhone }]);

    if (error) {
      // Log technical error details on the server only (prevents info disclosure)
      console.error("[Database Error] Supabase insert failed:", error.message);
      return NextResponse.json(
        { error: 'Unable to process registration at this time. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully.',
      data,
    });
  } catch (err: any) {
    console.error("[Server Error] Unhandled registration exception:", err?.message || err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
