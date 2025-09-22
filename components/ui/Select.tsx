
import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ icon, ...props }) => {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </span>
      )}
      <select
        {...props}
        className={`w-full bg-slate-700/50 text-white border border-slate-500 rounded-lg py-3 pr-10 text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
          icon ? 'pl-10' : 'pl-4'
        }`}
      >
        {props.children}
      </select>
    </div>
  );
};

export default Select;
