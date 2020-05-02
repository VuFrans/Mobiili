import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native-elements';

export default function MapScreen({ route, navigation }) {
  const { latitude, longitude, address } = route.params;

  const animateToAddress = () => {
    _mapView.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
      },
      1000
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        ref={(mapView) => {
          _mapView = mapView;
        }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={address}
        />
      </MapView>
      <View style={{ height: 60 }}>
        <Button
          style={styles.button}
          title="SHOW"
          onPress={() => animateToAddress()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 50,
    width: 300,
    borderBottomWidth: 1,
    marginLeft: 30,
  },
  button: {
    width: '100%',
  },
});
