import { useEffect } from "react";

/** Decode background films only while their section is on screen. */
export function useVideoVisibility(pathname: string) {
  useEffect(() => {
    const videos = new Set<HTMLVideoElement>();
    const visible = new Set<HTMLVideoElement>();
    const sync = (video: HTMLVideoElement) => {
      if (document.hidden || !visible.has(video) || video.dataset.manualPaused === "true") {
        video.pause();
        return;
      }
      const source = video.querySelector<HTMLSourceElement>("source[data-src]");
      if (video.dataset.src) {
        video.src = video.dataset.src;
        delete video.dataset.src;
      }
      if (source?.dataset.src) {
        source.src = source.dataset.src;
        delete source.dataset.src;
        video.load();
      }
      video.muted = true;
      void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) visible.add(video);
        else visible.delete(video);
        sync(video);
      }
    }, { threshold: 0.01 });
    const discover = () => {
      document.querySelectorAll<HTMLVideoElement>("video[autoplay]:not([aria-label]), video[data-background-video]").forEach((video) => {
        if (videos.has(video)) return;
        videos.add(video);
        observer.observe(video);
      });
    };
    const mutations = new MutationObserver(discover);
    mutations.observe(document.body, { childList: true, subtree: true });
    discover();
    const onVisibility = () => videos.forEach(sync);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mutations.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      videos.forEach((video) => video.pause());
    };
  }, [pathname]);
}