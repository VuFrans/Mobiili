import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [numbers, setNumbers] = useState({
    guessN: 0,
    secretN: Math.floor(Math.random() * 100) + 1,
  });
  const [text, setText] = useState('Guess a number between 1-100');
  const [counter, setCounter] = useState(0);
  const gN = numbers.guessN;
  const sN = numbers.secretN;

  const checkNumbers = () => {
    gN == sN
      ? setText(
          'You have guessed the number in ' + parseInt(counter) + ' guesses'
        )
      : gN > sN
      ? setText('Your guess ' + gN + ' is too high') + setCounter(counter + 1)
      : gN < sN
      ? setText('Your guess ' + gN + ' is too low') + setCounter(counter + 1)
      : console.log('test');
  };

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={{ width: 200, margin: 10, borderColor: 'gray', borderWidth: 1 }}
        keyboardType={'numeric'}
        onChangeText={(e) => setNumbers({ ...numbers, guessN: e })}
      />
      <Button title="MAKE GUESS" onPress={() => checkNumbers()} />
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
});
