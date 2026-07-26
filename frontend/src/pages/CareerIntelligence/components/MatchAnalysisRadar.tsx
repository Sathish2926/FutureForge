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
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#4f46e5' }}
          />
          <Radar
            name="Match %"
            dataKey="A"
            stroke="#4f46e5"
            strokeWidth={2}
            fill="#4f46e5"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
