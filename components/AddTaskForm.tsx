
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';

interface AddTaskFormProps {
  placeholder: string;
  buttonText: string;
  onSubmit: (text: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ placeholder, buttonText, onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="flex-grow bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!text.trim()}
      >
        <PlusIcon className="w-5 h-5" />
        <span>{buttonText}</span>
      </button>
    </form>
  );
};

export default AddTaskForm;
