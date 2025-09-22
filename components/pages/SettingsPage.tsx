
import React, { useState } from 'react';
import Toast from '../ui/Toast';
import ChangePasswordForm from '../settings/ChangePasswordForm';
import EmailPreferences from '../settings/EmailPreferences';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const SettingsPage: React.FC = () => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <div className="text-white max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-violet-400">Settings</h1>
                <p className="text-slate-400 mt-1">Manage your account settings and preferences.</p>
            </div>

            <div className="space-y-8">
                <ChangePasswordForm addToast={addToast} />
                <EmailPreferences addToast={addToast} />
            </div>

            {/* Toast Container */}
            <div className="fixed top-5 right-5 z-50 space-y-2">
                {toasts.map(toast => (
                    <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;