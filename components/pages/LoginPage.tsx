
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Mail, KeyRound } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('saipraveen@gmail.com');
  const [password, setPassword] = useState('saipraveen');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Sign in to continue to JobPortal</p>
        </div>

        {error && <p className="bg-red-100 text-red-700 text-center p-2 rounded-md mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail className="h-4 w-4" />}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<KeyRound className="h-4 w-4" />}
          />
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition">
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" isLoading={loading}>
            Log In
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition">
              Sign up
            </Link>
          </p>
        </div>
    </div>
  );
};

export default LoginPage;