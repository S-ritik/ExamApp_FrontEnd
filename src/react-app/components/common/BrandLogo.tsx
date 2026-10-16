import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { useBranding, DEFAULT_BRAND_LOGO } from '../../hooks/useBranding';

/**
 * Logo for the current brand (see useBranding). An institute without a
 * usable logo gets a neutral building icon, never the DashoExams mark.
 */
export default function BrandLogo({ className = '' }: { className?: string }) {
  const { name, logo, isInstitute } = useBranding();
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!logo || failedSrc === logo) {
    return isInstitute
      ? <Building2 className={`${className} text-slate-400`} aria-label={name} />
      : <img src={DEFAULT_BRAND_LOGO} alt={name} className={className} />;
  }
  return <img src={logo} alt={`${name} logo`} className={className} onError={() => setFailedSrc(logo)} />;
}
