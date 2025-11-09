export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// Fix: Add missing StudyAids type and related interfaces.
export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  title: string;
  questions: Question[];
}

export interface StudyAids {
  summary: string;
  quiz: Quiz;
  keyTopics: string[];
  studyTips: string[];
}
