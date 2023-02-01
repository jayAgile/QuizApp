import axios from 'axios';

// randomize the array
export const _ = (array: any[]) => [...array].sort(() => Math.random() - 0.7);

// object declaration
export type Question = {
  category: string;
  incorrect_answers: string[];
  correct_answer: string[];
  answers: string[];
  difficulty: string;
  question: string;
  type: string;
};

export const getQuestions = async () => {
  const endPoint = 'https://opentdb.com/api.php?amount=10&category=9';
  const promise = await axios.get(endPoint);
  console.log(_);
  return promise.data.results?.map((question: Question) => ({
    ...question,
    answers: _([...question.incorrect_answers, question.correct_answer]),
  }));
};
