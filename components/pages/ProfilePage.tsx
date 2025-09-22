
import React, { useRef, useState, ChangeEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, Loader2 } from 'lucide-react';
import Toast from '../ui/Toast';

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [isUploading, setIsUploading] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleProfilePicClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Simulate a short delay for better UX
        setTimeout(() => {
          updateUser({ profilePictureUrl: reader.result as string });
          setIsUploading(false);
          addToast('Profile picture updated!', 'success');
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  
  const handleNameSave = () => {
    if(name.trim()) {
      updateUser({ name });
    }
    setIsEditingName(false);
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSave();
    } else if (e.key === 'Escape') {
      setName(user?.name || '');
      setIsEditingName(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="text-white">
       <h1 className="text-3xl font-bold text-violet-400 mb-8">My Profile</h1>
       
       <div className="w-full max-w-4xl bg-slate-900/70 rounded-xl shadow-lg p-8 border border-slate-700">
         <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
           <div className="relative group">
             <img
               src={user.profilePictureUrl}
               alt="Profile"
               className={`w-32 h-32 rounded-full border-4 border-violet-500 object-cover shadow-md transition-all duration-300 ${isUploading ? 'blur-md brightness-75' : ''}`}
             />
             {isUploading ? (
               <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                 <Loader2 className="h-8 w-8 text-white animate-spin" />
               </div>
             ) : (
               <button
                 onClick={handleProfilePicClick}
                 className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-full transition duration-300"
                 aria-label="Change profile picture"
               >
                 <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
             )}
             <input
               type="file"
               ref={fileInputRef}
               onChange={handleFileChange}
               className="hidden"
               accept="image/*"
               disabled={isUploading}
             />
           </div>

           <div className="mt-6 sm:mt-0 sm:ml-8">
              {isEditingName ? (
                  <div className="flex items-center gap-2">
                     <input 
                        type="text" 
                        value={name} 
                        onChange={handleNameChange}
                        onKeyDown={handleKeyDown}
                        className="bg-slate-700 text-white text-3xl font-bold p-2 rounded w-full sm:w-auto" 
                        autoFocus
                      />
                     <button onClick={handleNameSave} className="bg-green-600 text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition">Save</button>
                     <button onClick={() => { setIsEditingName(false); setName(user.name); }} className="bg-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition">Cancel</button>
                  </div>
              ) : (
                 <div className="flex items-center gap-4">
                     <h2 className="text-3xl font-bold">{user.name}</h2>
                     <button onClick={() => setIsEditingName(true)} className="text-violet-400 hover:text-violet-300 font-semibold">Edit</button>
                 </div>
              )}
             <p className="mt-2 text-slate-400">{user.email}</p>
             <p className="mt-4 text-slate-300 max-w-prose">
               Welcome to your profile page. Here you can manage your account details and settings. Feel free to update your profile picture or change your display name.
             </p>
           </div>
         </div>
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

export default ProfilePage;
