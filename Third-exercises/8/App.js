import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  Picker,
} from 'react-native';

export default function App() {
  const [state, setState] = useState({
    amount: '',
    selectedValue: 'AED',
    resultText: '',
  });
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch(
      'http://data.fixer.io/api/latest?access_key=86200ab233e412357a0d5b7dfb3a16f4'
    )
      .then((res) => res.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.error(err));
  }, []);

  const convertEuro = () => {
    let convertedToEuro = (rates[state.selectedValue] * state.amount).toFixed(
      2
    );
    setState({
      ...state,
      resultText: `${convertedToEuro} € ${state.selectedValue}`,
    });
  };

  const ratesArray = () => {
    return Object.keys(rates).map((rate) => {
      return <Picker.Item label={rate} value={rate} />;
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri:
            'https://cdn.iconscout.com/icon/free/png-512/dollar-to-euro-convert-1478339-1250748.png',
        }}
      />
      <Text style={styles.resultText}>{state.resultText}</Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textInput}
          value={state.amount}
          onChangeText={(e) => setState({ ...state, amount: e })}
        />
        <Picker
          selectedValue={state.selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) =>
            setState({ ...state, selectedValue: itemValue })
          }
        >
          {ratesArray()}
        </Picker>
      </View>
      <Button title="CONVERT" onPress={convertEuro} />
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
    fontSize: 30,
    width: 100,
    borderWidth: 1,
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    margin: 100,
  },
  img: {
    height: '30%',
    width: '60%',
  },
  picker: {
    height: 10,
    width: 80,
    bottom: 90,
    marginLeft: 30,
  },
  resultText: {
    fontSize: 40,
  },
});
