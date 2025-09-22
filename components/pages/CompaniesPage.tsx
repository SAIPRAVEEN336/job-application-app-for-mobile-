
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApplications } from '../../contexts/ApplicationContext';
import { Building2, Briefcase } from 'lucide-react';

interface CompanySummary {
  name: string;
  applicationCount: number;
}

const CompanyCard: React.FC<{ company: CompanySummary }> = ({ company }) => {
    const initial = company.name.charAt(0).toUpperCase();
    return (
        <Link to={`/companies/${encodeURIComponent(company.name)}`} className="block bg-slate-900/70 hover:bg-slate-800/60 transition-colors duration-300 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-violet-500/20 text-violet-300 font-bold text-xl">
                    {initial}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white truncate">{company.name}</h3>
                    <p className="text-sm text-slate-400">{company.applicationCount} application{company.applicationCount > 1 ? 's' : ''}</p>
                </div>
            </div>
        </Link>
    );
};


const CompaniesPage: React.FC = () => {
    const { applications } = useApplications();

    const companies = useMemo<CompanySummary[]>(() => {
        const companyMap = new Map<string, number>();
        applications.forEach(app => {
            companyMap.set(app.companyName, (companyMap.get(app.companyName) || 0) + 1);
        });
        
        const sortedCompanies = Array.from(companyMap.entries())
            .map(([name, applicationCount]) => ({ name, applicationCount }))
            .sort((a, b) => a.name.localeCompare(b.name));

        return sortedCompanies;
    }, [applications]);

    return (
        <div className="text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-violet-400">Companies</h1>
                <p className="text-slate-400 mt-1">A list of all companies you've applied to.</p>
            </div>

            {companies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {companies.map(company => (
                        <CompanyCard key={company.name} company={company} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
                    <Building2 className="mx-auto h-12 w-12 text-slate-500" />
                    <h3 className="mt-2 text-lg font-semibold text-white">No companies found</h3>
                    <p className="mt-1 text-sm text-slate-400">
                        Your companies will appear here once you add an application.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CompaniesPage;