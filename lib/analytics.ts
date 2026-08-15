export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

/**
 * Dispatches a custom GA4 event if Google Analytics is loaded and configured.
 */
export const trackEvent = ({ action, category, label, value, ...rest }: GTagEvent) => {
  if (
    typeof window !== 'undefined' &&
    typeof (window as unknown as { gtag?: Function }).gtag === 'function' &&
    GA_TRACKING_ID &&
    GA_TRACKING_ID.trim() !== ''
  ) {
    (window as unknown as { gtag: Function }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

/**
 * Tracks conversion clicks for student enrollment / registration.
 */
export const trackEnrollClick = (location: string = 'unknown') => {
  trackEvent({
    action: 'enroll_click',
    category: 'conversion',
    label: location,
  });
};

/**
 * Tracks clicks on WhatsApp inquiry links.
 */
export const trackWhatsAppClick = (location: string = 'footer') => {
  trackEvent({
    action: 'whatsapp_click',
    category: 'conversion',
    label: location,
  });
};

/**
 * Tracks clicks on direct phone call links.
 */
export const trackPhoneClick = (location: string = 'contact_section') => {
  trackEvent({
    action: 'phone_click',
    category: 'conversion',
    label: location,
  });
};

/**
 * Tracks clicks on contact methods (e.g. email, direct messaging).
 */
export const trackContactClick = (method: string, location: string) => {
  trackEvent({
    action: 'contact_click',
    category: 'conversion',
    label: `${method}_${location}`,
  });
};
