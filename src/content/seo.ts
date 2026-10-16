export const SITE_URL = "https://yesen.website";
export const SHARE_IMAGE = `${SITE_URL}/assets/og-yesen.jpg`;
export function pageHead(path: string, rawTitle: string, rawDescription: string, shareImage: string = SHARE_IMAGE) {
  // Avoid ampersands in share tags; some crawlers double-escape them.
  const title = rawTitle.replace(/\s&\s/g, " and ");
  const description = rawDescription.replace(/\s&\s/g, " and ");
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: SITE_URL + path },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
      { property: "og:image", content: shareImage }, { name: "twitter:image", content: shareImage },
    ],
    links: [{ rel: "canonical", href: SITE_URL + path }],
  };
}
