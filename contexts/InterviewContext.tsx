
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Interview, InterviewType } from '../types';

interface InterviewContextType {
  interviews: Interview[];
  getInterviewsByApplicationId: (applicationId: string) => Interview[];
  addInterview: (interview: Omit<Interview, 'id'>) => void;
  updateInterview: (interview: Interview) => void;
  deleteInterview: (id: string) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

const initialInterviews: Interview[] = [
  { id: 'int-1', applicationId: '1', type: InterviewType.PhoneScreen, date: '2024-08-05T14:00:00Z', interviewers: ['Jane Smith'], notes: 'Initial screening call.' },
  { id: 'int-2', applicationId: '1', type: InterviewType.Technical, date: '2024-08-12T10:00:00Z', interviewers: ['Bob Johnson', 'Alice Williams'], notes: 'Live coding session on algorithms.' },
  { id: 'int-3', applicationId: '3', type: InterviewType.Onsite, date: '2024-08-08T09:30:00Z', interviewers: ['Team Lead', 'Senior SDE'], notes: 'Full day onsite loop.' },
  { id: 'int-4', applicationId: '6', type: InterviewType.Behavioral, date: '2024-08-02T11:00:00Z', interviewers: ['Hiring Manager'], notes: 'Discuss past projects and team fit.' },
];

export const InterviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);

  const getInterviewsByApplicationId = (applicationId: string) => {
    return interviews.filter(interview => interview.applicationId === applicationId);
  };

  const addInterview = (interview: Omit<Interview, 'id'>) => {
    const newInterview: Interview = {
      id: `int-${new Date().toISOString()}`,
      ...interview,
    };
    setInterviews(prev => [...prev, newInterview]);
  };

  const updateInterview = (updatedInterview: Interview) => {
    setInterviews(prev => prev.map(i => (i.id === updatedInterview.id ? updatedInterview : i)));
  };

  const deleteInterview = (id: string) => {
    setInterviews(prev => prev.filter(i => i.id !== id));
  };

  return (
    <InterviewContext.Provider value={{ interviews, getInterviewsByApplicationId, addInterview, updateInterview, deleteInterview }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterviews = (): InterviewContextType => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterviews must be used within an InterviewProvider');
  }
  return context;
};
