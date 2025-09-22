
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Application, ApplicationStatus } from '../types';

interface ApplicationContextType {
  applications: Application[];
  getApplicationById: (id: string) => Application | undefined;
  addApplication: (application: Omit<Application, 'id'>) => void;
  updateApplication: (application: Application) => void;
  deleteApplication: (id: string) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

const initialApplications: Application[] = [
  { id: '1', companyName: 'Google', role: 'Frontend Engineer', status: ApplicationStatus.Interviewing, dateApplied: '2024-07-28T10:00:00Z', location: 'Mountain View, CA', salary: 150000, jobPostingUrl: 'https://careers.google.com', contactIds: ['c1'] },
  { id: '2', companyName: 'Meta', role: 'Product Designer', status: ApplicationStatus.Applied, dateApplied: '2024-07-27T14:30:00Z', location: 'Menlo Park, CA', description: 'Working on the next generation of social products.' },
  { id: '3', companyName: 'Amazon', role: 'Software Dev Engineer', status: ApplicationStatus.Offer, dateApplied: '2024-07-25T09:00:00Z', location: 'Seattle, WA', salary: 165000, contactIds: ['c2'] },
  { id: '4', companyName: 'Netflix', role: 'UX Researcher', status: ApplicationStatus.Rejected, dateApplied: '2024-07-24T17:00:00Z', location: 'Los Gatos, CA' },
  { id: '5', companyName: 'Apple', role: 'iOS Developer', status: ApplicationStatus.Applied, dateApplied: '2024-07-29T11:00:00Z', location: 'Cupertino, CA', jobPostingUrl: 'https://apple.com/jobs' },
  { id: '6', companyName: 'Microsoft', role: 'Cloud Solutions Architect', status: ApplicationStatus.Interviewing, dateApplied: '2024-07-22T09:00:00Z', location: 'Redmond, WA', salary: 180000, contactIds: ['c1', 'c3'] },
];

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>(initialApplications);

  const getApplicationById = (id: string) => {
    return applications.find(app => app.id === id);
  };

  const addApplication = (application: Omit<Application, 'id'>) => {
    const newApplication: Application = {
      id: new Date().toISOString(), // simple unique id
      ...application,
    };
    setApplications(prev => [newApplication, ...prev]);
  };

  const updateApplication = (updatedApplication: Application) => {
    setApplications(prev => prev.map(app => (app.id === updatedApplication.id ? updatedApplication : app)));
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  return (
    <ApplicationContext.Provider value={{ applications, getApplicationById, addApplication, updateApplication, deleteApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = (): ApplicationContextType => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};