
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { KeyRound, ShieldCheck } from 'lucide-react';

const ResetPasswordPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    setError('');
    setMessage('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        setMessage('Your password has been successfully reset.');
        setTimeout(() => navigate('/login'), 2000);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Reset Password</h2>
        <p className="text-slate-500 mt-2">Create a new strong password</p>
      </div>
      {error && <p className="bg-red-100 text-red-700 text-center p-2 rounded-md mb-4 text-sm">{error}</p>}
      {message && <p className="bg-green-100 text-green-700 text-center p-2 rounded-md mb-4 text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Confirmation Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          icon={<ShieldCheck className="h-4 w-4" />}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          icon={<KeyRound className="h-4 w-4" />}
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          icon={<KeyRound className="h-4 w-4" />}
        />
        <Button type="submit" isLoading={loading}>
          Reset Password
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition">
            Back to Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;