/**
 * Institute subdomain rules. Mirrors the backend (accounts/subdomains.py) —
 * the server is the authority; this gives instant feedback in forms and lets
 * the app recognise portal hosts.
 */

export const ROOT_DOMAIN = 'exams.dashoapp.com';
const DEV_ROOT_DOMAIN = 'localhost';

const ROOT_ALIASES = new Set(['www']);

export const RESERVED_SUBDOMAINS = new Set([
  'www', 'api', 'app', 'apps', 'admin', 'administrator', 'root', 'platform',
  'owner', 'superadmin', 'dashboard', 'portal', 'auth', 'login', 'logout',
  'signin', 'signup', 'register', 'sso', 'oauth', 'account', 'accounts',
  'mail', 'email', 'webmail', 'smtp', 'imap', 'pop', 'mx', 'ns', 'ns1', 'ns2',
  'ftp', 'sftp', 'ssh', 'vpn', 'git', 'cdn', 'static', 'media', 'assets',
  'files', 'img', 'images', 'exam', 'exams', 'timetable', 'dashoapp',
  'billing', 'payments', 'help', 'support', 'docs', 'blog', 'status',
  'health', 'metrics', 'monitor', 'internal', 'dev', 'staging', 'test',
  'qa', 'beta', 'localhost',
]);

const MIN_LENGTH = 2;
const MAX_LENGTH = 63;
const FORMAT_RE = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

/** Trim + lowercase. Empty means "no subdomain". */
export const normalizeSubdomain = (value: string | null | undefined): string =>
  (value ?? '').trim().toLowerCase();

/** Error message for a (normalised) subdomain, or null if valid. Empty is valid (= none). */
export const validateSubdomain = (value: string): string | null => {
  if (!value) return null;
  if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    return `Portal address must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`;
  }
  if (!FORMAT_RE.test(value)) {
    return 'Use only lowercase letters, numbers and hyphens (no spaces, "/", "." or other special characters), starting and ending with a letter or number.';
  }
  if (value.includes('--')) return 'Portal address cannot contain consecutive hyphens.';
  if (RESERVED_SUBDOMAINS.has(value)) return `"${value}" is reserved and cannot be used.`;
  return null;
};

/** Host of an institute's portal, e.g. 'hd' -> 'hd.exams.dashoapp.com'. */
export const portalHost = (subdomain: string): string => `${subdomain}.${ROOT_DOMAIN}`;

export const portalUrl = (subdomain: string): string => `https://${portalHost(subdomain)}`;

const isDevHost = (hostname: string) =>
  hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost');

/**
 * The institute portal label for the current host, or null on the root
 * portal. `?subdomain=` is honoured on local dev hosts only, so it cannot be
 * used to dress the production site in another institute's branding.
 */
export const getPortalSubdomain = (): string | null => {
  if (typeof window === 'undefined') return null;
  const hostname = window.location.hostname.toLowerCase();

  if (isDevHost(hostname)) {
    const qa = new URLSearchParams(window.location.search).get('subdomain');
    if (qa) return normalizeSubdomain(qa);
  }

  for (const root of [ROOT_DOMAIN, DEV_ROOT_DOMAIN]) {
    if (hostname.endsWith('.' + root)) {
      const label = hostname.slice(0, -(root.length + 1));
      return label && !ROOT_ALIASES.has(label) ? label : null;
    }
  }
  return null;
};

/** Login page of the main (non-institute) portal for the current environment. */
export const mainPortalLoginUrl = (): string => {
  if (typeof window !== 'undefined' && isDevHost(window.location.hostname)) {
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${window.location.protocol}//localhost${port}/login`;
  }
  return `https://${ROOT_DOMAIN}/login`;
};
