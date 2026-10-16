import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

type Country = { isoCode: string; name: string };
type State = { isoCode: string; name: string };
type Lib = typeof import("country-state-city");

const labelCls = "mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-navy/50";

function handleNumericKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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

  // Block everything else (letters, symbols, etc.)
  e.preventDefault();
}

/** Country → State → Postal code (auto-fills state & city) → Address. Emits one combined hidden field. */
export function LocationFields({ name, inputCls }: { name: string; inputCls: string }) {
  const [lib, setLib] = useState<Lib | null>(null);
  const [country, setCountry] = useState("IN");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [lookup, setLookup] = useState<"idle" | "loading" | "found" | "none">("idle");

  useEffect(() => {
    import("country-state-city").then(setLib);
  }, []);

  const countries: Country[] = useMemo(() => (lib ? lib.Country.getAllCountries() : []), [lib]);
  const states: State[] = useMemo(() => (lib && country ? lib.State.getStatesOfCountry(country) : []), [lib, country]);

  // Postal code lookup (debounced)
  useEffect(() => {
    const code = postal.trim();
    if (!country || code.length < 3) {
      setLookup("idle");
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLookup("loading");
      try {
        const r = await fetch(`https://api.zippopotam.us/${country.toLowerCase()}/${encodeURIComponent(code)}`, { signal: ctrl.signal });
        if (!r.ok) return setLookup("none");
        const j = await r.json();
        const p = j?.places?.[0];
        if (!p) return setLookup("none");
        const stName: string = p.state || "";
        const match = states.find(
          (s) => s.name.toLowerCase() === stName.toLowerCase() || s.isoCode === p["state abbreviation"],
        );
        if (match) setState(match.isoCode);
        setCity(p["place name"] || "");
        setLookup("found");
      } catch {
        if (!ctrl.signal.aborted) setLookup("none");
      }
    }, 500);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [postal, country, states]);

  const countryName = countries.find((c) => c.isoCode === country)?.name ?? "";
  const stateName = states.find((s) => s.isoCode === state)?.name ?? "";
  const combined = [address, city, stateName, postal, countryName].map((s) => s.trim()).filter(Boolean).join(", ");

  return (
    <>
      <input type="hidden" name={name} value={combined.slice(0, 300)} />
      <label className="block">
        <span className={labelCls}>Country</span>
        <select
          className={inputCls}
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setState("");
            setCity("");
          }}
        >
          {!lib && <option value="IN">India</option>}
          {countries.map((c) => (
            <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className={labelCls}>State / region</span>
        <select className={inputCls} value={state} onChange={(e) => setState(e.target.value)} disabled={!states.length}>
          <option value="">{states.length ? "Select state…" : "Not applicable"}</option>
          {states.map((s) => (
            <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className={labelCls}>Postal / PIN code</span>
        <div className="relative">
          <input
            className={inputCls}
            type="text"
            inputMode="numeric"
            maxLength={12}
            value={postal}
            onChange={(e) => setPostal(e.target.value.replace(/[^0-9]/g, ''))}
            onKeyDown={handleNumericKeyDown}
            placeholder="e.g. 682030"
          />
          {lookup === "loading" && <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-brand-navy/40" />}
        </div>
        {lookup === "found" && <span className="mt-1 block text-[0.72rem] text-brand-leaf">Area found — state and city filled in.</span>}
        {lookup === "none" && <span className="mt-1 block text-[0.72rem] text-brand-navy/45">Couldn't find this code — please fill in manually.</span>}
      </label>
      <label className="block">
        <span className={labelCls}>City / area</span>
        <input className={inputCls} type="text" maxLength={80} value={city} onChange={(e) => setCity(e.target.value)} placeholder="City or area" />
      </label>
      <label className="block sm:col-span-2">
        <span className={labelCls}>Address</span>
        <input className={inputCls} type="text" maxLength={160} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, building, landmark" />
      </label>
    </>
  );
}
