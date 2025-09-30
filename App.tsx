import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import Header from './components/Header';
import SubjectCard from './components/SubjectCard';
import TodayPlan from './components/TodayPlan';
import { Subject, TaskCategory, Task, TodayTask } from './types';

const App: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    try {
      const saved = localStorage.getItem('studyMonitorSubjects');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Could not load subjects", error);
      return [];
    }
  });

  const [todayTasks, setTodayTasks] = useState<TodayTask[]>(() => {
    try {
      const saved = localStorage.getItem('studyMonitorTodayTasks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Could not load today's tasks", error);
      return [];
    }
  });

  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    localStorage.setItem('studyMonitorSubjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('studyMonitorTodayTasks', JSON.stringify(todayTasks));
  }, [todayTasks]);

  const addSubject = (name: string) => {
    const newSubject: Subject = {
      id: crypto.randomUUID(),
      name,
      tasks: { [TaskCategory.WRITING]: [], [TaskCategory.LEARNING]: [] },
    };
    setSubjects((prev) => [...prev, newSubject]);
  };

  const deleteSubject = (subjectId: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== subjectId));
  };
  
  const toggleExpandSubject = (subjectId: string) => {
    setExpandedSubjects(prev => {
        const newSet = new Set(prev);
        if (newSet.has(subjectId)) {
            newSet.delete(subjectId);
        } else {
            newSet.add(subjectId);
        }
        return newSet;
    });
  };

  const addTask = (subjectId: string, category: TaskCategory, taskText: string) => {
    const newTask = { id: crypto.randomUUID(), text: taskText, completed: false };
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === subjectId ? { ...s, tasks: { ...s.tasks, [category]: [...s.tasks[category], newTask] } } : s
      )
    );
  };

  const toggleTask = (subjectId: string, category: TaskCategory, taskId: string) => {
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === subjectId
          ? { ...s, tasks: { ...s.tasks, [category]: s.tasks[category].map((t) => t.id === taskId ? { ...t, completed: !t.completed } : t) } }
          : s
      )
    );
  };

  const deleteTask = (subjectId: string, category: TaskCategory, taskId: string) => {
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === subjectId ? { ...s, tasks: { ...s.tasks, [category]: s.tasks[category].filter((t) => t.id !== taskId) } } : s
      )
    );
  };

  // Drag and Drop Handlers
  const handleTaskDragStart = (e: React.DragEvent, task: Task, subject: Subject, category: TaskCategory) => {
    const todayTask: TodayTask = { ...task, subjectId: subject.id, subjectName: subject.name, category };
    e.dataTransfer.setData('application/json', JSON.stringify(todayTask));
  };

  const handleDropOnToday = (e: React.DragEvent) => {
    const taskData = e.dataTransfer.getData('application/json');
    if (taskData) {
      const droppedTask: TodayTask = JSON.parse(taskData);
      // Prevent duplicates
      if (!todayTasks.some(t => t.id === droppedTask.id)) {
        setTodayTasks(prev => [...prev, droppedTask]);
      }
    }
  };

  const toggleTodayTask = (taskId: string) => {
    let subjectId: string, category: TaskCategory;
    // Toggle in today's list
    setTodayTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        subjectId = t.subjectId;
        category = t.category;
        return { ...t, completed: !t.completed };
      }
      return t;
    }));

    // Sync with subjects list
    if (subjectId && category) {
      toggleTask(subjectId, category, taskId);
    }
  };
  
  const deleteTodayTask = (taskId: string) => {
    setTodayTasks(prev => prev.filter(t => t.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <Header />

        <div className="max-w-4xl mx-auto">
          <TodayPlan 
            tasks={todayTasks}
            onDrop={handleDropOnToday}
            onToggleTask={toggleTodayTask}
            onDeleteTask={deleteTodayTask}
          />
        </div>

        <div className="max-w-2xl mx-auto p-6 bg-slate-800/50 border border-slate-700 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-slate-200">Add a New Subject</h2>
          <AddTaskForm placeholder="e.g., Mathematics, History..." buttonText="Add Subject" onSubmit={addSubject} />
        </div>

        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                isExpanded={expandedSubjects.has(subject.id)}
                onToggleExpand={toggleExpandSubject}
                onDeleteSubject={deleteSubject}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onTaskDragStart={handleTaskDragStart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-slate-800/50 border border-dashed border-slate-700 rounded-xl">
            <h3 className="text-2xl font-semibold text-slate-300">Your study dashboard is empty.</h3>
            <p className="text-slate-400 mt-2">Start by adding a subject above to begin tracking your work.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
