import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onClearTasks: () => void;
  allTasksCompleted: boolean;
  showConfetti: boolean;
}

// Confetti Component for celebration
const Confetti = () => (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-20">
        {[...Array(100)].map((_, i) => (
            <div
                key={i}
                className="confetti-piece"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${0.5 + Math.random() * 1}s`,
                    animationDelay: `${Math.random() * 2}s`,
                    backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 4)]
                }}
            />
        ))}
    </div>
);


const TaskListView: React.FC<TaskListProps> = ({ tasks, onToggleTask, onClearTasks, allTasksCompleted, showConfetti }) => {
  if (tasks.length === 0 && !allTasksCompleted) {
    return (
      <div className="bg-card p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center min-h-[200px] border-2 border-dashed">
        <p className="text-lg text-text-secondary">لا توجد مهام حتى الآن. أضف مهمة للبدء!</p>
      </div>
    );
  }
  
  return (
    <div className="bg-card rounded-xl shadow-lg p-6 animate-slide-in relative">
      {showConfetti && <Confetti />}
      <h2 className="text-xl font-bold text-text-primary mb-4">قائمة مهامك</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <label
            key={task.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
              task.completed
                ? 'bg-green-50 border-green-300'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              onChange={() => onToggleTask(task.id)}
              checked={task.completed}
              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span
              className={`mr-4 text-lg ${
                task.completed ? 'line-through text-gray-500' : 'text-text-primary'
              }`}
            >
              {task.text}
            </span>
          </label>
        ))}
      </div>
      
      {allTasksCompleted && (
        <div className="text-center p-6 mt-6 bg-indigo-50 rounded-lg animate-fade-in border-t-4 border-primary">
          <h3 className="text-2xl font-bold text-text-primary">✨ رائع! لقد أنجزت كل شيء! ✨</h3>
          <p className="text-xl font-semibold text-primary my-2">لقد حصلت على 10 نقاط!</p>
          <button
            onClick={onClearTasks}
            className="mt-4 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105"
          >
            البدء بقائمة جديدة
          </button>
        </div>
      )}
    </div>
  );
};


export default TaskListView;
