import { apiClient } from './http';
import type { RoadmapBase } from '../types';

export async function generateRoadmap(config: { targetCareer?: string, timeline?: string, skillLevel?: string, priority?: string } = {}): Promise<RoadmapBase> {
  const params = new URLSearchParams();
  if (config.targetCareer) params.append('target_career', config.targetCareer);
  if (config.timeline) params.append('timeline', config.timeline);
  if (config.skillLevel) params.append('skill_level', config.skillLevel);
  if (config.priority) params.append('priority', config.priority);
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const response = await apiClient.post<RoadmapBase>(`/roadmap/generate${queryString}`);
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
