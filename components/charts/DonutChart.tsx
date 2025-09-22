
import React from 'react';
import { ApplicationStatus } from '../../types';

interface DonutChartProps {
  data: {
    labels: ApplicationStatus[];
    values: number[];
  };
}

const statusColors: { [key in ApplicationStatus]: string } = {
  [ApplicationStatus.Applied]: '#3b82f6', // blue-500
  [ApplicationStatus.Interviewing]: '#8b5cf6', // violet-500
  [ApplicationStatus.Offer]: '#22c55e', // green-500
  [ApplicationStatus.Rejected]: '#ef4444', // red-500
};

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const total = data.values.reduce((a, b) => a + b, 0);
  if (total === 0) return <div className="text-center text-slate-400">No data to display</div>;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let accumulatedAngle = 0;

  const segments = data.values.map((value, index) => {
    const percentage = value / total;
    const strokeDasharray = `${percentage * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedAngle * circumference;
    accumulatedAngle += percentage;
    const color = statusColors[data.labels[index]];

    return (
      <circle
        key={index}
        cx="100"
        cy="100"
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth="20"
        strokeDasharray={strokeDasharray}
        transform={`rotate(-90 100 100)`}
        style={{ strokeDashoffset }}
      />
    );
  });

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {segments}
        </svg>
         <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{total}</span>
            <span className="text-sm text-slate-400">Total</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data.labels.map((label, index) => (
          <div key={label} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: statusColors[label] }}
            ></span>
            <span className="text-slate-300">{label}:</span>
            <span className="font-semibold text-white">{data.values[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
