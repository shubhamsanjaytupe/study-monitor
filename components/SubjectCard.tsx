import React from 'react';
import { Subject, TaskCategory, Task } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import TaskList from './TaskList';

interface SubjectCardProps {
  subject: Subject;
  isExpanded: boolean;
  onToggleExpand: (subjectId: string) => void;
  onDeleteSubject: (subjectId: string) => void;
  onAddTask: (subjectId: string, category: TaskCategory, taskText: string) => void;
  onToggleTask: (subjectId: string, category: TaskCategory, taskId: string) => void;
  onDeleteTask: (subjectId: string, category: TaskCategory, taskId: string) => void;
  onTaskDragStart: (e: React.DragEvent, task: Task, subject: Subject, category: TaskCategory) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  isExpanded,
  onToggleExpand,
  onDeleteSubject,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onTaskDragStart,
}) => {
  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300">
      <div 
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={() => onToggleExpand(subject.id)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-blue-400">{subject.name}</h2>
          <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card from toggling when deleting
            onDeleteSubject(subject.id);
          }}
          className="text-slate-500 hover:text-red-500 transition-colors z-10"
          aria-label={`Delete ${subject.name} subject`}
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 pt-0 space-y-8 border-t border-slate-700/50">
           <div className="mt-6 space-y-8">
            <TaskList
              title={TaskCategory.WRITING}
              icon={<PencilIcon className="w-5 h-5" />}
              tasks={subject.tasks[TaskCategory.WRITING]}
              onAddTask={(taskText) => onAddTask(subject.id, TaskCategory.WRITING, taskText)}
              onToggleTask={(taskId) => onToggleTask(subject.id, TaskCategory.WRITING, taskId)}
              onDeleteTask={(taskId) => onDeleteTask(subject.id, TaskCategory.WRITING, taskId)}
              onTaskDragStart={(e, task) => onTaskDragStart(e, task, subject, TaskCategory.WRITING)}
            />
            <hr className="border-slate-700"/>
            <TaskList
              title={TaskCategory.LEARNING}
              icon={<BookOpenIcon className="w-5 h-5" />}
              tasks={subject.tasks[TaskCategory.LEARNING]}
              onAddTask={(taskText) => onAddTask(subject.id, TaskCategory.LEARNING, taskText)}
              onToggleTask={(taskId) => onToggleTask(subject.id, TaskCategory.LEARNING, taskId)}
              onDeleteTask={(taskId) => onDeleteTask(subject.id, TaskCategory.LEARNING, taskId)}
              onTaskDragStart={(e, task) => onTaskDragStart(e, task, subject, TaskCategory.LEARNING)}
            />
           </div>
        </div>
      )}
    </div>
  );
};

export default SubjectCard;
