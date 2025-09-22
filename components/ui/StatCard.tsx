
import React from 'react';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ElementType;
    color: string;
    unit?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, unit }) => {
    // Note: TailwindCSS JIT compiler needs full class names.
    // Dynamic classes like `bg-${color}-500/20` won't work if not predefined.
    // For this environment, we can define the color classes we'll use.
    const colorClasses: { [key: string]: { bg: string, text: string } } = {
        blue: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
        violet: { bg: 'bg-violet-500/20', text: 'text-violet-400' },
        green: { bg: 'bg-green-500/20', text: 'text-green-400' },
        amber: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
    };

    const currentColors = colorClasses[color] || colorClasses.violet;

    return (
        <div className={`bg-slate-900/70 border border-slate-700 rounded-xl p-6 flex items-center justify-between shadow-lg`}>
            <div>
                <p className="text-sm font-medium text-slate-400">{title}</p>
                <p className="text-3xl font-bold text-white">
                    {value}
                    {unit && <span className="text-xl ml-1">{unit}</span>}
                </p>
            </div>
            <div className={`p-3 rounded-full ${currentColors.bg}`}>
                <Icon className={`h-6 w-6 ${currentColors.text}`} />
            </div>
        </div>
    );
};

export default StatCard;
