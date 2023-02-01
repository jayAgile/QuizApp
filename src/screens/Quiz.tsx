import React, {FC, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Questions from '../components/Questions';
import {getQuestions, Question} from '../utils/api';
import Answers from '../components/Answers';
import {Icon} from 'react-native-elements';

export type AnswerObject = {
  questions: string;
  answer: string;
  correct: boolean;
  correctAnswer: boolean;
};

const Quiz: FC = props => {
  const [loader, setLoader] = useState(false);

  // array of object Declaration using generic type declaration
  const [question, setQuestion] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);

  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(0);
  const [totalQuestion] = useState(10);
  const [gameOver, setGameOver] = useState(true);
  const setCorrectAnswer = useRef(null);
  const [correctA, setCorrectA] = useState('');

  useEffect(() => {
    startQuiz();
  }, []);

  const startQuiz = async () => {
    setNumber(0);
    setLoader(true);
    setGameOver(false);
    const newQuestions = await getQuestions();
    console.log(newQuestions);
    setQuestion(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setLoader(false);
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ == totalQuestion) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  const checkAnswer = () => {
    if (!gameOver) {
      const answer = setCorrectAnswer.current;
      const correctA = question[number].correct_answer === answer;
      if (correctA) {
        console.log('score', score);
        setScore(prev => prev + 1);
      }
      const answerObject = {
        question: question[number].question,
        answer,
        correctA,
        correctAnswer: question[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    }
  };

  return (
    <View style={{flex: 1}}>
      {!loader ? (
        <View>
          <View style={styles.container}>
            <Text style={styles.textStyle}>Questions</Text>
            <Text style={styles.textStyle}>
              {number + 1}/{totalQuestion}
            </Text>
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={styles.textStyle}>Score:{score}</Text>
          </View>
          {question.length > 0 ? (
            <>
              <Questions
                QuestionNo={number + 1}
                Question={question[number].question}
              />
              <Answers
                answers={question[number].answers}
                {...{setCorrectAnswer, checkAnswer}}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
              />
            </>
          ) : null}
        </View>
      ) : (
        <ActivityIndicator
          style={{justifyContent: 'center', top: 200}}
          size={50}
          color="black"
        />
      )}
      <View>
        {!gameOver && !loader && number != totalQuestion - 1 ? (
          <TouchableOpacity onPress={() => nextQuestion()}>
            <Icon
              name="arrowright"
              size={40}
              color="black"
              type="antdesign"
              style={{left: 130, margin: 20}}
            />
          </TouchableOpacity>
        ) : number == totalQuestion - 1 ? (
          <TouchableOpacity onPress={() => startQuiz()}>
            <Icon
              name="controller-play"
              size={40}
              color="black"
              type="entypo"
              style={{left: 130, margin: 20}}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    backgroundColor: 'white',
  },
  textStyle: {padding: 15, fontSize: 15, color: 'black'},
  bottomview: {
    padding: 13,
    backgroundColor: 'blue',
    borderRadius: 300,
    width: 70,
    height: 70,
    position: 'absolute',
    right: 20,
    top: 550,
  },
  questioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    paddingRight: 16,
  },
  iconstyle: {
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 70,
    height: 70,
    margin: 5,
    top: 100,
    left: 260,
  },
});

export default Quiz;
