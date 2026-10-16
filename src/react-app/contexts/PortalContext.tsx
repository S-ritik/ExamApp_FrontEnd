import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Building2 } from 'lucide-react';
import { api, extractApiError } from '../hooks/useApi';
import { getPortalSubdomain, validateSubdomain, mainPortalLoginUrl } from '../utils/subdomain';
import { resolveLogoUrl } from '../utils/branding';

export interface PortalInstitute {
  id: number;
  name: string;
  logo: string | null;
  subdomain: string;
  website: string | null;
  description: string | null;
}

type PortalStatus = 'root' | 'loading' | 'found' | 'not_found' | 'error';

interface PortalState {
  status: PortalStatus;
  subdomain: string | null;
  institute: PortalInstitute | null;
}

const PortalContext = createContext<PortalState>({ status: 'root', subdomain: null, institute: null });

/** The institute behind the current subdomain (null on the root portal). */
export const usePortal = () => useContext(PortalContext);

/**
 * Resolves the host's subdomain to an institute once, at startup. Unknown,
 * reserved or malformed subdomains get a "portal not found" page instead of
 * the app; the backend rejects their API calls with 404 regardless.
 */
export function PortalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortalState>(() => {
    const subdomain = getPortalSubdomain();
    if (!subdomain) return { status: 'root', subdomain: null, institute: null };
    if (validateSubdomain(subdomain)) return { status: 'not_found', subdomain, institute: null };
    return { status: 'loading', subdomain, institute: null };
  });

  useEffect(() => {
    if (state.status !== 'loading' || !state.subdomain) return;
    let cancelled = false;
    api
      .get<PortalInstitute>(`/auth/institutes/by-subdomain/${encodeURIComponent(state.subdomain)}/`)
      .then((res) => {
        if (!cancelled) setState({ status: 'found', subdomain: state.subdomain, institute: res.data });
      })
      .catch((err) => {
        if (cancelled) return;
        // Only a definite 404 blocks the app; network/server errors fall through
        // to normal behaviour (the backend still enforces the subdomain).
        const status = extractApiError(err).status === 404 ? 'not_found' : 'error';
        setState({ status, subdomain: state.subdomain, institute: null });
      });
    return () => {
      cancelled = true;
    };
  }, [state.status, state.subdomain]);

  // Browser tab shows the institute, not DashoExams
  useEffect(() => {
    const institute = state.institute;
    if (!institute) return;
    document.title = `${institute.name} | Exam Portal`;
    if (institute.logo) {
      const logo = resolveLogoUrl(institute.logo);
      document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"], link[rel="apple-touch-icon"]').forEach((link) => {
        link.href = logo;
        link.removeAttribute('type');
      });
    }
  }, [state.institute]);

  if (state.status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-slate-200 dark:border-gray-800 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (state.status === 'not_found') {
    return <PortalNotFound subdomain={state.subdomain} />;
  }

  return <PortalContext.Provider value={state}>{children}</PortalContext.Provider>;
}

function PortalNotFound({ subdomain }: { subdomain: string | null }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-800 p-8 text-center">
        <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
          <Building2 className="w-7 h-7 text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Institute not found</h1>
        <p className="text-sm text-slate-600 dark:text-gray-400 mb-6">
          No active institute is registered under{' '}
          <span className="font-semibold font-mono text-slate-800 dark:text-gray-200 break-all">
            {subdomain ? `"${subdomain}"` : 'this address'}
          </span>
          . Check the address with your institute, or sign in from the main portal.
        </p>
        <a
          href={mainPortalLoginUrl()}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
        >
          Go to main portal
        </a>
      </div>
    </div>
  );
}
