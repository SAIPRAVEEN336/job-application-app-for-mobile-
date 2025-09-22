
import React, { useState, Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Briefcase, Building2, Contact, Menu, X, User as UserIcon, LogOut, BarChart3, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Applications', href: '/applications', icon: Briefcase },
  { name: 'Companies', href: '/companies', icon: Building2 },
  { name: 'Contacts', href: '/contacts', icon: Contact },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleProfileClick = () => {
      navigate('/profile');
      setUserMenuOpen(false);
  }

  const SidebarContent = () => (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4 border-r border-slate-700">
      <div className="flex h-16 shrink-0 items-center gap-x-2">
        <div className="bg-violet-600 p-2 rounded-lg">
            <Briefcase className="h-8 w-8 text-white" />
        </div>
        <span className="text-white text-xl font-bold">JobTracker</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                        isActive
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`
                    }
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
             <div className="border-t border-slate-700 -mx-6 pt-4">
                 <ul role="list" className="px-4 space-y-1">
                     <li>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                              `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                isActive
                                  ? 'bg-slate-800 text-white'
                                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                              }`
                            }
                          >
                           <Settings className="h-6 w-6 shrink-0" aria-hidden="true" />
                           Settings
                       </NavLink>
                     </li>
                 </ul>
             </div>
             <div className="relative mt-4">
                <div 
                    className="group -mx-2 flex gap-x-3 items-center rounded-md p-2 text-sm font-semibold leading-6 text-slate-300 hover:bg-slate-800/50 hover:text-white cursor-pointer"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                    <img className="h-8 w-8 rounded-full bg-slate-700 object-cover" src={user?.profilePictureUrl} alt="" />
                    <span className="truncate">{user?.name}</span>
                </div>
                {userMenuOpen && (
                    <div className="absolute bottom-full mb-2 w-full bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <button onClick={handleProfileClick} className="w-full text-left flex items-center gap-x-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white" role="menuitem">
                                <UserIcon className="h-5 w-5"/>
                                My Profile
                            </button>
                            <button onClick={handleLogout} className="w-full text-left flex items-center gap-x-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white" role="menuitem">
                                <LogOut className="h-5 w-5"/>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
             </div>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <div>
      {/* Mobile sidebar */}
      {sidebarOpen && (
          <div className="relative z-50 lg:hidden">
              <div className="fixed inset-0 bg-gray-900/80" />
              <div className="fixed inset-0 flex">
                  <div className="relative mr-16 flex w-full max-w-xs flex-1">
                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                          <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                              <X className="h-6 w-6 text-white" />
                          </button>
                      </div>
                      <SidebarContent />
                  </div>
              </div>
          </div>
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-700 bg-slate-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="py-10 bg-slate-800 min-h-screen">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;