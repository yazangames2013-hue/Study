import React, { useState, useEffect } from 'react';
import { Task } from './types';
import Header from './components/Header';
import TaskForm from './components/QuizGenerator'; // Re-using QuizGenerator as TaskForm
import TaskList from './components/QuizView'; // Re-using QuizView as TaskList

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Check if all tasks are complete
  const allTasksCompleted = tasks.length > 0 && tasks.every(task => task.completed);

  useEffect(() => {
    if (allTasksCompleted) {
      setPoints(prevPoints => prevPoints + 10);
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000); // Confetti effect for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [allTasksCompleted]);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleToggleTask = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleClearTasks = () => {
    setTasks([]);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header points={points} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            <TaskForm onAddTask={handleAddTask} isTaskListComplete={allTasksCompleted} />
            <TaskList
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onClearTasks={handleClearTasks}
              allTasksCompleted={allTasksCompleted}
              showConfetti={showConfetti}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-text-secondary text-sm">
        <p>أنجز مهامك واكسب النقاط!</p>
      </footer>
    </div>
  );
};

export default App;
