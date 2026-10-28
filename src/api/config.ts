/**
 * API Configuration
 */

// Force production API URL - never use old IP address
const PRODUCTION_API_URL = "https://api.yesentechnologies.com/api/v1";
// const PRODUCTION_API_URL = "http://localhost:5002/api/v1";
export const API_BASE_URL = PRODUCTION_API_URL
export const FORMS_API_KEY = import.meta.env.VITE_FORMS_API_KEY || "change_this_forms_key_min_8_chars";

// Log to verify the URL being used (remove in production)
console.log("API_BASE_URL:", API_BASE_URL);

export const API_ENDPOINTS = {
  FORMS: {
    PRODUCT: "/forms/product",
    SERVICE: "/forms/service",
    CONTACT: "/forms/contact",
    LAND_AND_EARTH: "/forms/landAndEarth",
    ENGINEERING_ADVISORY: "/forms/engineering-advisory",
    MARINE: "/forms/marine",
    PRODUCT_UPDATED: "/forms/product-updated",
  },
  PRODUCTS: {
    LIST: "/products-csm",
    BY_ID: (id: string) => `/products-csm/${id}`,
  },
  PROJECTS: {
    LIST: "/projects",
    BY_ID: (id: string) => `/projects/${id}`,
  },
  SOLUTIONS: {
    LIST: "/solutions-csm",
    BY_ID: (id: string) => `/solutions-csm/${id}`,
  },
  TESTIMONIALS: {
    LIST: "/testimonials",
    CREATE: "/testimonials",
    BY_ID: (id: string) => `/testimonials/${id}`,
  },
} as const;
