import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [state, setState] = useState({
    latitude: 60.201373,
    longitude: 24.934041,
    address: '',
  });

  const url =
    'http://www.mapquestapi.com/geocoding/v1/address?key=kOgzEGgYgCGegPVKNiZjrEFBjIJ5cLnT';

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: `${state.address}, finland`,
      options: { thumbMaps: false },
    }),
  };

  const fetchLocation = async () => {
    if (!state.address) {
      animateToAddress();
    } else {
      await fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) =>
          setState({
            ...state,
            latitude: data.results[0].locations[0].latLng.lat,
            longitude: data.results[0].locations[0].latLng.lng,
          })
        )
        .catch((err) => console.error(err));
    }
  };

  const moveCamera = () => {
    console.log(state);
    fetchLocation();
  };

  const animateToAddress = () => {
    _mapView.animateToRegion(
      {
        latitude: state.latitude,
        longitude: state.longitude,
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
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        <Marker
          coordinate={{
            latitude: 60.201373,
            longitude: 24.934041,
          }}
          title="Haaga-Helia"
        />
      </MapView>
      <View style={{ height: 120 }}>
        <TextInput
          style={styles.textInput}
          onChangeText={(e) => setState({ ...state, address: e })}
        />
        <Button
          style={styles.button}
          title="SHOW"
          onPress={() => fetchLocation()}
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
    height: 50,
    width: 50,
  },
});
