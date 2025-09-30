import React from 'react';
import { Task } from '../types';
import TrashIcon from './icons/TrashIcon';

interface TaskItemProps {
  task: Task;
  subtext?: string;
  onToggle: () => void;
  onDelete: () => void;
  onDragStart?: (e: React.DragEvent) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, subtext, onToggle, onDelete, onDragStart }) => {
  return (
    <li 
      className="flex items-center justify-between bg-slate-800/50 p-3 rounded-md group transition-all duration-300 hover:bg-slate-800"
      draggable={!!onDragStart}
      onDragStart={onDragStart}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
        />
        <div>
          <span className={`transition-colors ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'} ${onDragStart ? 'cursor-grab' : ''}`}>
            {task.text}
          </span>
          {subtext && <p className="text-xs text-slate-500 italic">{subtext}</p>}
        </div>
      </div>
      <button
        onClick={onDelete}
        className="text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Delete task"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
};

export default TaskItem;
