import { apiClient } from './http';

export interface ScenarioParam {
  label: string;
  changes: Record<string, any>;
}

export interface SimulationRequest {
  scenario_a: ScenarioParam;
  scenario_b: ScenarioParam;
}

export interface ScenarioMetric {
  category: string;
  value: string;
}

export interface ScenarioResult {
  label: string;
  metrics: ScenarioMetric[];
  recommended_colleges?: string[];
  scholarship_options?: string[];
  career_paths?: string[];
}

export interface SimulationResponse {
  scenario_a_result: ScenarioResult;
  scenario_b_result: ScenarioResult;
  ai_conclusion: string;
}

export async function runCareerSimulation(request: SimulationRequest): Promise<SimulationResponse> {
  const response = await apiClient.post<SimulationResponse>('/recommendations/simulate', request);
  return response.data;
}
