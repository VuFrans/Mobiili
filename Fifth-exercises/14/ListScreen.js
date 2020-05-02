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
import Icon from 'react-native-vector-icons/FontAwesome';

const db = SQLite.openDatabase('addressdb.db');

const url =
  'http://www.mapquestapi.com/geocoding/v1/address?key=kOgzEGgYgCGegPVKNiZjrEFBjIJ5cLnT';

export default function ListScreen({ navigation }) {
  const [state, setState] = useState({
    address: '',
    latitude: '',
    longitude: '',
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists addresslist (id integer primary key not null, address text);'
      );
      updateList();
    });
  }, []);

  // Save product
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql('insert into addresslist (address) values (?);', [
          state.address,
        ]);
      },
      null,
      updateList
    );
  };

  // Update shopping list
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from addresslist;', [], (_, { rows }) =>
        setList(rows._array)
      );
    });
  };

  // Delete product by ID
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql('delete from addresslist where id = ?;', [id]);
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

  const getLocation = async (address) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: `${address}, finland`,
        options: { thumbMaps: false },
      }),
    };

    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) =>
        setState({
          ...state,
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng,
        })
      )
      .then(() => console.log(state + '1'))
      .catch((err) => console.error(err));

    console.log(state + '2');

    await navigation.navigate('Map', {
      latitude: state.latitude,
      longitude: state.longitude,
      address: address,
    });
    console.log(state + '3');
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem
        style={{ width: 350 }}
        title={item.address}
        onPress={() => getLocation(item.address)}
        onLongPress={() => deleteItem(item.id)}
        rightSubtitle="Show on map"
        bottomDivider
        chevron
      />
    );
  };

  return (
    <View style={styles.container}>
      <Divider style={{ margin: 10 }} />
      <Input
        placeholder="Type in address"
        label="Address"
        onChangeText={(address) => setState({ ...state, address: address })}
        value={state.address}
      />
      <Button
        icon={
          <Icon name="save" size={15} color="#ffffff" style={{ margin: 10 }} />
        }
        title="Save"
        onPress={saveItem}
        type="solid"
        buttonStyle={{ width: 350 }}
        disabled={!state.address}
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
