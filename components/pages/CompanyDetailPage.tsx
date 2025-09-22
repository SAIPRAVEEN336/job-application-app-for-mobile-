
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApplications } from '../../contexts/ApplicationContext';
import { ApplicationCard } from '../applications/ApplicationCard';
import { ArrowLeft, Building2 } from 'lucide-react';

const CompanyDetailPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const { applications } = useApplications();

  const decodedCompanyName = useMemo(() => companyName ? decodeURIComponent(companyName) : '', [companyName]);

  const companyApplications = useMemo(() => {
    return applications
      .filter(app => app.companyName === decodedCompanyName)
      .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime());
  }, [applications, decodedCompanyName]);

  if (companyApplications.length === 0) {
    return (
      <div className="text-center text-white py-10">
        <Building2 className="mx-auto h-12 w-12 text-slate-500" />
        <h2 className="text-2xl font-bold mt-4">Company Not Found</h2>
        <p className="text-slate-400 mt-2">No applications found for "{decodedCompanyName}".</p>
        <Link to="/companies" className="text-violet-400 hover:text-violet-300 mt-6 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to all companies
        </Link>
      </div>
    );
  }

  return (
    <div className="text-white">
      <Link to="/companies" className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Companies
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{decodedCompanyName}</h1>
        <p className="text-slate-400 mt-1">
          You have {companyApplications.length} application{companyApplications.length > 1 ? 's' : ''} with this company.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {companyApplications.map(app => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </div>
    </div>
  );
};

export default CompanyDetailPage;