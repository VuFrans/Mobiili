import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native';

export default function App() {
  const [state, setState] = useState({
    guessNumber: '',
    secretNumber: Math.floor(Math.random() * 100) + 1,
    counter: 0,
    title: 'Guess a number between 1-100',
  });

  useEffect(() => {
    newGame();
  }, []);

  const initialState = {
    guessNumber: '',
    secretNumber: Math.floor(Math.random() * 100) + 1,
    counter: 0,
    title: 'Guess a number between 1-100',
  };

  const guessNumber = state.guessNumber;
  const secretNumber = state.secretNumber;

  const checkNumbers = () => {
    if (guessNumber == secretNumber) {
      correctNumber();
    } else if (guessNumber > secretNumber) {
      setState({
        ...state,
        counter: state.counter + 1,
        title: `Your guess ${guessNumber} is too high`,
      });
    } else if (guessNumber < secretNumber) {
      setState({
        ...state,
        counter: state.counter + 1,
        title: `Your guess ${guessNumber} is too low`,
      });
    }
  };

  const correctNumber = () => {
    Alert.alert(`You have guessed the number in ${state.counter + 1} guesses`);
    if (state.counter < state.highscore || !state.highscore) {
      setData(state.counter + 1);
    }
    newGame();
  };

  const newGame = () => {
    getData();
  };

  const getData = async () => {
    try {
      let highscore = await AsyncStorage.getItem('guessing-game-highscore');
      setState({ ...initialState, highscore: JSON.parse(highscore) });
    } catch (err) {
      console.error('Error reading data!');
    }
  };

  const setData = async (counter) => {
    try {
      await AsyncStorage.setItem(
        'guessing-game-highscore',
        JSON.stringify(counter)
      );
    } catch (err) {
      console.error('Error setting data!');
    }
  };

  return (
    <View style={styles.container}>
      <Text>{state.title}</Text>
      <Text>Guess: {state.guessNumber}</Text>
      <Text>Correct: {state.secretNumber}</Text>
      <TextInput
        style={styles.textInput}
        keyboardType={'numeric'}
        onChangeText={(e) => setState({ ...state, guessNumber: e })}
      />
      <Button title="MAKE GUESS" onPress={() => checkNumbers()} />
      <Text>
        Highscore: {state.highscore ? state.highscore : 'No highscore yet'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 200,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
