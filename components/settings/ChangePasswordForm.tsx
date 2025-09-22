
import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { ToastMessage } from '../pages/SettingsPage';
import { KeyRound, Shield } from 'lucide-react';

interface ChangePasswordFormProps {
    addToast: (message: string, type: ToastMessage['type']) => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ addToast }) => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (passwords.newPassword !== passwords.confirmPassword) {
            addToast('New passwords do not match.', 'error');
            return;
        }

        if (passwords.newPassword.length < 6) {
             addToast('New password must be at least 6 characters.', 'error');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            // In a real app, you'd check the current password against the backend.
            // For this demo, we'll just simulate success.
            setLoading(false);
            addToast('Password changed successfully!', 'success');
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }, 1500);
    };

    return (
        <div className="bg-slate-900/70 border border-slate-700 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Shield className="w-6 h-6 text-violet-400" />
                Security
            </h2>
            <p className="text-slate-400 mt-1 text-sm">Change your password here.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={passwords.currentPassword}
                    onChange={handleChange}
                    required
                    icon={<KeyRound className="h-4 w-4 text-slate-400" />}
                />
                <Input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    required
                    icon={<KeyRound className="h-4 w-4 text-slate-400" />}
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    required
                    icon={<KeyRound className="h-4 w-4 text-slate-400" />}
                />
                <div className="pt-2 flex justify-end">
                    <Button type="submit" isLoading={loading} className="w-auto px-6">
                        Update Password
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordForm;