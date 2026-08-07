import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { MatchAnalysisResponse } from '../../../types';

interface Props {
  data: MatchAnalysisResponse;
}

export default function MatchAnalysisRadar({ data }: Props) {
  const chartData = [
    { subject: 'Skills', A: data.skill_match, fullMark: 100 },
    { subject: 'Interests', A: data.interest_match, fullMark: 100 },
    { subject: 'Personality', A: data.personality_match, fullMark: 100 },
    { subject: 'Goals', A: data.goal_match, fullMark: 100 },
    { subject: 'Budget', A: data.budget_match, fullMark: 100 },
    { subject: 'Location', A: data.location_match, fullMark: 100 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="rgba(45,48,90,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(45,48,90,0.1)', borderRadius: '12px', color: '#0f172a' }}
            itemStyle={{ color: '#2D305A', fontWeight: 'bold' }}
          />
          <Radar
            name="Match %"
            dataKey="A"
            stroke="#2D305A"
            strokeWidth={2}
            fill="#2D305A"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
