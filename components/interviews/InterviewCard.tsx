
import React, { useState } from 'react';
import { Interview, InterviewType } from '../../types';
import { format } from 'date-fns';
import { Phone, Code, User, Building, Award, Edit, Trash2, ChevronDown } from 'lucide-react';

interface InterviewCardProps {
  interview: Interview;
  onEdit: (interview: Interview) => void;
  onDelete: (interview: Interview) => void;
}

const interviewTypeIcons: { [key in InterviewType]: React.ElementType } = {
  [InterviewType.PhoneScreen]: Phone,
  [InterviewType.Technical]: Code,
  [InterviewType.Behavioral]: User,
  [InterviewType.Onsite]: Building,
  [InterviewType.Final]: Award,
};

const InterviewCard: React.FC<InterviewCardProps> = ({ interview, onEdit, onDelete }) => {
    const [notesExpanded, setNotesExpanded] = useState(false);
    const Icon = interviewTypeIcons[interview.type];

    return (
        <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="bg-violet-500/20 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-violet-300" />
                    </div>
                    <div>
                        <p className="font-bold text-white">{interview.type}</p>
                        <p className="text-sm text-slate-300">{format(new Date(interview.date), 'EEE, MMM d, yyyy @ h:mm a')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(interview)} className="text-slate-400 hover:text-white p-1">
                        <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(interview)} className="text-slate-400 hover:text-red-400 p-1">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="mt-4 pl-16">
                {interview.interviewers.length > 0 && (
                     <p className="text-sm text-slate-400">
                        <span className="font-semibold text-slate-300">Interviewers:</span> {interview.interviewers.join(', ')}
                     </p>
                )}
                {interview.notes && (
                    <div className="mt-2">
                        <button onClick={() => setNotesExpanded(!notesExpanded)} className="text-sm text-violet-400 flex items-center gap-1">
                            {notesExpanded ? 'Hide Notes' : 'Show Notes'}
                            <ChevronDown className={`w-4 h-4 transition-transform ${notesExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {notesExpanded && (
                             <p className="mt-2 text-sm text-slate-300 bg-slate-900/50 p-3 rounded-md whitespace-pre-wrap border border-slate-700/50">
                                {interview.notes}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewCard;
