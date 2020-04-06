import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [state, setState] = useState();
  const [list, setList] = useState([]);

  const addList = () => {
    setList([...list, state]);
  };

  return (
    <View style={styles.container}>
      <View style={{ top: 150, position: 'absolute' }}>
        <TextInput
          style={styles.inputField}
          onChangeText={(value) => setState(value)}
        />
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={() => addList()}>
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert('List cleared');
            setList([]);
          }}
        >
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <Text style={{ color: '#B2D8ED', fontSize: 20 }}>Shopping List</Text>
        <FlatList
          data={list}
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
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#6CA0D1',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#F6FCFC',
    width: 150,
    marginTop: 20,
    backgroundColor: '#F6FCFC',
  },
  buttonGroup: {
    position: 'absolute',
    top: 200,
    flexDirection: 'row',
  },
  button: {
    margin: 10,
    height: 30,
    width: 80,
    backgroundColor: '#B2D8ED',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#B2D8ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: 250,
  },
});
