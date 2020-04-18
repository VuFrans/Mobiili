import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Image,
} from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipies, setRecipies] = useState([]);

  const getRecipies = () => {
    const url = `http://www.recipepuppy.com/api/?i=${ingredient}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipies(data.results);
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '80%',
          backgroundColor: '#CED0CE',
          marginLeft: '10%',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginLeft: '5%' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <Text>{item.title}</Text>
            <Image
              style={styles.recipeImage}
              source={{
                uri: item.thumbnail,
              }}
            />
          </>
        )}
        ItemSeparatorComponent={listSeparator}
        data={recipies}
      />
      <View style={styles.group}>
        <TextInput
          style={{ fontSize: 18, width: 200, borderWidth: 1 }}
          value={ingredient}
          placeholder="Ingredient"
          onChangeText={(ingredient) => setIngredient(ingredient)}
        />
        <Button title="Find" onPress={getRecipies} />
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
    marginTop: 60,
  },
  group: {
    paddingBottom: 50,
  },
  recipeImage: {
    height: 80,
    width: 80,
  },
});
