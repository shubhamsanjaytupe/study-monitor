import React, { useState } from 'react';
import { TodayTask } from '../types';
import TaskItem from './TaskItem';

interface TodayPlanProps {
  tasks: TodayTask[];
  onDrop: (e: React.DragEvent) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TodayPlan: React.FC<TodayPlanProps> = ({ tasks, onDrop, onToggleTask, onDeleteTask }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const today = new Date();
  const dateString = today.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`p-6 bg-slate-800/50 border border-slate-700 rounded-xl shadow-md transition-colors ${isDragOver ? 'border-blue-500 bg-slate-800' : 'border-slate-700'}`}
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-slate-200">Today's Plan</h2>
        <p className="text-slate-400">{dateString}</p>
      </div>
      
      {tasks.length > 0 ? (
        <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              subtext={task.subjectName}
              onToggle={() => onToggleTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-slate-600 rounded-lg">
          <p className="text-slate-500">Drag and drop tasks here to plan your day.</p>
        </div>
      )}
    </div>
  );
};

export default TodayPlan;
