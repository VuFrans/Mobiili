import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {
  const [state, setState] = useState({
    product: '',
    amount: '',
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists shoppinglist (id integer primary key not null, product text, amount text);'
      );
      updateList();
    });
  }, []);

  // Save product
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'insert into shoppinglist (product, amount) values (?,?);',
          [state.product, state.amount]
        );
      },
      null,
      updateList
    );
  };

  // Update shopping list
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
        setList(rows._array)
      );
    });
  };

  // Delete product by ID
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql('delete from shoppinglist where id = ?;', [id]);
      },
      null,
      updateList
    );
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: '80%',
          backgroundColor: '#fff',
          marginLeft: '10%',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product"
        style={styles.textInput}
        onChangeText={(product) => setState({ ...state, product: product })}
        value={state.product}
      />
      <TextInput
        placeholder="Amount"
        style={styles.textInput}
        onChangeText={(amount) => setState({ ...state, amount: amount })}
        value={state.amount}
      />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30, fontSize: 20 }}>Shopping List</Text>
      <FlatList
        style={{ marginTop: 5 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={{ fontSize: 18 }}>
              {item.product}, {item.amount}
            </Text>
            <Text
              style={{ fontSize: 18, color: '#0000ff', paddingLeft: 10 }}
              onPress={() => deleteItem(item.id)}
            >
              Bought
            </Text>
          </View>
        )}
        data={list}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 200,
  },
  textInput: {
    marginTop: 30,
    fontSize: 18,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
  listContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
