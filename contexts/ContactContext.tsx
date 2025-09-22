
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Contact } from '../types';

interface ContactContextType {
  contacts: Contact[];
  getContactById: (id: string) => Contact | undefined;
  getContactsByIds: (ids: string[]) => Contact[];
  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

const initialContacts: Contact[] = [
    { id: 'c1', name: 'Alice Johnson', companyName: 'Google', role: 'Lead Recruiter', email: 'alice.j@google.com', phone: '111-222-3333', applicationIds: ['1', '6'], notes: 'Specializes in frontend roles.' },
    { id: 'c2', name: 'Bob Williams', companyName: 'Amazon', role: 'Hiring Manager', email: 'bob.w@amazon.com', applicationIds: ['3'], notes: 'Manager for the AWS S3 team.' },
    { id: 'c3', name: 'Charlie Brown', companyName: 'Microsoft', role: 'Senior Cloud Architect', email: 'charlie.b@microsoft.com', phone: '444-555-6666', applicationIds: ['6'], notes: 'Potential team member.' },
    { id: 'c4', name: 'Diana Prince', companyName: 'Meta', role: 'Sourcer', email: 'diana.p@meta.com', applicationIds: [], notes: 'Reached out on LinkedIn.' },
];

export const ContactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const getContactById = (id: string) => {
    return contacts.find(c => c.id === id);
  };
  
  const getContactsByIds = (ids: string[]) => {
    if (!ids || ids.length === 0) return [];
    return contacts.filter(c => ids.includes(c.id));
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      id: `c-${new Date().toISOString()}`,
      ...contact,
    };
    setContacts(prev => [newContact, ...prev]);
  };

  const updateContact = (updatedContact: Contact) => {
    setContacts(prev => prev.map(c => (c.id === updatedContact.id ? updatedContact : c)));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <ContactContext.Provider value={{ contacts, getContactById, getContactsByIds, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};
