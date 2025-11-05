import React, { useState, useCallback } from 'react';
import { StudyAids } from './types';
import { generateStudyAids } from './services/geminiService';
import Header from './components/Header';
import QuizGenerator from './components/QuizGenerator';
import QuizView from './components/QuizView';

const App: React.FC = () => {
  const [studyText, setStudyText] = useState<string>('');
  const [studyAids, setStudyAids] = useState<StudyAids | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStudyAids = useCallback(async () => {
    if (!studyText.trim()) {
      setError('الرجاء إدخال نص لإنشاء مواد المذاكرة.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setStudyAids(null);

    try {
      const generatedAids = await generateStudyAids(studyText);
      setStudyAids(generatedAids);
    } catch (err) {
      setError('فشل في إنشاء مواد المذاكرة. يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [studyText]);

  const handleReset = () => {
    setStudyAids(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <QuizGenerator
            studyText={studyText}
            setStudyText={setStudyText}
            onGenerate={handleGenerateStudyAids}
            isLoading={isLoading}
            hasContent={!!studyAids}
          />
          <QuizView
            studyAids={studyAids}
            isLoading={isLoading}
            error={error}
            onReset={handleReset}
          />
        </div>
      </main>
      <footer className="text-center p-4 text-text-secondary text-sm">
        <p>شريكك الدراسي المدعوم بالذكاء الاصطناعي</p>
      </footer>
    </div>
  );
};

export default App;