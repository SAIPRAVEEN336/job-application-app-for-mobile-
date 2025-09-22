
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
        <div className="w-full max-w-md">
            <div className="flex justify-center items-center mb-6">
                 <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                    <Briefcase className="h-7 w-7 text-blue-600" />
                    <span>JobPortal</span>
                </Link>
            </div>
            {children}
        </div>
        <footer className="text-center text-slate-500 mt-8 text-sm">
            <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default AuthLayout;