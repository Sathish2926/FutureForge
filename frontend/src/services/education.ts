import { apiClient } from './http';
import type { EntranceExamDetail, CertificationBase } from '../types';

export async function fetchExamsForCareer(careerId: number): Promise<EntranceExamDetail[]> {
  const response = await apiClient.get<EntranceExamDetail[]>(`/education/exams/career/${careerId}`);
  return response.data;
}

export async function fetchCertificationsForCareer(careerId: number): Promise<CertificationBase[]> {
  const response = await apiClient.get<CertificationBase[]>(`/education/certifications/career/${careerId}`);
  return response.data;
}
