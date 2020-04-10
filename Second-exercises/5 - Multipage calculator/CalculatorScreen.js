import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CalculatorScreen({ navigation }) {
  const [state, setState] = useState({ a: 0, b: 0, result: 0 });
  const [history, setHistory] = useState([]);

  const handleCalculation = (operator) => {
    const { a, b } = state;
    let result = 0;
    switch (operator) {
      case '+':
        result = a + b;
        addHistory({ a, b, operator, result });
        break;
      case '-':
        result = a - b;
        addHistory({ a, b, operator, result });
        break;
      default:
        Alert.alert('Something went wrong');
    }
  };

  const addHistory = (calculation) => {
    const { a, b, operator, result } = calculation;
    setState({ ...state, result });
    setHistory([...history, `${a} ${operator} ${b} = ${result}`]);
  };

  return (
    <View style={styles.container}>
      <Text>Calculator</Text>
      <Text>Result: {state.result}</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.textInput}
        onChangeText={(value) => setState({ ...state, a: parseInt(value) })}
      />
      <TextInput
        keyboardType="numeric"
        style={styles.textInput}
        onChangeText={(value) => setState({ ...state, b: parseInt(value) })}
      />
      <View style={styles.buttonGroup}>
        <Button title="+" onPress={() => handleCalculation('+')} />
        <Button title="-" onPress={() => handleCalculation('-')} />
        <Button
          title="History"
          onPress={() => navigation.navigate('History', { history: history })}
        />
      </View>
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
    borderWidth: 1,
    borderColor: 'black',
    width: 150,
    marginTop: 20,
  },
  buttonGroup: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
