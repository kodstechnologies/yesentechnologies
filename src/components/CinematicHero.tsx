import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import hero from "@/assets/yesen-hero-v16-light.mp4.asset.json";
import heroHD from "@/assets/homepage-hd.mp4.asset.json";

// Documentary-style illustrative footage, H.264 yuv420p for mobile playback.
const POSTER = "/videos/hero-documentary-poster.jpg";

type NetInfo = { saveData?: boolean; effectiveType?: string; downlink?: number };

// One caption per video scene, keyed to the cut points in the footage.
const SCENES = [
  { from: 0, to: 6.6, eyebrow: "YESEN Technologies", title: "Powering a cleaner planet", text: "Renewable energy and electrification, engineered for land and water." },
  { from: 6.6, to: 11.8, eyebrow: "Land & Earth", title: "Utility-scale solar, engineered for decades", text: "Grid-tie solar and battery storage, from design to commissioning." },
  { from: 11.8, to: 17, eyebrow: "Land & Earth", title: "Every panel, built to perform", text: "Off-grid, hybrid and microgrid systems for homes, businesses and institutions." },
  { from: 17, to: 22.2, eyebrow: "Land & Earth", title: "Solar and storage, around the clock", text: "Battery energy storage that keeps clean power flowing after sunset." },
  { from: 22.2, to: 27.4, eyebrow: "Marine", title: "Solar-electric boats for inland waterways", text: "Quiet, emission-free cruising on rivers, backwaters and lakes." },
  { from: 27.4, to: 32.6, eyebrow: "Marine", title: "Electric propulsion, new build or retrofit", text: "Propulsion kits and B-Kool marine batteries engineered for every hull." },
  { from: 32.6, to: 40, eyebrow: "Marine", title: "Cleaner waterways, one vessel at a time", text: "From houseboats to passenger ferries, electrified end to end." },
] as const;

export function CinematicHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [scene, setScene] = useState(0);
  const caption = SCENES[scene] ?? SCENES[0];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce) and (scripting: none)").matches;
    const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
    const slow = !!conn && (conn.saveData === true || /(^|-)2g|3g/.test(conn.effectiveType ?? ""));
    if (reduced || slow) return;
    const constrained = typeof conn?.downlink === "number" && conn.downlink < 5;
    setSrc(window.matchMedia("(min-width: 768px)").matches && !constrained ? "https://yesen-bucket.s3.ap-south-1.amazonaws.com/boat/YESEN_Homepage_Website_Layout_Compressed_v3.mp4" : "https://yesen-bucket.s3.ap-south-1.amazonaws.com/boat/YESEN_Homepage_Website_Layout_Compressed_v3.mp4");
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!src || !v) return;
    v.muted = true;
    void v.play().catch(() => setPlaying(false));
    const onTime = () => {
      const t = v.currentTime;
      const i = SCENES.findIndex((s) => t >= s.from && t < s.to);
      if (i >= 0) setScene(i);
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [src]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      delete v.dataset.manualPaused;
      void v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      v.dataset.manualPaused = "true";
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="homepage-film relative isolate aspect-video min-h-[360px] max-h-[100svh] w-full overflow-hidden bg-brand-navy sm:min-h-0">
      <img src={POSTER} alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />

      {src && (
        <video
          ref={videoRef}
          key={src}
          className={`absolute inset-0 -z-10 h-full w-full object-cover ${ready ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          aria-label="Earth from orbit, solar farms and electric boats"
          data-background-video
          onPlaying={() => { setReady(true); setPlaying(true); }}
          onPause={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-navy/65 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/15 to-transparent" aria-hidden="true" />
      <h1 className="sr-only">YESEN Technologies — Land energy, marine electrification and engineering advisory</h1>
      <div className="hero-scene-caption absolute bottom-8 left-5 right-5 z-10 max-w-2xl sm:bottom-12 sm:left-10 md:bottom-16 md:left-14" aria-live="polite" aria-atomic="true">
        <p className="mb-2 text-[10px]! font-medium uppercase tracking-[0.25em] sm:text-xs!">{caption.eyebrow}</p>
        <p className="text-xl! font-medium leading-tight sm:text-4xl! md:text-5xl!">{caption.title}</p>
        <p className="mt-2 text-xs! sm:text-base!">{caption.text}</p>
      </div>

      {src && (
        <Button variant="ghost" type="button" onClick={toggle} aria-label={playing ? "Pause video" : "Play video"} className="absolute inset-0 z-20 h-full w-full cursor-pointer rounded-none bg-transparent p-0 hover:bg-transparent focus-visible:ring-inset" />
      )}
    </section>
  );
}
