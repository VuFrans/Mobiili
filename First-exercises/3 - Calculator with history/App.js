import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';

export default function App() {
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
      <Text>Result: {state.result}</Text>
      <TextInput
        keyboardType="numeric"
        style={{
          borderBottomWidth: 1,
          borderColor: 'black',
          width: 150,
          marginTop: 20,
        }}
        onChangeText={(value) => setState({ ...state, a: parseInt(value) })}
      />
      <TextInput
        keyboardType="numeric"
        style={{
          borderBottomWidth: 1,
          borderColor: 'black',
          width: 150,
          marginTop: 20,
        }}
        onChangeText={(value) => setState({ ...state, b: parseInt(value) })}
      />
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Button title="+" onPress={() => handleCalculation('+')} />
        <Button title="-" onPress={() => handleCalculation('-')} />
      </View>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <Text>History</Text>
        <FlatList
          data={history}
          renderItem={(item) => <Text>{item.item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
