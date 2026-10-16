/**
 * API Configuration
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "/api" : "http://3.6.27.112/api/v1");
export const FORMS_API_KEY = import.meta.env.VITE_FORMS_API_KEY || "change_this_forms_key_min_8_chars";

export const API_ENDPOINTS = {
  FORMS: {
    PRODUCT: "/forms/product",
    SERVICE: "/forms/service",
    CONTACT: "/forms/contact",
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
