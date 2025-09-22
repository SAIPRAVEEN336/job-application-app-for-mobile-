
import React, { useState, useMemo } from 'react';
import { useContacts } from '../../contexts/ContactContext';
import { Contact } from '../../types';
import { Plus, Search, User } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import ContactForm from '../contacts/ContactForm';
import ContactCard from '../contacts/ContactCard';

const ContactsPage: React.FC = () => {
  const { contacts } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | undefined>(undefined);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a,b) => a.name.localeCompare(b.name));
  }, [contacts, searchTerm]);

  const handleAddContact = () => {
    setContactToEdit(undefined);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setContactToEdit(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setContactToEdit(undefined);
  }

  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-violet-400">My Contacts</h1>
          <p className="text-slate-400 mt-1">Manage your professional network.</p>
        </div>
        <Button onClick={handleAddContact}>
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Contact
        </Button>
      </div>

      <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700 mb-8">
        <Input 
          placeholder="Search by name or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="h-4 w-4 text-slate-400" />}
        />
      </div>

      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContacts.map(contact => (
            <ContactCard key={contact.id} contact={contact} onEdit={handleEditContact} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
          <User className="mx-auto h-12 w-12 text-slate-500" />
          <h3 className="mt-2 text-lg font-semibold text-white">No contacts found</h3>
          <p className="mt-1 text-sm text-slate-400">
            {contacts.length > 0 ? "Try adjusting your search." : "Get started by adding a new contact."}
          </p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title={contactToEdit ? "Edit Contact" : "Add New Contact"}>
        <ContactForm onSave={closeModal} contactToEdit={contactToEdit} />
      </Modal>
    </div>
  );
};

export default ContactsPage;
