
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import ProfilePage from './components/pages/ProfilePage';
import AuthLayout from './components/layouts/AuthLayout';
import MainLayout from './components/layouts/MainLayout';
import DashboardPage from './components/pages/DashboardPage';
import ApplicationsPage from './components/pages/ApplicationsPage';
import ApplicationDetailPage from './components/pages/ApplicationDetailPage';
import { ApplicationProvider } from './contexts/ApplicationContext';
import CompaniesPage from './components/pages/CompaniesPage';
import CompanyDetailPage from './components/pages/CompanyDetailPage';
import { ContactProvider } from './contexts/ContactContext';
import ContactsPage from './components/pages/ContactsPage';
import ContactDetailPage from './components/pages/ContactDetailPage';
import { InterviewProvider } from './contexts/InterviewContext';
import AnalyticsPage from './components/pages/AnalyticsPage';
import SettingsPage from './components/pages/SettingsPage';
import LandingPage from './components/pages/LandingPage';
import PublicLayout from './components/layouts/PublicLayout';

const ProtectedRoutes: React.FC = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <ApplicationProvider>
      <InterviewProvider>
        <ContactProvider>
          <MainLayout>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/applications/:id" element={<ApplicationDetailPage />} />
              <Route path="/companies" element={<CompaniesPage />} />
              <Route path="/companies/:companyName" element={<CompanyDetailPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/contacts/:id" element={<ContactDetailPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </MainLayout>
        </ContactProvider>
      </InterviewProvider>
    </ApplicationProvider>
  );
};

const AppRoutes: React.FC = () => {
    const { user } = useAuth();

    return(
        <Routes>
            <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
            <Route path="/login" element={ user ? <Navigate to="/dashboard" /> : <AuthLayout><LoginPage /></AuthLayout>} />
            <Route path="/signup" element={ user ? <Navigate to="/dashboard" /> : <AuthLayout><SignUpPage /></AuthLayout>} />
            <Route path="/forgot-password" element={ user ? <Navigate to="/dashboard" /> : <AuthLayout><ForgotPasswordPage /></AuthLayout>} />
            <Route path="/reset-password" element={ user ? <Navigate to="/dashboard" /> : <AuthLayout><ResetPasswordPage /></AuthLayout>} />
            <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
    )
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;