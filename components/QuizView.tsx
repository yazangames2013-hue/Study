import React, { useState, useMemo } from 'react';
import { StudyAids, Question } from '../types';
import LoaderIcon from './icons/LoaderIcon';

// Icon components defined locally for simplicity
const BookOpenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const QuestionMarkCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="10"/>
  </svg>
);
const KeyIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
  </svg>
);
const LightBulbIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7.5a6 6 0 0 0-12 0c0 1.5.3 2.7 1.5 3.5.7.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
    </svg>
);


interface StudyAidsViewProps {
  studyAids: StudyAids | null;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
}

type Tab = 'summary' | 'quiz' | 'topics' | 'tips';

const StudyAidsView: React.FC<StudyAidsViewProps> = ({ studyAids, isLoading, error, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map());
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleResetQuiz = () => {
    setUserAnswers(new Map());
    setSubmitted(false);
  };
  
  const handleStartNewSession = () => {
    handleResetQuiz();
    onReset();
    setActiveTab('summary');
  };

  const score = useMemo(() => {
    if (!studyAids?.quiz || !submitted) return 0;
    return studyAids.quiz.questions.reduce((total, question, index) => {
      return userAnswers.get(index) === question.correctAnswerIndex ? total + 1 : total;
    }, 0);
  }, [studyAids, submitted, userAnswers]);

  if (isLoading) {
    return (
      <div className="bg-card p-6 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[400px]">
        <LoaderIcon className="w-12 h-12 text-primary animate-spin-slow" />
        <p className="mt-4 text-lg text-text-secondary font-semibold">الذكاء الاصطناعي يعد دليلك الدراسي...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center min-h-[400px] animate-fade-in">
        <p className="text-red-500 font-semibold">{error}</p>
        <button onClick={onReset} className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover">
            حاول مرة أخرى
        </button>
      </div>
    );
  }

  if (!studyAids) {
    return (
      <div className="bg-card p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center min-h-[400px] border-2 border-dashed">
        <p className="text-lg text-text-secondary">دليلك الدراسي الشخصي سيظهر هنا!</p>
      </div>
    );
  }

  const tabs: { id: Tab; name: string; icon: React.FC<any> }[] = [
    { id: 'summary', name: 'ملخص', icon: BookOpenIcon },
    { id: 'quiz', name: 'اختبار', icon: QuestionMarkCircleIcon },
    { id: 'topics', name: 'مواضيع رئيسية', icon: KeyIcon },
    { id: 'tips', name: 'نصائح للمذاكرة', icon: LightBulbIcon },
  ];

  return (
    <div className="bg-card rounded-xl shadow-lg animate-slide-in">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px p-2 space-x-2" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 group inline-flex items-center justify-center py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 rounded-lg
                ${activeTab === tab.id
                  ? 'border-primary text-primary bg-indigo-50'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-gray-100'
                }`
              }
            >
              <tab.icon className="ml-2 h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'summary' && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-text-primary mb-3">الملخص</h3>
            <p className="text-text-secondary whitespace-pre-line leading-relaxed">{studyAids.summary}</p>
          </div>
        )}
        {activeTab === 'quiz' && <QuizContent quiz={studyAids.quiz} userAnswers={userAnswers} setUserAnswers={setUserAnswers} submitted={submitted} setSubmitted={setSubmitted} score={score} onStartNewSession={handleStartNewSession} />}
        {activeTab === 'topics' && <ListContent title="المواضيع الرئيسية" items={studyAids.keyTopics} icon={KeyIcon} />}
        {activeTab === 'tips' && <ListContent title="نصائح للمذاكرة" items={studyAids.studyTips} icon={LightBulbIcon} />}
      </div>
    </div>
  );
};


const QuizContent = ({ quiz, userAnswers, setUserAnswers, submitted, setSubmitted, score, onStartNewSession }) => {
    const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
        setUserAnswers(new Map(userAnswers.set(questionIndex, optionIndex)));
    };

    const getOptionClassName = (question: Question, questionIndex: number, optionIndex: number) => {
        if (!submitted) return 'border-gray-300 hover:border-primary hover:bg-indigo-50';
        const isCorrect = optionIndex === question.correctAnswerIndex;
        const isSelected = userAnswers.get(questionIndex) === optionIndex;
        if (isCorrect) return 'bg-green-100 border-green-500 ring-2 ring-green-500';
        if (isSelected && !isCorrect) return 'bg-red-100 border-red-500';
        return 'border-gray-300';
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-1 text-center text-primary">{quiz.title}</h2>
            <p className="text-center text-text-secondary mb-6">اختبر معلوماتك!</p>
            {quiz.questions.map((q, qIndex) => (
                <div key={qIndex} className="mb-6">
                    <p className="font-semibold text-text-primary mb-3">{qIndex + 1}. {q.question}</p>
                    <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                            <label key={oIndex} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${getOptionClassName(q, qIndex, oIndex)}`}>
                                <input type="radio" name={`question-${qIndex}`} className="h-4 w-4 text-primary focus:ring-primary border-gray-300" onChange={() => handleAnswerChange(qIndex, oIndex)} checked={userAnswers.get(qIndex) === oIndex} disabled={submitted}/>
                                <span className="mr-3 text-text-primary">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            {!submitted ? (
                <button onClick={() => setSubmitted(true)} disabled={userAnswers.size !== quiz.questions.length} className="w-full bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    إرسال الإجابات
                </button>
            ) : (
                <div className="text-center p-4 bg-indigo-50 rounded-lg animate-fade-in">
                    <h3 className="text-xl font-bold text-text-primary">اكتمل الاختبار!</h3>
                    <p className="text-2xl font-bold text-primary my-2">لقد حصلت على {score} من {quiz.questions.length}</p>
                    <button onClick={onStartNewSession} className="mt-2 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all">
                        ابدأ جلسة جديدة
                    </button>
                </div>
            )}
        </div>
    )
}

const ListContent = ({ title, items, icon: Icon }) => (
    <div className="animate-fade-in">
        <h3 className="text-xl font-bold text-text-primary mb-4">{title}</h3>
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <Icon className="h-5 w-5 text-primary ml-3 mt-1 flex-shrink-0" />
                    <span className="text-text-secondary">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);


export default StudyAidsView;