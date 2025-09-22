
import React from 'react';
import { Link } from 'react-router-dom';
import { Application, ApplicationStatus } from '../../types';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export const statusColors: { [key in ApplicationStatus]: string } = {
  [ApplicationStatus.Applied]: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  [ApplicationStatus.Interviewing]: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  [ApplicationStatus.Offer]: 'bg-green-500/20 text-green-300 border-green-500/30',
  [ApplicationStatus.Rejected]: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export const ApplicationCard: React.FC<{ application: Application }> = ({ application }) => (
  <Link to={`/applications/${application.id}`} className="block bg-slate-900/70 hover:bg-slate-800/60 transition-colors duration-300 p-6 rounded-xl border border-slate-700 shadow-lg">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-lg font-bold text-white">{application.role}</p>
        <p className="text-sm text-slate-400 flex items-center gap-2"><Briefcase className="w-4 h-4" /> {application.companyName}</p>
      </div>
      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[application.status]}`}>
        {application.status}
      </span>
    </div>
    <div className="mt-4 flex flex-col sm:flex-row justify-between text-sm text-slate-400 gap-2 sm:gap-4">
       <div className="flex items-center gap-2">
           <MapPin className="w-4 h-4" />
           <span>{application.location}</span>
       </div>
       <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(application.dateApplied), 'MMM d, yy')}</span>
       </div>
    </div>
  </Link>
);