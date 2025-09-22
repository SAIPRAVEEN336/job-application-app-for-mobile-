
import React from 'react';
import { Link } from 'react-router-dom';
import { Contact } from '../../types';
import { Edit } from 'lucide-react';

interface ContactCardProps {
    contact: Contact;
    onEdit: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit }) => {
    const initial = contact.name.charAt(0).toUpperCase();

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation();
        onEdit(contact);
    };

    return (
        <div className="group relative">
            <Link to={`/contacts/${contact.id}`} className="block bg-slate-900/70 hover:bg-slate-800/60 transition-colors duration-300 p-6 rounded-xl border border-slate-700 shadow-lg h-full">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-violet-500/20 text-violet-300 font-bold text-2xl">
                        {initial}
                    </div>
                    <div className="overflow-hidden">
                        <h3 className="text-lg font-bold text-white truncate">{contact.name}</h3>
                        <p className="text-sm text-slate-400 truncate">{contact.role}</p>
                        <p className="text-sm text-slate-500 truncate">{contact.companyName}</p>
                    </div>
                </div>
            </Link>
             <button
                onClick={handleEditClick}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-700/50 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-slate-600 hover:text-white transition-opacity"
                aria-label="Edit contact"
            >
                <Edit className="w-4 h-4" />
            </button>
        </div>
    );
};

export default ContactCard;
