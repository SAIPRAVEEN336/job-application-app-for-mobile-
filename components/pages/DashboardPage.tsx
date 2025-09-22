
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ApplicationStatus } from '../../types';
import { Briefcase, CalendarClock, CheckCircle, FileText, ArrowUpRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useApplications } from '../../contexts/ApplicationContext';
import { Link } from 'react-router-dom';
import StatCard from '../ui/StatCard';


const statusConfig = {
    [ApplicationStatus.Applied]: { icon: FileText, text: 'Applied to', color: 'text-blue-400' },
    [ApplicationStatus.Interviewing]: { icon: CalendarClock, text: 'Interview scheduled with', color: 'text-violet-400' },
    [ApplicationStatus.Offer]: { icon: CheckCircle, text: 'Offer received from', color: 'text-green-400' },
    [ApplicationStatus.Rejected]: { icon: CheckCircle, text: 'Application updated for', color: 'text-red-400' },
};

const ActivityItem: React.FC<{ application: any }> = ({ application }) => {
    const config = statusConfig[application.status];
    const Icon = config.icon;

    return (
        <li className="flex items-center justify-between py-4 px-2 hover:bg-slate-800/50 rounded-md transition-colors">
            <div className="flex items-center gap-4">
                <Icon className={`h-5 w-5 ${config.color}`} />
                <div>
                    <p className="text-sm font-medium text-white">{config.text} {application.companyName}</p>
                    <p className="text-xs text-slate-400">{application.role}</p>
                </div>
            </div>
            <p className="text-sm text-slate-500">{formatDistanceToNow(new Date(application.dateApplied), { addSuffix: true })}</p>
        </li>
    );
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { applications } = useApplications();
  
  const totalApplied = applications.length;
  const interviews = applications.filter(app => app.status === ApplicationStatus.Interviewing).length;
  const offers = applications.filter(app => app.status === ApplicationStatus.Offer).length;

  const sortedApplications = [...applications].sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime());

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Welcome back, {user?.name.split(' ')[0]}!</h1>
      <p className="mt-2 text-slate-400">Here's a summary of your job application progress.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatCard title="Total Applications" value={totalApplied} icon={Briefcase} color="blue" />
        <StatCard title="Interviews" value={interviews} icon={CalendarClock} color="violet" />
        <StatCard title="Offers Received" value={offers} icon={CheckCircle} color="green" />
      </div>

      {/* Recent Activity */}
      <div className="mt-10">
         <div className="bg-slate-900/70 border border-slate-700 rounded-xl shadow-lg">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Link to="/applications" className="text-sm font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1">
                    View all <ArrowUpRight className="h-4 w-4" />
                </Link>
            </div>
            <ul className="divide-y divide-slate-800 p-2">
                {sortedApplications.slice(0, 5).map(app => (
                    <ActivityItem key={app.id} application={app} />
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;