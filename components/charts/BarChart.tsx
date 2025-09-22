
import React from 'react';

interface BarChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  if (!data || data.values.length === 0) {
    return <div className="text-center text-slate-400 h-64 flex items-center justify-center">No data to display</div>;
  }

  const maxValue = Math.max(...data.values, 1);
  const chartHeight = 250;
  const barWidth = 40;
  const barMargin = 20;
  const svgWidth = data.labels.length * (barWidth + barMargin);

  return (
    <div className="w-full overflow-x-auto">
      <svg width={svgWidth} height={chartHeight} className="text-slate-400">
        <g>
          {data.values.map((value, index) => {
            const barHeight = (value / maxValue) * (chartHeight - 30); // Leave space for labels
            const x = index * (barWidth + barMargin);
            const y = chartHeight - barHeight - 20;

            return (
              <g key={index} className="group">
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="url(#barGradient)"
                  className="transition-all duration-300 group-hover:opacity-100 opacity-80"
                  rx="4"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  className="text-sm font-bold fill-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {value}
                </text>
                 <text
                    x={x + barWidth / 2}
                    y={chartHeight - 5}
                    textAnchor="middle"
                    className="text-xs fill-slate-400"
                    >
                    {data.labels[index]}
                </text>
              </g>
            );
          })}
        </g>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BarChart;
