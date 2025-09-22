
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
        localStorage.setItem('authUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('authUser');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    console.log(`Attempting login for ${email} with password ${password}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'saipraveen@gmail.com' && password === 'saipraveen') {
          const mockUser: User = {
            id: '1',
            name: 'saipraveen',
            email: 'saipraveen@gmail.com',
            profilePictureUrl: `https://picsum.photos/seed/johndoe/200`,
          };
          setUser(mockUser);
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    console.log(`Attempting signup for ${name} at ${email} with password ${password}`);
     return new Promise((resolve) => {
        setTimeout(() => {
            const newUser: User = {
                id: '2',
                name,
                email,
                profilePictureUrl: `https://picsum.photos/seed/${name}/200`
            };
            setUser(newUser);
            setLoading(false);
            resolve();
        }, 1000);
     });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if(user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
