import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { LocationFields } from "../components/LocationFields";
import { Checkbox } from "@/components/ui/checkbox";
import { SOLAR_SERVICES, SOLAR_SYSTEMS, initialSolarService, needsSolarConsent } from "@/content/enquiry-details";
import { quoteStart } from "@/content/quote-start";
import { PRODUCTS, ELCO_MODEL_NAMES, initialProduct, initialElcoModel } from "@/content/product-enquiry";
import {
  submitEngineeringAdvisoryEnquiry,
  submitMarineEnquiry,
  submitProductUpdatedEnquiry,
} from "@/api/forms";
import { ArrowLeft, ArrowRight, Check, Mail, MapPin, Phone, X } from "lucide-react";

/* ---------------- data ---------------- */

const INTERESTS = [
  { key: "land", label: "Land & Earth", hint: "Grid Tie, Off Grid, Hybrid, Microgrid" },
  { key: "marine", label: "Marine", hint: "New electric boats and retrofits" },
  { key: "advisory", label: "Engineering Advisory", hint: "Owner's engineering, due diligence, BESS" },
  { key: "products", label: "Products", hint: "B-Kool, ELCO" },
] as const;

export type InterestKey = (typeof INTERESTS)[number]["key"];
export const INTEREST_KEYS = INTERESTS.map((i) => i.key) as readonly string[];

const LAND_TYPES: readonly string[] = SOLAR_SYSTEMS;
const GRID_OPTIONS = ["Available", "Unreliable", "Not available"];
const PROJECT_STAGES = ["Concept", "Design", "Construction", "Operating"];
const MARINE_MODES = [
  { key: "Greenfield", label: "Greenfield (new build)" },
  { key: "Retrofit", label: "Retrofit (existing vessel)" },
] as const;
type MarineMode = (typeof MARINE_MODES)[number]["key"];
const GREENFIELD_NEEDS = ["Electric Boat", "Solar Electric Boat", "Electric Propulsion Kit"];
const RETROFIT_NEEDS = ["Vessel Retrofit", "Electric Propulsion Kit"];
const VESSEL_TYPES = ["Ferry", "Tour boat", "Houseboat", "Trawler", "Yacht", "Workboat", "Patrol craft", "Other"];
const ENGINE_TYPES = ["Diesel", "Petrol", "Other"];
const CURRENCIES = ["INR", "USD", "AED", "AUD"];
const STEPS = ["Service", "Project", "Contact"];

/* ---------------- primitives ---------------- */

const inputCls =
  "w-full rounded-[0.7rem] border-[1.5px] border-brand-navy/12 bg-white/75 px-3.5 py-3 text-[0.9rem] text-brand-navy outline-none transition-colors placeholder:text-brand-navy/35 focus:border-brand-sky focus:bg-white";

function handleNumericInput(value: string, allowDecimal = false): string {
  if (allowDecimal) {
    return value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  }
  return value.replace(/[^0-9]/g, '');
}

