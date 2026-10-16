import lightSurfaceLogo from "@/assets/yesen-logo-light.png.asset.json";
import darkSurfaceLogo from "@/assets/yesen-logo-dark.png.asset.json";

type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
  /** kept for API compatibility with previous wordmark component */
  showTagline?: boolean;
};

/** Official supplied artwork, with the matching tagline for each surface. */
export function Logo({ className = "", variant = "dark" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 3000 778"
      role="img"
      aria-label="YESEN Technologies — Technology by nature"
      className={className}
    >
      <image
        href={variant === "light" ? darkSurfaceLogo.url : lightSurfaceLogo.url}
        width="3000"
        height="778"
      />
    </svg>
  );
}

export default Logo;
