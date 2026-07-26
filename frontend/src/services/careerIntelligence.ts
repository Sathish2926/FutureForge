import { apiClient } from './http';
import type { CareerIntelligenceResponse, MatchAnalysisResponse, CareerSkillGap } from '../types';

export async function fetchCareerIntelligence(careerId: number): Promise<CareerIntelligenceResponse> {
  const response = await apiClient.get<CareerIntelligenceResponse>(`/career-intelligence/careers/${careerId}`);
  return response.data;
}

export async function fetchMatchAnalysis(careerId: number): Promise<MatchAnalysisResponse> {
  const response = await apiClient.get<MatchAnalysisResponse>(`/career-intelligence/careers/${careerId}/match-analysis`);
  return response.data;
}

export async function fetchSkillGap(careerId: number): Promise<CareerSkillGap[]> {
  const response = await apiClient.get<CareerSkillGap[]>(`/career-intelligence/careers/${careerId}/skill-gap`);
  return response.data;
}

export async function toggleCareerBookmark(careerId: number): Promise<{status: string}> {
  const response = await apiClient.post<{status: string}>(`/career-intelligence/bookmarks/${careerId}`);
  return response.data;
}
