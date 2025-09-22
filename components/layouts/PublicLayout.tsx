
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Briefcase, Bell } from 'lucide-react';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-800">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                                <span>JobPortal</span>
                            </Link>
                            <nav className="hidden md:flex items-center space-x-8 ml-10">
                                <Link to="#" className="font-medium text-slate-600 hover:text-blue-600">Find Jobs</Link>
                                {user && <Link to="/dashboard" className="font-medium text-slate-600 hover:text-blue-600">Dashboard</Link>}
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            {user ? (
                                <>
                                    <button className="text-slate-500 hover:text-blue-600">
                                        <Bell className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => navigate('/profile')} className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                                        <img src={user.profilePictureUrl} alt="Profile" className="h-full w-full object-cover" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-blue-600">Log In</Link>
                                    <Link to="/signup" className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
                    <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;