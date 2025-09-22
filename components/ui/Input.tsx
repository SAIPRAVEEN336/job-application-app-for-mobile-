
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, ...props }) => {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`w-full bg-white text-slate-900 border border-slate-300 rounded-md py-2 pr-3 text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 ${
          icon ? 'pl-10' : 'pl-4'
        }`}
      />
    </div>
  );
};

export default Input;