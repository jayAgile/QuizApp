import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Buttons from './Buttons';
import {AnswerObject} from '../screens/Quiz';

interface Answers {
  userAnswer: AnswerObject | undefined;
  answers: string[];
  setCorrectAnswer: any;
  checkAnswer: () => void;
}

const Answers: FC<Answers> = props => {
  return (
    <SafeAreaView>
      <View style={styles.answerContainer}>
        {/* list of answers below questions */}
        {props.answers?.map((answer, key) => {
          return (
            <View key={answer}>
              <Buttons
                {...{key, answer}}
                correct={props.userAnswer?.correctAnswer === answer}
                disabled={props.userAnswer ? true : false}
                onPress={() => {
                  (props.setCorrectAnswer.current = answer),
                    props.checkAnswer();
                }}
              />
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  answerContainer: {marginTop: 10, paddingHorizontal: 20},
});

export default Answers;
