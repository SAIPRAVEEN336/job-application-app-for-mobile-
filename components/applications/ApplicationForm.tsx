
import React, { useState, FormEvent, useEffect } from 'react';
import { useApplications } from '../../contexts/ApplicationContext';
import { Application, ApplicationStatus } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

interface ApplicationFormProps {
  onSave: () => void;
  applicationToEdit?: Application;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSave, applicationToEdit }) => {
  const { addApplication, updateApplication } = useApplications();
  const [formData, setFormData] = useState({
    role: '',
    companyName: '',
    location: '',
    status: ApplicationStatus.Applied,
    dateApplied: new Date().toISOString().split('T')[0],
    salary: '',
    jobPostingUrl: '',
    description: '',
  });

  useEffect(() => {
    if (applicationToEdit) {
      setFormData({
        role: applicationToEdit.role,
        companyName: applicationToEdit.companyName,
        location: applicationToEdit.location,
        status: applicationToEdit.status,
        dateApplied: new Date(applicationToEdit.dateApplied).toISOString().split('T')[0],
        salary: applicationToEdit.salary?.toString() || '',
        jobPostingUrl: applicationToEdit.jobPostingUrl || '',
        description: applicationToEdit.description || '',
      });
    }
  }, [applicationToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const applicationData = {
      ...formData,
      dateApplied: new Date(formData.dateApplied).toISOString(),
      salary: formData.salary ? parseInt(formData.salary, 10) : undefined,
    };
    
    if (applicationToEdit) {
      updateApplication({ ...applicationData, id: applicationToEdit.id });
    } else {
      addApplication(applicationData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 block">Job Role</label>
          <Input name="role" value={formData.role} onChange={handleChange} required placeholder="e.g. Frontend Developer" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 block">Company</label>
          <Input name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="e.g. Google" />
        </div>
      </div>
       <div>
          <label className="text-sm font-medium text-slate-300 mb-1 block">Location</label>
          <Input name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. San Francisco, CA" />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 block">Status</label>
          <Select name="status" value={formData.status} onChange={handleChange} required>
            {Object.values(ApplicationStatus).map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 block">Date Applied</label>
          <Input name="dateApplied" type="date" value={formData.dateApplied} onChange={handleChange} required />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">Salary (Optional)</label>
        <Input name="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="e.g. 120000" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">Job Posting URL (Optional)</label>
        <Input name="jobPostingUrl" type="url" value={formData.jobPostingUrl} onChange={handleChange} placeholder="https://..." />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">Description & Notes (Optional)</label>
        <Textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Add any relevant notes here..." />
      </div>
      <div className="pt-4 flex justify-end">
        <Button type="submit">
          {applicationToEdit ? 'Save Changes' : 'Add Application'}
        </-Button>
      </div>
    </form>
  );
};

export default ApplicationForm;
