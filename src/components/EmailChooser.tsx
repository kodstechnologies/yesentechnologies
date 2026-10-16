import { useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { siGmail, siZoho, siGodaddy, siProtonmail, siIcloud } from "simple-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const COMPANY_EMAIL = "info@yesentechnologies.com";

const enc = encodeURIComponent;

const SiIcon = ({ icon }: { icon: { path: string; hex: string } }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={`#${icon.hex}`} aria-hidden="true"><path d={icon.path} /></svg>
);
const MsSquares = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <rect x="1" y="1" width="10" height="10" fill="#F25022" /><rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
    <rect x="1" y="13" width="10" height="10" fill="#00A4EF" /><rect x="13" y="13" width="10" height="10" fill="#FFB900" />
  </svg>
);
const OutlookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="9" y="4" width="14" height="16" rx="2" fill="#28A8EA" /><rect x="1" y="6" width="12" height="12" rx="2" fill="#0078D4" />
    <ellipse cx="7" cy="12" rx="2.6" ry="3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
  </svg>
);
const YahooIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><text x="12" y="18" textAnchor="middle" fontSize="16" fontWeight="900" fontFamily="Arial, sans-serif" fill="#6001D2">Y!</text></svg>
);

const providers = (to: string) => [
  { name: "Gmail", icon: <SiIcon icon={siGmail} />, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}` },
  { name: "Outlook", icon: <OutlookIcon />, href: `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(to)}` },
  { name: "Microsoft 365", icon: <MsSquares />, href: `https://outlook.office.com/mail/deeplink/compose?to=${enc(to)}` },
  { name: "Yahoo", icon: <YahooIcon />, href: `https://compose.mail.yahoo.com/?to=${enc(to)}` },
  { name: "Zoho", icon: <SiIcon icon={siZoho} />, href: `https://mail.zoho.com/zm/#mail/compose?to=${enc(to)}` },
  { name: "GoDaddy", icon: <SiIcon icon={siGodaddy} />, href: "https://email.godaddy.com/" },
  { name: "Proton", icon: <SiIcon icon={siProtonmail} />, href: `https://mail.proton.me/u/0/inbox#mailto=${enc(to)}` },
  { name: "iCloud", icon: <SiIcon icon={siIcloud} />, href: "https://www.icloud.com/mail" },
];

export function EmailChooser({ children, className, ariaLabel, email = COMPANY_EMAIL }: { children: ReactNode; className?: string; ariaLabel?: string; email?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <a href={`mailto:${email}`} aria-label={ariaLabel} title={ariaLabel} className={className} onClick={(event) => { event.preventDefault(); setOpen(value => !value); }}>
          {children}
        </a>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={10} className="w-[22rem] max-w-[calc(100vw-2rem)] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border-brand-navy/10 bg-popover p-0 shadow-2xl">
        <div className="bg-brand-navy px-5 pb-5 pt-4 text-brand-ivory">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-brand-leaf">Write to us</span>
          <p className="mt-2 break-all text-base font-semibold">{email}</p>
          <div className="mt-4 grid grid-cols-2! gap-2">
            <a href={`mailto:${email}`} className="flex h-10 items-center justify-center gap-2 rounded-full bg-brand-ivory text-xs font-semibold text-brand-navy transition-transform hover:-translate-y-0.5">
              <Mail size={14} /> Mail app
            </a>
            <button type="button" onClick={copy} className="flex h-10 items-center justify-center gap-2 rounded-full border border-brand-ivory/30 text-xs font-semibold text-brand-ivory transition-colors hover:bg-brand-ivory/10">
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.26em] text-muted-foreground">Or open in webmail</p>
          <ul className="grid grid-cols-4! gap-2">
            {providers(email).map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={p.name}
                  className="group flex flex-col items-center gap-1.5 rounded-xl border border-border px-1 py-3 text-brand-navy transition-all hover:-translate-y-0.5 hover:border-brand-forest/40 hover:bg-secondary"
                >
                  <span className="relative grid h-9 w-9 place-items-center rounded-full bg-card shadow-sm ring-1 ring-border transition-transform group-hover:scale-110">
                    {p.icon}
                    <ArrowUpRight size={10} className="absolute -right-1 -top-1 opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  <span className="text-center text-[0.65rem] font-medium leading-tight">{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
