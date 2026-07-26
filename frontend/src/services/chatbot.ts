import { apiClient } from './http';
import type { ChatSessionBase, ChatSessionDetail, ChatMessageBase } from '../types';

export async function createChatSession(title: string, mode: string = 'general', language: string = 'English'): Promise<ChatSessionBase> {
  const response = await apiClient.post<ChatSessionBase>('/chatbot/sessions', { title, mode, language });
  return response.data;
}

export async function fetchChatSessions(): Promise<ChatSessionBase[]> {
  const response = await apiClient.get<ChatSessionBase[]>('/chatbot/sessions');
  return response.data;
}

export async function fetchChatSessionDetail(sessionId: number): Promise<ChatSessionDetail> {
  const response = await apiClient.get<ChatSessionDetail>(`/chatbot/sessions/${sessionId}`);
  return response.data;
}

export async function sendChatMessage(sessionId: number, content: string): Promise<ChatMessageBase> {
  const response = await apiClient.post<ChatMessageBase>(`/chatbot/sessions/${sessionId}/message`, { content });
  return response.data;
}
