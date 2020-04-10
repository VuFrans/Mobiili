import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function HistoryScreen({ route, navigation }) {
  const { history } = route.params;
  return (
    <View style={styles.container}>
      <Text>History</Text>
      <FlatList
        data={history}
        renderItem={(item) => <Text>{item.item}</Text>}
        keyExtractor={(item, index) => index.toString()}
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
