import { apiClient } from './http';
import type { RecommendationResponse } from '../types';

export async function generateRecommendations(): Promise<RecommendationResponse[]> {
  const response = await apiClient.post<RecommendationResponse[]>('/recommendations/generate');
  return response.data;
}

export async function fetchRecommendations(): Promise<RecommendationResponse[]> {
  const response = await apiClient.get<RecommendationResponse[]>('/recommendations');
  return response.data;
}
