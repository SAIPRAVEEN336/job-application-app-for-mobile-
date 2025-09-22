
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Mail } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    // Simulate API call
    setTimeout(() => {
      setMessage(`A password reset link has been sent to ${email}.`);
      setLoading(false);
      setTimeout(() => navigate('/reset-password'), 2000); // Redirect after showing message
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Forgot Password</h2>
        <p className="text-slate-500 mt-2">Enter your email to get a reset link</p>
      </div>
      {message && <p className="bg-green-100 text-green-700 text-center p-2 rounded-md mb-4 text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          icon={<Mail className="h-4 w-4" />}
        />
        <Button type="submit" isLoading={loading}>
          Send Reset Link
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          Remember your password?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;