import { apiClient } from './http';
import type { UserProfile } from '../types';

export async function fetchUserProfile(): Promise<UserProfile> {
  const response = await apiClient.get<UserProfile>('/profile');
  return response.data;
}

export async function updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  const response = await apiClient.put<UserProfile>('/profile', data);
  return response.data;
}
