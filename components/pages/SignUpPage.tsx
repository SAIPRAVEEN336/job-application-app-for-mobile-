
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { User as UserIcon, Mail, KeyRound } from 'lucide-react';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('saipraveen');
  const [email, setEmail] = useState('saipraveen@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    setError('');
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
        <p className="text-slate-500 mt-2">Get started with your free account</p>
      </div>
      {error && <p className="bg-red-100 text-red-700 text-center p-2 rounded-md mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          icon={<UserIcon className="h-4 w-4" />}
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          icon={<KeyRound className="h-4 w-4" />}
        />
        <Button type="submit" isLoading={loading}>
          Sign Up
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;