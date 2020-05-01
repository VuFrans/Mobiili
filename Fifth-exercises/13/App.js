import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import {
  Input,
  Button,
  Header,
  Divider,
  ListItem,
} from 'react-native-elements';
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

  const renderItem = ({ item }) => {
    return (
      <ListItem
        style={{ width: 350 }}
        title={item.product}
        subtitle={item.amount}
        onPress={() => deleteItem(item.id)}
        rightSubtitle="Bought"
        bottomDivider
        chevron
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: 'Shopping List',
          style: { color: '#fff' },
        }}
      />
      <Divider style={{ margin: 10 }} />
      <Input
        placeholder="Product"
        label="Product"
        onChangeText={(product) => setState({ ...state, product: product })}
        value={state.product}
      />
      <Input
        placeholder="Amount"
        label="Amount"
        onChangeText={(amount) => setState({ ...state, amount: amount })}
        value={state.amount}
      />
      <Button
        title="Save"
        onPress={saveItem}
        type="solid"
        buttonStyle={{ width: 350 }}
        disabled={!state.product || !state.amount}
      />
      <Divider style={{ margin: 20, borderBottomWidth: 0.8, width: '100%' }} />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => renderItem(item)}
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
  },
});
