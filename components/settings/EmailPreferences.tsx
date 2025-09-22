
import React, { useState } from 'react';
import ToggleSwitch from '../ui/ToggleSwitch';
import { ToastMessage } from '../pages/SettingsPage';
import { Mail } from 'lucide-react';

interface EmailPreferencesProps {
    addToast: (message: string, type: ToastMessage['type']) => void;
}

interface Preference {
    id: string;
    label: string;
    description: string;
}

const preferences: Preference[] = [
    { id: 'weeklySummary', label: 'Weekly Summary Report', description: 'Receive a weekly summary of your application activity.' },
    { id: 'interviewReminders', label: 'Interview Reminders', description: 'Get email reminders for your upcoming interviews.' },
    { id: 'featureUpdates', label: 'New Feature Updates', description: 'Be the first to know about new features and updates.' },
];

const EmailPreferences: React.FC<EmailPreferencesProps> = ({ addToast }) => {
    const [settings, setSettings] = useState({
        weeklySummary: true,
        interviewReminders: true,
        featureUpdates: false,
    });

    const handleToggle = (id: keyof typeof settings) => {
        setSettings(prev => {
            const newState = !prev[id];
            // Simulate saving to backend
            console.log(`Setting ${id} changed to ${newState}`);
            addToast('Preferences saved!', 'success');
            return { ...prev, [id]: newState };
        });
    };

    return (
        <div className="bg-slate-900/70 border border-slate-700 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Mail className="w-6 h-6 text-violet-400" />
                Notifications
            </h2>
            <p className="text-slate-400 mt-1 text-sm">Manage your email preferences.</p>
            <div className="mt-6 space-y-4 divide-y divide-slate-700/50">
                {preferences.map(pref => (
                    <div key={pref.id} className="flex justify-between items-center pt-4 first:pt-0">
                        <div>
                            <h3 className="font-medium text-white">{pref.label}</h3>
                            <p className="text-sm text-slate-400">{pref.description}</p>
                        </div>
                        <ToggleSwitch
                            label={pref.id}
                            checked={settings[pref.id as keyof typeof settings]}
                            onChange={() => handleToggle(pref.id as keyof typeof settings)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmailPreferences;