// src/services/api.ts
// All backend API calls in one place

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ── Types ──
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

// ── Contact form submission ──
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json: ApiResponse = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Something went wrong');
  }

  return json;
}

// ── CV download URLs (just open these in a new tab or use as href) ──
export const CV_PDF_URL  = `${API_BASE}/api/cv/pdf`;
export const CV_DOCX_URL = `${API_BASE}/api/cv/docx`;