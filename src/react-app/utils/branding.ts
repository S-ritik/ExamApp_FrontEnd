export interface CachedBranding {
  id?: number | string;
  name: string;
  logo: string | null;
  subdomain?: string | null;
  website?: string | null;
  description?: string | null;
}

/**
 * Resolves any logo URL (absolute URL, relative path, or empty) into
 * a fully qualified, loadable image URL.
 */
export const resolveLogoUrl = (url: string | null | undefined): string => {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return '/examlogo.png';
  }
  const trimmed = url.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // Relative path (e.g. /media/institute_logos/xxx.png or media/...)
  const backendBase =
    (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/api\/?$/, '') ||
    'http://127.0.0.1:8000';

  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${backendBase}${cleanPath}`;
};

export const getCachedBranding = (): CachedBranding | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('cached_institute_branding');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.name || parsed.logo)) {
        return parsed;
      }
    }
  } catch (e) {
    // Ignore parse errors
  }
  return null;
};

export const setCachedBranding = (branding: Partial<CachedBranding>) => {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCachedBranding() || {};
    const merged = { ...existing, ...branding };
    localStorage.setItem('cached_institute_branding', JSON.stringify(merged));
  } catch (e) {
    // Ignore storage errors
  }
};

