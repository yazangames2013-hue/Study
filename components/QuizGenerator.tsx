import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import LoaderIcon from './icons/LoaderIcon';

interface QuizGeneratorProps {
  studyText: string;
  setStudyText: (text: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  hasContent: boolean;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({
  studyText,
  setStudyText,
  onGenerate,
  isLoading,
  hasContent,
}) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-text-primary">ابدأ جلسة المذاكرة</h2>
      <p className="text-text-secondary mb-4">
        الصق المادة الدراسية أدناه. سيقوم الذكاء الاصطناعي بإنشاء ملخص، ومواضيع رئيسية، ونصائح للمذاكرة، واختبار تدريبي لتعزيز تعلمك.
      </p>
      <textarea
        className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 resize-none"
        placeholder="الصق النص هنا..."
        value={studyText}
        onChange={(e) => setStudyText(e.target.value)}
        disabled={isLoading || hasContent}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || hasContent || !studyText.trim()}
        className="mt-4 w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <LoaderIcon className="w-5 h-5 ml-2 animate-spin" />
            جاري الإنشاء...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 ml-2" />
            أنشئ مواد المذاكرة
          </>
        )}
      </button>
    </div>
  );
};

export default QuizGenerator;