function NumericInput({ className, name, defaultValue, allowDecimal = false, ...props }: any) {
  const [value, setValue] = useState(defaultValue || '');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, arrows, home, end
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    
    // Allow Ctrl/Cmd + A (select all), Ctrl/Cmd + C (copy), Ctrl/Cmd + V (paste), Ctrl/Cmd + X (cut)
    if (e.ctrlKey || e.metaKey) {
      if (['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
        return;
      }
    }

    // Allow navigation and edit keys
    if (allowedKeys.includes(e.key)) {
      return;
    }

    // Allow numbers
    if (/^[0-9]$/.test(e.key)) {
      return;
    }

    // Allow decimal point if decimals are allowed and there isn't already one
    if (allowDecimal && e.key === '.' && !value.includes('.')) {
      return;
    }

    // Block everything else (letters, symbols, etc.)
    e.preventDefault();
  };

  return (
    <input
      className={className}
      name={name}
      value={value}
      onChange={(e) => setValue(handleNumericInput(e.target.value, allowDecimal))}
      onKeyDown={handleKeyDown}
      inputMode="numeric"
      {...props}
    />
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-navy/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function Chips({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full border-[1.5px] px-3.5 py-2 text-[0.8rem] transition-colors ${
            value === o
              ? "border-brand-navy bg-brand-navy text-brand-ivory"
              : "border-brand-navy/12 bg-white/70 text-brand-navy hover:border-brand-sky"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function StepLabel({ title }: { title: string }) {
  return (
    <h3 className="mb-4 font-display text-[1.15rem] font-normal tracking-[-0.01em] text-brand-navy">
      {title}
    </h3>
  );
}

/* ---------------- form ---------------- */

export type QuoteInitial = { service?: InterestKey; type?: string; mode?: string; message?: string };

export function QuoteForm({
  initial = {},
  onClose,
}: {
  initial?: QuoteInitial;
  /** When set (modal use), the success "Back to home" button closes instead of navigating. */
  onClose?: () => void;
}) {
  const [interest, setInterest] = useState<InterestKey | null>(initial.service ?? null);
  const initialMode: MarineMode | null =
    initial.service === "marine"
      ? /retro/i.test(`${initial.type ?? ""} ${initial.mode ?? ""}`)
        ? "Retrofit"
        : /green|new/i.test(`${initial.type ?? ""} ${initial.mode ?? ""}`)
          ? "Greenfield"
          : null
      : null;
  const [mode, setMode] = useState<MarineMode | null>(initialMode);
  const [need, setNeed] = useState<string | null>(null);
  const [landType, setLandType] = useState<string>(
    initial.service === "land" && initial.type && LAND_TYPES.includes(initial.type) ? initial.type : "",
  );
  const [solarService, setSolarService] = useState(initialSolarService(initial.type));
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState<number>(() => quoteStart(initial).step);
  const [product, setProduct] = useState<string | null>(
    initial.service === "products" ? initialProduct(initial.type) : null,
  );
  const [elcoModel, setElcoModel] = useState<string>(
    initial.service === "products" ? initialElcoModel(initial.type) : "",
  );
  const serviceLabel = INTERESTS.find((i) => i.key === interest)?.label ?? "";
  const choice =
    interest === "marine"
      ? need ?? ""
      : interest === "land"
        ? landType
        : interest === "products"
          ? product === "ELCO" && elcoModel
            ? `ELCO ${elcoModel}`
            : product ?? ""
          : "";
  const canContinue =
    step === 0
      ? interest !== null
      : step === 1
        ? interest === "marine"
          ? mode !== null && need !== null
          : interest === "products"
            ? product !== null
            : true
        : true;
  const reset = () => {
    setSent(false);
    setInterest(null);
    setMode(null);
    setNeed(null);
    setLandType("");
    setSolarService("");
    setProduct(null);
    setElcoModel("");
    setTermsAccepted(false);
    setStep(0);
  };

  const stepTitles = ["Which service do you need?", "Tell us about the project", "How can we reach you?"];

  return (
    <div className="quote-form grid min-w-0 overflow-hidden rounded-2xl border border-brand-navy/10 bg-shell shadow-[0_50px_100px_-60px_color-mix(in_oklab,var(--brand-navy)_70%,transparent)] sm:rounded-[1.75rem] lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
      {/* rail */}
      <aside className="relative hidden flex-col overflow-hidden bg-brand-navy p-7 text-brand-ivory sm:p-9 lg:flex">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand-sky)_40%,transparent),transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand-leaf)_35%,transparent),transparent_70%)]" />
        {onClose ? (
          <button type="button" onClick={onClose} className="relative inline-flex items-center gap-2 self-start font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-ivory/60 transition-colors hover:text-brand-ivory">
            <X size={13} /> Close
          </button>
        ) : null}
        <p className="relative mt-8 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-brand-sky">Get a quote</p>
        <h1 className="relative mt-3 font-display text-[clamp(1.9rem,2.6vw,2.4rem)] font-light leading-[1.08] tracking-[-0.03em]">
          One form for{" "}
          <span className="bg-[linear-gradient(100deg,var(--brand-sky),var(--brand-leaf))] bg-clip-text text-transparent">everything</span>{" "}
          we build.
        </h1>

        <ol className="relative mt-9 space-y-1">
          {STEPS.map((label, idx) => {
            const done = sent || idx < step;
            const current = !sent && idx === step;
            return (
              <li key={label}>
                <button
                  type="button"
                  disabled={sent || idx > step}
                  onClick={() => setStep(idx)}
                  className={`flex w-full items-center gap-3.5 rounded-xl px-3 py-3 text-left transition-colors disabled:cursor-default ${current ? "bg-brand-ivory/10" : "hover:bg-brand-ivory/5"}`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[0.66rem] transition-colors ${done ? "bg-brand-leaf text-brand-navy" : current ? "bg-brand-ivory text-brand-navy" : "border border-brand-ivory/25 text-brand-ivory/50"}`}>
                    {done ? <Check size={14} strokeWidth={3} /> : idx + 1}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[0.92rem] ${current ? "text-brand-ivory" : "text-brand-ivory/70"}`}>{label}</span>
                    <span className="block truncate text-[0.72rem] text-brand-ivory/45">
                      {idx === 0 ? serviceLabel || "Choose a service line" : idx === 1 ? [mode, choice].filter(Boolean).join(" · ") || "Scope and site details" : "Name, email, budget"}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="relative mt-auto space-y-2.5 border-t border-brand-ivory/12 pt-6 text-[0.82rem] text-brand-ivory/75">
          <p className="flex items-center gap-2.5"><Mail size={14} className="text-brand-sky" /> info@yesentechnologies.com</p>
          <p className="flex items-center gap-2.5"><Phone size={14} className="text-brand-sky" /> +91 77080 07554</p>
          <p className="flex items-center gap-2.5"><MapPin size={14} className="text-brand-sky" /> Kochi, Kerala, India</p>
          <p className="pt-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-brand-ivory/40">1–2 day reply · Engineer reviewed · No obligation</p>
        </div>
      </aside>

      {/* panel */}
      {sent ? (
        <section className="flex flex-col items-center justify-center p-10 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(100deg,var(--brand-sky),var(--brand-leaf))] text-brand-ivory">
            <Check size={28} strokeWidth={2.6} />
          </span>
          <h2 className="mt-6 font-display text-[2rem] font-light text-brand-navy">Quote request received</h2>
          <p className="mt-3 max-w-[46ch] text-[0.92rem] leading-relaxed text-brand-navy/60">
            Thank you — our team will reply within 1–2 working days{choice ? ` about ${choice}` : ""}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {onClose ? (
              <button type="button" onClick={onClose} className="inline-flex h-12 items-center rounded-full border border-brand-navy/15 px-6 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-brand-navy hover:border-brand-leaf">Close</button>
            ) : (
              <Link to="/" className="inline-flex h-12 items-center rounded-full border border-brand-navy/15 px-6 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-brand-navy hover:border-brand-leaf">Back to home</Link>
            )}
            <button type="button" onClick={reset} className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-navy px-6 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-brand-ivory hover:opacity-90">Send another <ArrowRight size={14} /></button>
          </div>
        </section>
      ) : (
        <form
          className="relative flex flex-col p-6 sm:p-10"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
            const name = (fd.name ?? "").trim();
            const email = (fd.email ?? "").trim();
            if (needsSolarConsent(interest, fd.consent)) {
              toast.error("Please accept the terms before submitting your solar enquiry.");
              return;
            }
            if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              toast.error("Please enter your name and a valid email address.");
              return;
            }

            // Prepare payload based on interest type
            let payload: Record<string, any> = {
              clientName: name,
              name: name,
              email: email,
              phone: fd.phone || null,
              company: fd.company || null,
              message: fd.message || null,
              currency: fd.currency || null,
              budget: fd.budget || null,
              sourcePage: window.location.pathname,
            };

            // Engineering Advisory (Land & Earth + Advisory)
            if (interest === "land" || interest === "advisory") {
              payload = {
                ...payload,
                solarService: fd.solarService || null,
                systemInInterest: fd.landType || null,
                country: fd.country || null,
                state: fd.state || null,
                pincode: fd.pincode || null,
                city: fd.city || null,
                address: fd.address || null,
                load: fd.load || null,
                averageMonthlyElectricityBill: fd.monthlyElectricityBill || null,
                landArea: fd.roofLandArea || null,
                gridAvailability: fd.gridAvailability || null,
                projectStage: fd.projectStage || null,
                capacity: fd.capacityMwp || null,
                bessIncluded: fd.bessIncluded || null,
              };

              try {
                await submitEngineeringAdvisoryEnquiry(payload);
                setSent(true);
              } catch (error) {
                toast.error("Sorry, your request couldn't be sent. Please email info@yesentechnologies.com.");
              }
            }
            // Marine
            else if (interest === "marine") {
              payload = {
                ...payload,
                retrofitStatus: mode === "Retrofit" ? "retrofit existing" : mode === "Greenfield" ? "new build" : null,
                vesselCatagory: need === "Electric Propulsion Kit" ? "electric propulsion kit" : null,
                vesselType: fd.vesselType || null,
                vesselLength: fd.vesselLength || null,
                vesselWeight: fd.vesselWeight || null,
                currentEngineType: fd.engineType || null,
                yearOfBuild: fd.yearBuilt || null,
                currentEngineAndPropulsion: fd.currentPropulsion || null,
                dailyOperatingHours: fd.operatingHours || null,
                chargingFacilities: fd.berthCharging || null,
                projectLocation: fd.location || null,
                route: fd.route || null,
                requiredSpeed: fd.requiredSpeed || null,
                loadCapacity: fd.retrofitCapacity || null,
              };

              try {
                await submitMarineEnquiry(payload);
                setSent(true);
              } catch (error) {
                toast.error("Sorry, your request couldn't be sent. Please email info@yesentechnologies.com.");
              }
            }
            // Products
            else if (interest === "products") {
              payload = {
                ...payload,
                productName: product === "ELCO" && elcoModel ? `ELCO ${elcoModel}` : product || null,
                model: elcoModel || null,
                application: fd.application || null,
                quantity: fd.quantity || null,
                shaftAndThrottle: fd.shaftThrottle || null,
                country: fd.country || null,
                state: fd.state || null,
                pincode: fd.pincode || null,
                city: fd.city || null,
                address: fd.address || null,
              };

              try {
                await submitProductUpdatedEnquiry(payload);
                setSent(true);
              } catch (error) {
                toast.error("Sorry, your request couldn't be sent. Please email info@yesentechnologies.com.");
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && step < 2 && (e.target as HTMLElement).tagName !== "TEXTAREA") {
              e.preventDefault();
              if (canContinue) setStep((s) => s + 1);
            }
          }}
        >
          {onClose && (
            <button type="button" onClick={onClose} aria-label="Close quote form" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-brand-navy/12 text-brand-navy/60 transition-colors hover:border-brand-navy hover:text-brand-navy lg:hidden">
              <X size={16} />
            </button>
          )}

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-brand-navy/8 pb-6 pr-8 lg:pr-0">
            <div className="min-w-0">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-brand-leaf">Step {step + 1} of 3</p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-light tracking-[-0.02em] text-brand-navy">{stepTitles[step]}</h2>
            </div>
            <div className="hidden h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-brand-navy/8 sm:block xl:w-40">
              <span className="block h-full rounded-full bg-[linear-gradient(90deg,var(--brand-sky),var(--brand-leaf))] transition-all duration-500" style={{ width: `${((step + 1) / 3) * 100}%` }} />
            </div>
          </div>
          <div className="flex-1 pt-7">

          {/* step 1 — service */}
          <div className={step === 0 ? "animate-in fade-in slide-in-from-right-4 duration-500" : "hidden"}>

          <div className="grid gap-3 sm:grid-cols-2">
            {INTERESTS.map((i, idx) => {
              const active = interest === i.key;
              return (
                <button
                  key={i.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    if (interest !== i.key) {
                      setMode(null);
                      setNeed(null);
                      setProduct(null);
                      setElcoModel("");
                      setLandType("");
                       setSolarService("");
                       setTermsAccepted(false);
                    }
                    setInterest(i.key);
                    setStep(1);
                  }}
                  className={`group relative rounded-[1.1rem] border-[1.5px] p-6 pr-12 min-h-[9rem] text-left transition-all duration-300 hover:-translate-y-0.5 ${
                    active
                      ? "border-brand-navy bg-brand-navy text-brand-ivory shadow-[0_20px_45px_-30px_color-mix(in_oklab,var(--brand-navy)_80%,transparent)]"
                      : "border-brand-navy/12 bg-white/70 text-brand-navy hover:border-brand-sky"
                  }`}
                >
                  <span className={`block font-mono text-[0.58rem] tracking-[0.2em] ${active ? "text-brand-sky" : "text-brand-leaf"}`}>
                    0{idx + 1}
                  </span>
                  <span className="mt-2 block text-[1rem] font-medium">{i.label}</span>
                  <span className={`mt-1.5 block text-[0.74rem] leading-snug ${active ? "text-brand-ivory/70" : "text-brand-navy/50"}`}>
                    {i.hint}
                  </span>
                  <ArrowRight
                    size={16}
                    className={`absolute right-5 top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:translate-x-1 ${active ? "text-brand-sky" : "text-brand-navy/30"}`}
                  />
                </button>
              );
            })}
          </div>
          </div>

          {/* step 2 — project */}
          <div className={step === 1 ? "animate-in fade-in slide-in-from-right-4 duration-500 [&>div:first-child]:!mt-0" : "hidden"}>
          {interest === "marine" && (
            <div className="mt-7">
              <StepLabel title="Is this a new build or a retrofit?" />
              <div className="flex flex-wrap gap-2">
                {MARINE_MODES.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    aria-pressed={mode === m.key}
                    onClick={() => {
                      if (mode !== m.key) setNeed(null);
                      setMode(m.key);
                    }}
                    className={`rounded-full border-[1.5px] px-3.5 py-2 text-[0.8rem] transition-colors ${
                      mode === m.key
                        ? "border-brand-navy bg-brand-navy text-brand-ivory"
                        : "border-brand-navy/12 bg-white/70 text-brand-navy hover:border-brand-sky"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {interest === "marine" && mode && (
            <div className="mt-7" key={mode}>
              <StepLabel title="What do you need?" />
              <Chips options={mode === "Greenfield" ? GREENFIELD_NEEDS : RETROFIT_NEEDS} value={need} onChange={setNeed} />
              {need && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Vessel type">
                    <select className={inputCls} name="vesselType" defaultValue="">
                        <option value="">Select…</option>
                        {VESSEL_TYPES.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                  </Field>
                  {mode === "Retrofit" && (
                    <>
                      <Field label="Vessel length"><NumericInput className={inputCls} name="vesselLength" maxLength={120} placeholder="e.g. 18 m" allowDecimal /></Field>
                      <Field label="Approximate vessel weight"><NumericInput className={inputCls} name="vesselWeight" maxLength={120} placeholder="Weight in tonnes or kg" allowDecimal /></Field>
                      <Field label="Current engine type">
                        <select className={inputCls} name="engineType" defaultValue="">
                        <option value="">Select…</option>
                        {ENGINE_TYPES.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      </Field>
                      <Field label="Year built"><NumericInput className={inputCls} name="yearBuilt" maxLength={120} placeholder="e.g. 2012" /></Field>
                      <Field label="Current engine and propulsion"><input className={inputCls} name="currentPropulsion" maxLength={300} placeholder="Engine power, shaft, propeller or outboard" /></Field>
                      <Field label="Required speed"><NumericInput className={inputCls} name="requiredSpeed" maxLength={120} placeholder="Speed in knots" allowDecimal /></Field>
                      <Field label="Passenger or load capacity"><NumericInput className={inputCls} name="retrofitCapacity" maxLength={120} placeholder="Passengers or load in tonnes" allowDecimal /></Field>
                      <Field label="Charging facilities at the berth" full><input className={inputCls} name="berthCharging" maxLength={300} placeholder="Available electricity supply, or not sure" /></Field>
                      <Field label="Project location" full><input className={inputCls} name="location" maxLength={160} placeholder="Vessel location or berth" /></Field>
                    </>
                  )}
                  <Field label="Route"><input className={inputCls} type="text" name="route" maxLength={120} placeholder="e.g. Kochi backwaters" /></Field>
                  <Field label="Operating hours"><NumericInput className={inputCls} name="operatingHours" maxLength={120} placeholder="e.g. 8 hours per day" allowDecimal /></Field>
                  {mode === "Greenfield" && (
                    <Field label="Passenger or load capacity"><NumericInput className={inputCls} name="capacity" maxLength={120} placeholder="e.g. 100 passengers" allowDecimal /></Field>
                  )}
                </div>
              )}
            </div>
          )}

          {interest === "land" && (
            <div className="mt-7">

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Solar service">
                  <select className={inputCls} name="solarService" value={solarService} onChange={(e) => setSolarService(e.target.value)}>
                    <option value="">Select…</option>
                    {SOLAR_SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
                  </select>
                </Field>
                <Field label="System interest">
                  <select className={inputCls} name="landType" value={landType} onChange={(e) => setLandType(e.target.value)}>
                    <option value="">Select…</option>
                    {LAND_TYPES.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <LocationFields name="siteLocation" inputCls={inputCls} />
                <Field label="Load"><input className={inputCls} name="load" maxLength={120} placeholder="e.g. 250 kWh per day" /></Field>
                <Field label="Capacity (kWp)"><NumericInput className={inputCls} name="capacityKwp" maxLength={120} placeholder="e.g. 500" allowDecimal /></Field>
                <Field label="Average monthly electricity bill"><NumericInput className={inputCls} name="monthlyElectricityBill" maxLength={120} placeholder="Amount and currency" allowDecimal /></Field>
                <Field label="Roof or land area (optional)"><input className={inputCls} name="roofLandArea" maxLength={120} placeholder="Area in m² or acres" /></Field>
                <Field label="Grid availability" full>
                  <select className={inputCls} name="gridAvailability" defaultValue="">
                        <option value="">Select…</option>
                        {GRID_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                </Field>
              </div>
            </div>
          )}

          {interest === "advisory" && (
            <div className="mt-7">

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Project stage">
                  <select className={inputCls} name="projectStage" defaultValue="">
                        <option value="">Select…</option>
                        {PROJECT_STAGES.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                </Field>
                <Field label="Capacity (MWp)"><NumericInput className={inputCls} name="capacityMwp" maxLength={120} placeholder="e.g. 50" allowDecimal /></Field>
                <Field label="BESS included" full>
                  <select className={inputCls} name="bessIncluded" defaultValue="">
                        <option value="">Select…</option>
                        {["Yes", "No"].map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                </Field>
              </div>
            </div>
          )}

          {interest === "products" && (
            <div className="mt-7">
              <StepLabel title="Which product?" />
              <Chips
                options={PRODUCTS}
                value={product}
                onChange={(v) => {
                  setProduct(v);
                  if (v !== "ELCO") setElcoModel("");
                }}
              />
              {product === "ELCO" && (
                <div className="mt-6">
                  <StepLabel title="Which model?" />
                  <Chips options={ELCO_MODEL_NAMES} value={elcoModel || null} onChange={setElcoModel} />
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Application"><input className={inputCls} type="text" name="application" maxLength={120} placeholder="e.g. Ferry propulsion" /></Field>
                <Field label="Quantity"><NumericInput className={inputCls} name="quantity" maxLength={120} placeholder="e.g. 4 units" /></Field>
                {product === "ELCO" && <Field label="Shaft and throttle"><input className={inputCls} name="shaftThrottle" maxLength={160} placeholder="e.g. long shaft, remote throttle" /></Field>}
                <LocationFields name="deliveryLocation" inputCls={inputCls} />
              </div>
            </div>
          )}

          </div>

          {/* step 3 — contact */}
          <div className={step === 2 ? "animate-in fade-in slide-in-from-right-4 duration-500" : "hidden"}>

            <div className="mb-6 flex flex-wrap gap-2">
              {[serviceLabel, mode, choice].filter(Boolean).map((s) => (
                <span key={s as string} className="inline-flex items-center gap-1.5 rounded-full border border-brand-leaf/30 bg-brand-leaf/10 px-3 py-1.5 text-[0.75rem] text-brand-forest">
                  <Check size={12} /> {s}
                </span>
              ))}
              <button type="button" onClick={() => setStep(0)} className="px-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-navy/50 underline-offset-4 hover:text-brand-forest hover:underline">
                Change
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input className={inputCls} name="name" maxLength={100} placeholder="Your name" />
              </Field>
              <Field label="Email">
                <input className={inputCls} type="email" name="email" maxLength={255} placeholder="you@company.com" />
              </Field>
              <Field label="Phone">
                <NumericInput className={inputCls} name="phone" maxLength={30} placeholder="Your phone number" />
              </Field>
              {interest === "marine" && mode === "Retrofit" && <Field label="Company"><input className={inputCls} name="company" maxLength={160} placeholder="Company name" /></Field>}
              <Field label="Budget">
                <div className="flex gap-2">
                  <select className={`${inputCls} !w-[6.5rem] shrink-0`} name="currency" defaultValue="INR" aria-label="Currency">
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <NumericInput className={`${inputCls} min-w-0 flex-1`} name="budget" maxLength={40} placeholder="Amount" allowDecimal />
                </div>
              </Field>
              <Field label="Message" full>
                <textarea className={`${inputCls} min-h-[5.5rem] resize-y`} name="message" maxLength={1000} placeholder="Tell us about your project" defaultValue={initial.message} />
              </Field>
            </div>
            {interest === "land" && <div className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-brand-navy">
              <Checkbox id="solar-terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked === true)} aria-label="Consent to terms" />
              <input type="hidden" name="consent" value={termsAccepted ? "accepted" : ""} />
              <label htmlFor="solar-terms">I agree to the <Link to="/legal" target="_blank" className="underline underline-offset-4">terms and conditions</Link>.</label>
            </div>}
          </div>

          </div>
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-brand-navy/8 pt-6">
            {step > 0 ? (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex h-12 items-center gap-2 rounded-full border border-brand-navy/15 px-6 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-brand-navy transition-colors hover:border-brand-leaf hover:text-brand-forest">
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-navy/40">Takes about 2 minutes</span>
            )}
            {step < 2 ? (
              <button key="continue" type="button" disabled={!canContinue} onClick={() => setStep((s) => s + 1)} className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-navy px-8 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-brand-ivory transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30">
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <button key="submit" type="submit" className="inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(100deg,var(--brand-navy),color-mix(in_oklab,var(--brand-navy)_70%,var(--brand-sky)))] px-8 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-brand-ivory transition-transform hover:-translate-y-px">
                Request quote <ArrowRight size={15} />
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
