import React, { useState } from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface TaskFormProps {
  onAddTask: (text: string) => void;
  isTaskListComplete: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, isTaskListComplete }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  };

  if (isTaskListComplete) {
      return null; // Don't show the form when list is complete, user must start a new list
  }

  return (
    <div className="bg-card p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-text-primary">إضافة مهمة جديدة</h2>
      <p className="text-text-secondary mb-4">
        اكتب مهمتك الجديدة في الأسفل واضغط على زر الإضافة لتبدأ رحلة إنجازك.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-grow w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
          placeholder="مثال: مراجعة الفصل الأول..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button
          type="submit"
          disabled={!taskText.trim()}
          className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        >
          <SparklesIcon className="w-5 h-5 ml-2" />
          إضافة
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
