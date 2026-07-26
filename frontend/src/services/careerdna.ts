import { apiClient } from './http';
import type { CareerDNAResponse } from '../types';

export async function startCareerDNA(): Promise<CareerDNAResponse> {
  const response = await apiClient.post<CareerDNAResponse>('/career-dna/start');
  return response.data;
}

export async function fetchCareerDNAProgress(): Promise<CareerDNAResponse> {
  const response = await apiClient.get<CareerDNAResponse>('/career-dna/progress');
  return response.data;
}

export async function saveCareerDNAStep(step: number, data: any): Promise<{status: string, last_completed_step: number}> {
  const response = await apiClient.put(`/career-dna/step/${step}`, { step, data });
  return response.data;
}

export async function completeCareerDNA(): Promise<{status: string}> {
  const response = await apiClient.post('/career-dna/complete');
  return response.data;
}
