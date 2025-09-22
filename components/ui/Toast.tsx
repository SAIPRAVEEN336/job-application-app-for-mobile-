
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setVisible(true);

    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    // Allow animation to finish before calling onClose
    setTimeout(onClose, 300);
  };

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-600/90' : 'bg-red-600/90';
  const Icon = isSuccess ? CheckCircle : XCircle;

  return (
    <div
      className={`flex items-center text-white p-4 rounded-lg shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 ${bgColor} ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      role="alert"
    >
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6" />
      </div>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        onClick={handleClose}
        className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-full hover:bg-white/20 inline-flex"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;