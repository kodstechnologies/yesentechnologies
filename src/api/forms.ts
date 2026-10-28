/**
 * Forms API Service
 * Handles all form submissions (product, service, and contact enquiries)
 */

import { API_BASE_URL, API_ENDPOINTS, FORMS_API_KEY } from "./config";
import type { BaseEnquiryPayload, ProductEnquiryPayload, ServiceEnquiryPayload, ProductServiceEnquiryPayload, ApiResponse, ApiError } from "./types";

/**
 * Base fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  payload: Record<string, any>
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forms-key": FORMS_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const error: ApiError = {
      message: errData.message || `Server responded with ${response.status}`,
      status: response.status,
    };
    throw error;
  }

  return response.json();
}

/**
 * Submit product enquiry
 */
export async function submitProductEnquiry(
  payload: ProductEnquiryPayload
): Promise<ApiResponse> {
  return apiFetch<ApiResponse>(API_ENDPOINTS.FORMS.PRODUCT, payload);
}

/**
 * Submit service/solution enquiry
 */
export async function submitServiceEnquiry(
  payload: ServiceEnquiryPayload
): Promise<ApiResponse> {
  return apiFetch<ApiResponse>(API_ENDPOINTS.FORMS.SERVICE, payload);
}

/**
 * Submit general contact enquiry
 */
export async function submitContactEnquiry(
  payload: BaseEnquiryPayload
): Promise<ApiResponse> {
  return apiFetch<ApiResponse>(API_ENDPOINTS.FORMS.CONTACT, payload);
}

/**
 * Submit land and earth enquiry
 */
export async function submitLandAndEarthEnquiry(
  payload: Record<string, any>
): Promise<ApiResponse> {
  return apiFetch<ApiResponse>(API_ENDPOINTS.FORMS.LAND_AND_EARTH, payload);
}

/**
 * Submit engineering advisory enquiry
 */
export async function submitEngineeringAdvisoryEnquiry(
  payload: Record<string, any>
): Promise<ApiResponse> {
  return apiFetch<ApiResponse>(API_ENDPOINTS.FORMS.ENGINEERING_ADVISORY, payload);
}

/**
 * Submit marine enquiry
 */
export async function submitMarineEnquiry(
  payload: Record<string, any>
): Promise<ApiResponse> {
  return apiFetch<ApiResponse>(API_ENDPOINTS.FORMS.MARINE, payload);
}

/**
 * Submit updated product enquiry with additional fields
 */
export async function submitProductUpdatedEnquiry(
  payload: Record<string, any>
): Promise<ApiResponse> {
  return apiFetch<ApiResponse>(API_ENDPOINTS.FORMS.PRODUCT_UPDATED, payload);
}
