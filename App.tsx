import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const TEST_PLACES = [
  {
    key: "Apple",
    title: "Apple",
    description: "Apple Headquarters",
    latLong: {
      latitude: 37.33284276037827,
      longitude: -122.02995793420534,
    },
  },
  {
    key: "Home Depot",
    title: "Home Depot",
    description: "The Home Depot Cupertino",
    latLong: {
      latitude: 37.31221079897845,
      longitude: -122.0338119166553,
    },
  },
  {
    key: "Cupertino Memorial Park",
    title: "Cupertino Memorial Park",
    description: "Cupertino Memorial Park",
    latLong: {
      latitude: 37.324732983387385,
      longitude: -122.04453396687283,
    },
  },
];

export default function App() {
  const [marker, setMarker] = useState({
    latitude: 37.33233141,
    longitude: -122.0312186,
  });
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMarker({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const onPressMarker = (i) => {
    setSelectedMarkerIndex(i);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.323,
          longitude: -122.032,
          latitudeDelta: 0.05,
          longitudeDelta: 0.008,
        }}
        showsUserLocation={true}
      >
        {TEST_PLACES.map((testPlace, i) => {
          return (
            <Marker
              coordinate={testPlace.latLong}
              title={testPlace.title}
              description={testPlace.description}
              key={`marker-${i}`}
              onPress={() => onPressMarker(i)}
              pinColor={selectedMarkerIndex === i ? "red" : "black"}
            />
          );
        })}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
