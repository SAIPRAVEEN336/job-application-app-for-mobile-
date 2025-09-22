
import React, { useMemo } from 'react';
import { useApplications } from '../../contexts/ApplicationContext';
import { useInterviews } from '../../contexts/InterviewContext';
import { ApplicationStatus } from '../../types';
import { BarChart3, Target, CheckCircle, Clock } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import StatCard from '../ui/StatCard';
import DonutChart from '../charts/DonutChart';
import BarChart from '../charts/BarChart';

const AnalyticsPage: React.FC = () => {
    const { applications } = useApplications();
    const { interviews } = useInterviews();

    const analyticsData = useMemo(() => {
        if (applications.length === 0) {
            return null;
        }

        // Status Distribution
        const statusCounts = applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {} as { [key in ApplicationStatus]: number });

        const statusChartData = {
            labels: Object.keys(statusCounts) as ApplicationStatus[],
            values: Object.values(statusCounts),
        };

        // Application Timeline (by month)
        const timelineCounts = applications.reduce((acc, app) => {
            const month = new Date(app.dateApplied).toLocaleString('default', { month: 'short', year: '2-digit' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });
        
        const sortedTimelineMonths = Object.keys(timelineCounts).sort((a,b) => {
            const dateA = new Date(`01 ${a}`);
            const dateB = new Date(`01 ${b}`);
            return dateA.getTime() - dateB.getTime();
        })

        const timelineChartData = {
            labels: sortedTimelineMonths,
            values: sortedTimelineMonths.map(month => timelineCounts[month]),
        };


        // KPIs
        const interviewedAppIds = new Set(interviews.map(i => i.applicationId));
        const interviewRate = (interviewedAppIds.size / applications.length) * 100;
        
        const offeredApps = applications.filter(app => app.status === ApplicationStatus.Offer);
        const offeredAndInterviewedCount = offeredApps.filter(app => interviewedAppIds.has(app.id)).length;
        const offerRate = interviewedAppIds.size > 0 ? (offeredAndInterviewedCount / interviewedAppIds.size) * 100 : 0;

        const timeToInterviewDiffs = Array.from(interviewedAppIds).map(appId => {
            const app = applications.find(a => a.id === appId);
            const appInterviews = interviews.filter(i => i.applicationId === appId)
                .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            
            if (app && appInterviews.length > 0) {
                return differenceInDays(new Date(appInterviews[0].date), new Date(app.dateApplied));
            }
            return null;
        }).filter((d): d is number => d !== null && d >= 0);
        
        const avgTimeToInterview = timeToInterviewDiffs.length > 0
            ? timeToInterviewDiffs.reduce((a, b) => a + b, 0) / timeToInterviewDiffs.length
            : 0;

        return {
            statusChartData,
            timelineChartData,
            kpis: {
                interviewRate: interviewRate.toFixed(1),
                offerRate: offerRate.toFixed(1),
                avgTimeToInterview: avgTimeToInterview.toFixed(1),
            }
        };

    }, [applications, interviews]);

    if (!analyticsData) {
        return (
            <div className="text-center py-16 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
                <BarChart3 className="mx-auto h-12 w-12 text-slate-500" />
                <h3 className="mt-2 text-lg font-semibold text-white">Not Enough Data</h3>
                <p className="mt-1 text-sm text-slate-400">
                    Start adding some applications to see your analytics.
                </p>
            </div>
        );
    }
    
    const {statusChartData, timelineChartData, kpis} = analyticsData;

    return (
        <div className="text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-violet-400">Analytics & Reporting</h1>
                <p className="text-slate-400 mt-1">Visualize your job search progress and identify trends.</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Interview Rate" value={kpis.interviewRate} unit="%" icon={Target} color="blue" />
                <StatCard title="Offer Rate (from Interview)" value={kpis.offerRate} unit="%" icon={CheckCircle} color="green" />
                <StatCard title="Avg. Time to Interview" value={kpis.avgTimeToInterview} unit="days" icon={Clock} color="amber" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-slate-900/70 border border-slate-700 rounded-xl p-6 shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Application Status</h2>
                    <DonutChart data={statusChartData} />
                </div>
                <div className="lg:col-span-3 bg-slate-900/70 border border-slate-700 rounded-xl p-6 shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Application Timeline</h2>
                    <BarChart data={timelineChartData} />
                </div>
            </div>

        </div>
    );
};

export default AnalyticsPage;
