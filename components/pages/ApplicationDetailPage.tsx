
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApplications } from '../../contexts/ApplicationContext';
import { ApplicationStatus, Interview, Contact } from '../../types';
import { ArrowLeft, Edit, Trash2, ExternalLink, Calendar, MapPin, DollarSign, FileText, Briefcase, Building, User, Users, Plus } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import ApplicationForm from '../applications/ApplicationForm';
import { useInterviews } from '../../contexts/InterviewContext';
import InterviewCard from '../interviews/InterviewCard';
import InterviewForm from '../interviews/InterviewForm';
import { useContacts } from '../../contexts/ContactContext';

const statusColors: { [key in ApplicationStatus]: { bg: string, text: string, border: string } } = {
  [ApplicationStatus.Applied]: { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/30' },
  [ApplicationStatus.Interviewing]: { bg: 'bg-violet-500/20', text: 'text-violet-300', border: 'border-violet-500/30' },
  [ApplicationStatus.Offer]: { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-500/30' },
  [ApplicationStatus.Rejected]: { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-500/30' },
};

const DetailItem: React.FC<{ icon: React.ElementType, label: string, value?: string | number | null }> = ({ icon: Icon, label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 text-slate-400 mt-1" />
            <div>
                <p className="text-sm text-slate-400">{label}</p>
                <p className="text-white font-medium">{value}</p>
            </div>
        </div>
    );
};

const DeleteConfirmationModal: React.FC<{ isOpen: boolean, onClose: () => void, onConfirm: () => void, title: string, message: string }> = ({ isOpen, onClose, onConfirm, title, message }) => (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
        <p className="text-slate-300">{message}</p>
        <div className="mt-6 flex justify-end gap-4">
            <Button onClick={onClose} className="bg-slate-600 hover:bg-slate-700">Cancel</Button>
            <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700">Delete</Button>
        </div>
    </Modal>
);

const ContactLink: React.FC<{contact: Contact}> = ({ contact }) => (
    <Link to={`/contacts/${contact.id}`} className="block bg-slate-800/50 hover:bg-slate-700/50 p-3 rounded-lg border border-slate-700 transition-colors">
        <p className="font-semibold text-white">{contact.name}</p>
        <p className="text-sm text-slate-400">{contact.role} at {contact.companyName}</p>
    </Link>
)

const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getApplicationById, deleteApplication } = useApplications();
  const { getInterviewsByApplicationId, deleteInterview } = useInterviews();
  const { getContactsByIds } = useContacts();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [interviewToEdit, setInterviewToEdit] = useState<Interview | undefined>(undefined);
  const [interviewToDelete, setInterviewToDelete] = useState<Interview | undefined>(undefined);
  
  const application = id ? getApplicationById(id) : undefined;
  
  const applicationInterviews = useMemo(() => {
    return id ? getInterviewsByApplicationId(id).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];
  }, [id, getInterviewsByApplicationId]);

  const associatedContacts = useMemo(() => {
    return application?.contactIds ? getContactsByIds(application.contactIds) : [];
  }, [application, getContactsByIds]);

  if (!application) {
    return (
      <div className="text-center text-white py-10">
        <h2 className="text-2xl font-bold">Application not found</h2>
        <Link to="/applications" className="text-violet-400 hover:text-violet-300 mt-4 inline-block">
          &larr; Back to all applications
        </Link>
      </div>
    );
  }
  
  const statusStyle = statusColors[application.status];

  const handleDeleteApplication = () => {
      deleteApplication(application.id);
      navigate('/applications');
  }
  
  const handleAddInterview = () => {
    setInterviewToEdit(undefined);
    setIsInterviewModalOpen(true);
  }

  const handleEditInterview = (interview: Interview) => {
    setInterviewToEdit(interview);
    setIsInterviewModalOpen(true);
  }
  
  const handleDeleteInterview = (interview: Interview) => {
    setInterviewToDelete(interview);
  }

  const confirmDeleteInterview = () => {
    if (interviewToDelete) {
        deleteInterview(interviewToDelete.id);
        setInterviewToDelete(undefined);
    }
  }

  return (
    <div className="text-white">
      <Link to="/applications" className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Applications
      </Link>

      <div className="bg-slate-900/70 rounded-xl border border-slate-700 shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{application.role}</h1>
            <p className="text-lg text-slate-400 flex items-center gap-2 mt-1">
                <Building className="w-5 h-5" />
                {application.companyName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsEditModalOpen(true)} className="bg-slate-600 hover:bg-slate-700">
                <Edit className="w-4 h-4 mr-2" /> Edit
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(true)} className="bg-red-600/50 hover:bg-red-600/80">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="md:col-span-1 space-y-6">
             <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-slate-400" />
                <div>
                    <p className="text-sm text-slate-400">Status</p>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border inline-block ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>{application.status}</span>
                </div>
            </div>
            <DetailItem icon={Calendar} label="Date Applied" value={format(new Date(application.dateApplied), 'MMMM d, yyyy')} />
            <DetailItem icon={MapPin} label="Location" value={application.location} />
            <DetailItem icon={DollarSign} label="Salary" value={application.salary ? `$${application.salary.toLocaleString()}` : 'Not specified'} />
             {application.jobPostingUrl && (
                <div className="flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-slate-400 mt-1" />
                    <div>
                         <p className="text-sm text-slate-400">Job Posting</p>
                         <a href={application.jobPostingUrl} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline break-all">View original post</a>
                    </div>
                </div>
             )}
          </div>

          {/* Right Column - Description & Interviews */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><FileText className="w-5 h-5 text-slate-400" />Description & Notes</h3>
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{application.description || 'No description or notes added.'}</p>
            </div>
            
            <div className="space-y-4 pt-8 border-t border-slate-700/50">
               <div className="flex justify-between items-center">
                 <h3 className="text-lg font-semibold flex items-center gap-2"><Users className="w-5 h-5 text-slate-400" />Interviews</h3>
                 <Button onClick={handleAddInterview} className="bg-violet-600/50 hover:bg-violet-600/80 text-sm py-1 px-3">
                    <Plus className="w-4 h-4 mr-1" /> Add Interview
                 </Button>
               </div>
               {applicationInterviews.length > 0 ? (
                    <div className="space-y-4">
                        {applicationInterviews.map(interview => (
                            <InterviewCard key={interview.id} interview={interview} onEdit={handleEditInterview} onDelete={handleDeleteInterview} />
                        ))}
                    </div>
               ) : (
                 <div className="p-4 rounded-lg bg-slate-800/50 text-center text-slate-400 text-sm">
                  No interviews scheduled yet.
                 </div>
               )}
            </div>
            
             <div className="space-y-4 pt-8 border-t border-slate-700/50">
                <h3 className="text-lg font-semibold flex items-center gap-2"><User className="w-5 h-5 text-slate-400" />Associated Contacts</h3>
                 {associatedContacts.length > 0 ? (
                    <div className="space-y-3">
                        {associatedContacts.map(contact => (
                            <ContactLink key={contact.id} contact={contact} />
                        ))}
                    </div>
                 ) : (
                    <div className="p-4 rounded-lg bg-slate-800/50 text-center text-slate-400 text-sm">
                        No contacts linked to this application.
                    </div>
                 )}
            </div>
          </div>
        </div>
      </div>
      
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Application">
        <ApplicationForm applicationToEdit={application} onSave={() => setIsEditModalOpen(false)} />
      </Modal>

      <Modal isOpen={isInterviewModalOpen} onClose={() => setIsInterviewModalOpen(false)} title={interviewToEdit ? "Edit Interview" : "Add New Interview"}>
        <InterviewForm 
            applicationId={application.id} 
            interviewToEdit={interviewToEdit}
            onSave={() => setIsInterviewModalOpen(false)} 
        />
      </Modal>

      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteApplication} title="Confirm Deletion" message="Are you sure you want to delete this application? This action cannot be undone." />
      
      <DeleteConfirmationModal isOpen={!!interviewToDelete} onClose={() => setInterviewToDelete(undefined)} onConfirm={confirmDeleteInterview} title="Confirm Interview Deletion" message="Are you sure you want to delete this interview record?" />
    </div>
  );
};

export default ApplicationDetailPage;
