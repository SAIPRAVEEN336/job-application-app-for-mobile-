import React, { useState, useMemo } from 'react';
import { useApplications } from '../../contexts/ApplicationContext';
import { Application, ApplicationStatus } from '../../types';
// FIX: Imported Briefcase icon from lucide-react.
import { Plus, Search, Briefcase } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Modal from '../ui/Modal';
import ApplicationForm from '../applications/ApplicationForm';
import { ApplicationCard } from '../applications/ApplicationCard';


const ApplicationsPage: React.FC = () => {
  const { applications } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAndSortedApplications = useMemo(() => {
    let result = applications.filter(app => {
      const matchesSearch = app.role.toLowerCase().includes(searchTerm.toLowerCase()) || app.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    
    result.sort((a, b) => {
        if (sortBy === 'date-desc') {
            return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
        }
        if (sortBy === 'date-asc') {
            return new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime();
        }
        if (sortBy === 'company-asc') {
            return a.companyName.localeCompare(b.companyName);
        }
        if (sortBy === 'company-desc') {
            return b.companyName.localeCompare(a.companyName);
        }
        return 0;
    });

    return result;
  }, [applications, searchTerm, statusFilter, sortBy]);

  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-violet-400">My Applications</h1>
            <p className="text-slate-400 mt-1">Track and manage all your job applications in one place.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Application
        </Button>
      </div>

      <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700 mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Input 
            placeholder="Search by role or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4 text-slate-400" />}
          />
        </div>
        <div className="flex gap-4">
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="flex-grow">
            <option value="All">All Statuses</option>
            {Object.values(ApplicationStatus).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Select>
           <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-grow">
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="company-asc">Company (A-Z)</option>
            <option value="company-desc">Company (Z-A)</option>
          </Select>
        </div>
      </div>
      
      {filteredAndSortedApplications.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedApplications.map(app => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
            <Briefcase className="mx-auto h-12 w-12 text-slate-500" />
            <h3 className="mt-2 text-lg font-semibold text-white">No applications found</h3>
            <p className="mt-1 text-sm text-slate-400">
              {applications.length > 0 ? "Try adjusting your filters." : "Get started by adding a new application."}
            </p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Application">
        <ApplicationForm onSave={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ApplicationsPage;