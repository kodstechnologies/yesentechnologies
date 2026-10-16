import { MAIN_NAV } from '@/lib/service-lines';

export type FooterLink = { label: string; to?: string; href?: string; hash?: string };
const SERVICE_LABELS = ['Land & Earth', 'Marine', 'Engineering Advisory'];
export const FOOTER_LINKS: { heading: string; items: FooterLink[] }[] = [
  { heading: 'Quick links', items: [
    { label: 'FAQ', to: '/faq' },
    { label: 'Disclaimer', to: '/legal', hash: 'disclaimer' },
    { label: 'Terms and Conditions', to: '/legal', hash: 'terms' },
    { label: 'Policies', to: '/legal', hash: 'policies' },
  ] },
  { heading: 'Company', items: MAIN_NAV.filter(item => item.to !== '/contact' && !SERVICE_LABELS.includes(item.label)).map(({ label, to }) => ({ label, to: to === '/marine' ? '/projects' : to })) },
  { heading: 'Services', items: [
    { label: 'Land & Earth', to: '/land-based' },
    { label: 'E-Marine', to: '/projects' },
    { label: 'Engineering Advisory', to: '/advisory' },
  ] },
  { heading: 'Connect', items: [
    { label: 'Contact', to: '/contact' },
    { label: 'Get a quote', to: '/enquire' },
  ] },
];