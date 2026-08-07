import { apiClient } from './http';
import type { CareerDNAResponse } from '../types';

export async function startAdaptiveSession(): Promise<any> {
  const response = await apiClient.post('/career-dna/session/start');
  return response.data;
}

export async function getNextAdaptiveQuestions(sessionId: number): Promise<any> {
  const response = await apiClient.get(`/career-dna/session/next?session_id=${sessionId}`);
  return response.data;
}

export async function submitAdaptiveAnswer(sessionId: number, questionId: number, optionId: number, timeTakenMs: number): Promise<any> {
  const response = await apiClient.post(`/career-dna/session/submit`, null, {
    params: {
      session_id: sessionId,
      question_id: questionId,
      option_id: optionId,
      time_taken_ms: timeTakenMs
    }
  });
  return response.data;
}

export async function completeAdaptiveSession(sessionId: number): Promise<any> {
  const response = await apiClient.post(`/career-dna/session/complete`, null, {
    params: { session_id: sessionId }
  });
  return response.data;
}

export async function fetchCareerDNAProgress(): Promise<CareerDNAResponse> {
  const response = await apiClient.get<CareerDNAResponse>('/career-dna/results');
  return response.data;
}

export async function fetchSessionStatus(): Promise<{status: string}> {
  const response = await apiClient.get('/career-dna/session/status');
  return response.data;
}
