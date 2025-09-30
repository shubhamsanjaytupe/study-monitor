import React from 'react';
import { Task } from '../types';
import AddTaskForm from './AddTaskForm';
import TaskItem from './TaskItem';

interface TaskListProps {
  title: string;
  icon: React.ReactNode;
  tasks: Task[];
  onAddTask: (taskText: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onTaskDragStart: (e: React.DragEvent, task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ title, icon, tasks, onAddTask, onToggleTask, onDeleteTask, onTaskDragStart }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-300">
        {icon}
        {title}
      </h3>
      <div className="pl-2">
        <AddTaskForm
          placeholder={`Add ${title.toLowerCase()}...`}
          buttonText="Add"
          onSubmit={onAddTask}
        />
      </div>
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggleTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
              onDragStart={(e) => onTaskDragStart(e, task)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-center py-4 italic">No tasks yet. Add one above!</p>
      )}
    </div>
  );
};

export default TaskList;
