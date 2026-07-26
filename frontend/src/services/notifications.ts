import { apiClient } from './http';
import type { NotificationBase } from '../types';

export async function fetchNotifications(): Promise<NotificationBase[]> {
  const response = await apiClient.get<NotificationBase[]>('/notifications');
  return response.data;
}

export async function markNotificationRead(id: number): Promise<void> {
  await apiClient.put(`/notifications/${id}/read`);
}

export async function markAllNotificationsRead(): Promise<void> {
  await apiClient.put(`/notifications/read-all`);
}
