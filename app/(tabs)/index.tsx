import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { Shield, AlertTriangle } from 'lucide-react-native';

export default function RidesScreen() {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>{errorMsg || 'Loading map...'}</Text>
        </View>
      )}

      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/book-ride')}>
          <Text style={styles.buttonText}>Book a Ride</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.offerButton]}
          onPress={() => router.push('/offer-ride')}>
          <Text style={styles.buttonText}>Offer a Ride</Text>
        </TouchableOpacity>

        <View style={styles.safetyContainer}>
          <View style={styles.safetyIndicator}>
            <Shield size={20} color="#4CAF50" />
            <Text style={styles.safetyText}>Area Safety: High</Text>
          </View>

          <View style={styles.warningIndicator}>
            <AlertTriangle size={20} color="#FFA000" />
            <Text style={styles.warningText}>Heavy traffic on Airport Road</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  offerButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  safetyContainer: {
    marginTop: 10,
  },
  safetyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  safetyText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4CAF50',
  },
  warningIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#FFA000',
  },
});