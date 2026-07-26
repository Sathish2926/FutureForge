import { apiClient } from './http';
import type { RoadmapBase } from '../types';

export async function generateRoadmap(careerId: number): Promise<RoadmapBase> {
  const response = await apiClient.post<RoadmapBase>(`/roadmap/generate/${careerId}`);
  return response.data;
}

export async function fetchRoadmap(roadmapId: number): Promise<RoadmapBase> {
  const response = await apiClient.get<RoadmapBase>(`/roadmap/${roadmapId}`);
  return response.data;
}

export async function fetchUserRoadmaps(): Promise<RoadmapBase[]> {
  const response = await apiClient.get<RoadmapBase[]>(`/roadmap`);
  return response.data;
}

export async function completeMilestone(milestoneId: number, status: string = 'completed'): Promise<{status: string, milestone_status: string}> {
  const response = await apiClient.put(`/roadmap/milestones/${milestoneId}/progress?status=${status}`);
  return response.data;
}
