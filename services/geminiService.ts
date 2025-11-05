import { GoogleGenAI, Type } from '@google/genai';
import { StudyAids } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const studyAidsSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'ملخص موجز للنص المقدم، يلخص النقاط الرئيسية.'
    },
    quiz: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'عنوان إبداعي وملائم للاختبار بناءً على النص.',
        },
        questions: {
          type: Type.ARRAY,
          description: 'مصفوفة من 5 أسئلة متعددة الخيارات.',
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: 'نص السؤال.' },
              options: {
                type: Type.ARRAY,
                description: 'مصفوفة من 4 إجابات محتملة بالضبط.',
                items: { type: Type.STRING },
              },
              correctAnswerIndex: { type: Type.INTEGER, description: 'فهرس الإجابة الصحيحة الذي يبدأ من 0.' },
            },
            required: ['question', 'options', 'correctAnswerIndex'],
          },
        },
      },
      required: ['title', 'questions'],
    },
    keyTopics: {
      type: Type.ARRAY,
      description: 'قائمة بأهم 3-5 كلمات رئيسية أو مواضيع من النص.',
      items: { type: Type.STRING }
    },
    studyTips: {
      type: Type.ARRAY,
      description: 'قائمة من 3-5 نصائح دراسية عملية أو إرشادات بناءً على محتوى النص.',
      items: { type: Type.STRING }
    }
  },
  required: ['summary', 'quiz', 'keyTopics', 'studyTips']
};


export const generateStudyAids = async (text: string): Promise<StudyAids> => {
  const prompt = `بناءً على النص التالي، تصرف كمساعد تعليمي خبير. قم بإنشاء مجموعة شاملة من مواد المذاكرة بصيغة JSON المحددة. يجب أن تتضمن هذه المجموعة:
1. ملخص موجز.
2. اختبار من 5 أسئلة متعددة الخيارات مع 4 خيارات لكل سؤال.
3. قائمة بالمواضيع الرئيسية.
4. قائمة بنصائح عملية للمذاكرة.
يجب أن يكون كل المحتوى الناتج باللغة العربية.

النص:
---
${text}
---`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: studyAidsSchema,
      },
    });

    const jsonString = response.text.trim();
    const studyAidsData: StudyAids = JSON.parse(jsonString);

    // Basic validation
    if (!studyAidsData.summary || !studyAidsData.quiz || !studyAidsData.keyTopics || !studyAidsData.studyTips) {
      throw new Error("تم استلام تنسيق غير صالح لمواد المذاكرة من الواجهة البرمجية.");
    }
    
    return studyAidsData;
  } catch (error) {
    console.error("Error generating study aids with Gemini API:", error);
    throw new Error("فشل في تحليل بيانات مواد المذاكرة من الذكاء الاصطناعي. قد يكون التنسيق غير صحيح.");
  }
};