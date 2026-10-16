import { useAuthContext } from '../contexts/AuthContext';
import { usePortal } from '../contexts/PortalContext';
import { resolveLogoUrl } from '../utils/branding';

export const DEFAULT_BRAND_NAME = 'DashoExams';
export const DEFAULT_BRAND_LOGO = '/examlogo.png';

export interface Branding {
  name: string;
  /** Loadable logo URL, or null for an institute that has not uploaded one. */
  logo: string | null;
  /** True when showing an institute rather than the DashoExams default. */
  isInstitute: boolean;
}

/**
 * Name and logo for the app chrome. On an institute portal
 * (kiit.exams.dashoapp.com) that is the portal's institute; elsewhere the
 * signed-in user's institute; otherwise DashoExams.
 */
export function useBranding(): Branding {
  const { institute: portalInstitute } = usePortal();
  const { user } = useAuthContext();

  const institute = portalInstitute ?? user?.institute ?? null;
  const name = institute?.name || (!portalInstitute && user?.institute_name) || null;

  if (!name) return { name: DEFAULT_BRAND_NAME, logo: DEFAULT_BRAND_LOGO, isInstitute: false };
  return { name, logo: institute?.logo ? resolveLogoUrl(institute.logo) : null, isInstitute: true };
}
