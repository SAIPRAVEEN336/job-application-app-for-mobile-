
import React, { TextareaHTMLAttributes } from 'react';

const Textarea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  return (
    <textarea
      {...props}
      className="w-full bg-slate-700/50 text-white border border-slate-500 rounded-lg py-3 px-4 text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-slate-400"
    />
  );
};

export default Textarea;
