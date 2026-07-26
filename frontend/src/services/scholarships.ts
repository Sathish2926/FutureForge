import { apiClient } from './http';
import type {
  ScholarshipProfile,
  ScholarshipProfileCreate,
  ScholarshipProfileUpdate,
  ScholarshipRecommendation,
  ScholarshipDetail,
  ScholarshipBookmark,
  ScholarshipDashboard,
} from '../types';

function authHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

// ── Profile ──────────────────────────────────────────────────────

export async function createScholarshipProfile(
  token: string,
  data: ScholarshipProfileCreate,
): Promise<ScholarshipProfile> {
  const response = await apiClient.post<ScholarshipProfile>('/scholarships/profile', data, authHeaders(token));
  return response.data;
}

export async function updateScholarshipProfile(
  token: string,
  data: ScholarshipProfileUpdate,
): Promise<ScholarshipProfile> {
  const response = await apiClient.put<ScholarshipProfile>('/scholarships/profile', data, authHeaders(token));
  return response.data;
}

export async function fetchScholarshipProfile(token: string): Promise<ScholarshipProfile> {
  const response = await apiClient.get<ScholarshipProfile>('/scholarships/profile', authHeaders(token));
  return response.data;
}

// ── Recommendations ──────────────────────────────────────────────

export async function fetchScholarshipRecommendations(token: string): Promise<ScholarshipRecommendation[]> {
  const response = await apiClient.get<ScholarshipRecommendation[]>('/scholarships/recommendations', authHeaders(token));
  return response.data;
}

// ── Detail ───────────────────────────────────────────────────────

export async function fetchScholarshipDetail(token: string, id: number): Promise<ScholarshipDetail> {
  const response = await apiClient.get<ScholarshipDetail>(`/scholarships/${id}`, authHeaders(token));
  return response.data;
}

// ── Bookmarks ────────────────────────────────────────────────────

export async function toggleScholarshipBookmark(
  token: string,
  scholarshipId: number,
  status: string = 'saved',
): Promise<ScholarshipBookmark | { detail: string }> {
  const response = await apiClient.post(`/scholarships/${scholarshipId}/bookmark`, { status }, authHeaders(token));
  return response.data;
}

export async function fetchScholarshipBookmarks(token: string): Promise<ScholarshipBookmark[]> {
  const response = await apiClient.get<ScholarshipBookmark[]>('/scholarships/bookmarks', authHeaders(token));
  return response.data;
}

// ── Dashboard ────────────────────────────────────────────────────

export async function fetchScholarshipDashboard(token: string): Promise<ScholarshipDashboard> {
  const response = await apiClient.get<ScholarshipDashboard>('/scholarships/dashboard/summary', authHeaders(token));
  return response.data;
}