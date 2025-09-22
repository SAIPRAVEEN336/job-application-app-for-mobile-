
import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContacts } from '../../contexts/ContactContext';
import { useApplications } from '../../contexts/ApplicationContext';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Building, Briefcase, FileText } from 'lucide-react';
import { ApplicationCard } from '../applications/ApplicationCard';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import ContactForm from '../contacts/ContactForm';

const DetailItem: React.FC<{ icon: React.ElementType, label: string, value?: string | null }> = ({ icon: Icon, label, value }) => {
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


const ContactDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getContactById, deleteContact } = useContacts();
    const { applications } = useApplications();
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const contact = id ? getContactById(id) : undefined;
    
    const associatedApplications = useMemo(() => {
        if (!contact) return [];
        return applications.filter(app => contact.applicationIds.includes(app.id));
    }, [contact, applications]);


    if (!contact) {
        return (
            <div className="text-center text-white py-10">
                <h2 className="text-2xl font-bold">Contact not found</h2>
                <Link to="/contacts" className="text-violet-400 hover:text-violet-300 mt-4 inline-block">
                    &larr; Back to all contacts
                </Link>
            </div>
        );
    }
    
    const handleDelete = () => {
        deleteContact(contact.id);
        navigate('/contacts');
    };

    return (
       <div className="text-white">
            <Link to="/contacts" className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 mb-6">
                <ArrowLeft className="w-4 h-4" />
                Back to Contacts
            </Link>

            <div className="bg-slate-900/70 rounded-xl border border-slate-700 shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">{contact.name}</h1>
                        <p className="text-lg text-slate-400">{contact.role} at {contact.companyName}</p>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-700 pt-6">
                    <div className="space-y-4">
                        <DetailItem icon={Mail} label="Email" value={contact.email} />
                        <DetailItem icon={Phone} label="Phone" value={contact.phone} />
                        <DetailItem icon={Building} label="Company" value={contact.companyName} />
                        <DetailItem icon={FileText} label="Notes" value={contact.notes} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-slate-400"/>Associated Applications</h3>
                        {associatedApplications.length > 0 ? (
                            <div className="space-y-4">
                                {associatedApplications.map(app => (
                                    <ApplicationCard key={app.id} application={app} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 rounded-lg bg-slate-800/50 text-center text-slate-400 text-sm">
                                No applications linked to this contact.
                            </div>
                        )}
                    </div>
                </div>

            </div>
            
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Contact">
                <ContactForm contactToEdit={contact} onSave={() => setIsEditModalOpen(false)} />
            </Modal>
            
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
                <p className="text-slate-300">Are you sure you want to delete this contact? This action cannot be undone.</p>
                <div className="mt-6 flex justify-end gap-4">
                    <Button onClick={() => setIsDeleteModalOpen(false)} className="bg-slate-600 hover:bg-slate-700">Cancel</Button>
                    <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</Button>
                </div>
            </Modal>
       </div>
    );
}

export default ContactDetailPage;
