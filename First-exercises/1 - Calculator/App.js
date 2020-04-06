import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [userInput, setUserInput] = useState({
    inputA: 0,
    inputB: 0,
    totalPlus: 0,
  });

  const iA = parseFloat(userInput.inputA);
  const iB = parseFloat(userInput.inputB);

  return (
    <View style={styles.container}>
      <Text>Result:{userInput.totalPlus ? iA + iB : iA - iB}</Text>
      <TextInput
        style={{ width: 200, margin: 10, borderColor: 'gray', borderWidth: 1 }}
        keyboardType={'numeric'}
        onChangeText={(e) => setUserInput({ ...userInput, inputA: e })}
      />
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        keyboardType={'numeric'}
        onChangeText={(e) => setUserInput({ ...userInput, inputB: e })}
      />
      <View style={{ flexDirection: 'row' }}>
        <Button
          title="+"
          onPress={() => setUserInput({ ...userInput, totalPlus: true })}
        />
        <Button
          title="-"
          onPress={() => setUserInput({ ...userInput, totalPlus: false })}
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
});
