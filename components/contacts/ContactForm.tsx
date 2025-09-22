
import React, { useState, FormEvent, useEffect } from 'react';
import { useContacts } from '../../contexts/ContactContext';
import { useApplications } from '../../contexts/ApplicationContext';
import { Contact } from '../../types';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

interface ContactFormProps {
  onSave: () => void;
  contactToEdit?: Contact;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSave, contactToEdit }) => {
  const { addContact, updateContact } = useContacts();
  const { applications } = useApplications();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    role: '',
    notes: '',
    applicationIds: [] as string[],
  });

  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        name: contactToEdit.name,
        email: contactToEdit.email || '',
        phone: contactToEdit.phone || '',
        companyName: contactToEdit.companyName,
        role: contactToEdit.role,
        notes: contactToEdit.notes || '',
        applicationIds: contactToEdit.applicationIds || [],
      });
    }
  }, [contactToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleApplicationLinkToggle = (appId: string) => {
      setFormData(prev => {
          const newAppIds = prev.applicationIds.includes(appId)
              ? prev.applicationIds.filter(id => id !== appId)
              : [...prev.applicationIds, appId];
          return { ...prev, applicationIds: newAppIds };
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (contactToEdit) {
      updateContact({ ...formData, id: contactToEdit.id });
    } else {
      addContact(formData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 block">Full Name</label>
          <Input name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Jane Doe" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 block">Company</label>
          <Input name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="e.g. Acme Corp" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">Role</label>
        <Input name="role" value={formData.role} onChange={handleChange} required placeholder="e.g. Hiring Manager" />
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 block">Email (Optional)</label>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g. jane.doe@acme.com" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 block">Phone (Optional)</label>
          <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="e.g. 123-456-7890" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">Notes (Optional)</label>
        <Textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Add any relevant notes..." />
      </div>

      {applications.length > 0 && (
        <div className="pt-2">
            <label className="text-sm font-medium text-slate-300 mb-2 block">Link to Applications</label>
            <div className="max-h-32 overflow-y-auto space-y-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                {applications.map(app => (
                    <label key={app.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-700/50 rounded">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded bg-slate-600 border-slate-500 text-violet-600 focus:ring-violet-500"
                            checked={formData.applicationIds.includes(app.id)}
                            onChange={() => handleApplicationLinkToggle(app.id)}
                        />
                        <span className="text-slate-200">{app.role} at {app.companyName}</span>
                    </label>
                ))}
            </div>
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <Button type="submit">
          {contactToEdit ? 'Save Changes' : 'Add Contact'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
