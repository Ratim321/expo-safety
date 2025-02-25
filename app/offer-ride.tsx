import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Users, Clock, Coins, Car, AlertCircle } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';

export default function OfferRideScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: new Date(),
    time: new Date(),
    seats: '3',
    price: '',
    vehicleType: 'CNG',
    description: '',
  });

  const [showSafetyTips, setShowSafetyTips] = useState(false);

  const handleSubmit = () => {
    // Here you would typically validate and submit the form
    router.push('/ride-confirmation');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Offer a Ride</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 23.8151,
            longitude: 90.4255,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: 23.8151,
              longitude: 90.4255,
            }}
            title="Current Location"
          />
        </MapView>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <MapPin size={20} color="#34C759" />
          <TextInput
            style={styles.input}
            placeholder="Pickup Location"
            value={formData.from}
            onChangeText={(text) => setFormData({ ...formData, from: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <MapPin size={20} color="#FF3B30" />
          <TextInput
            style={styles.input}
            placeholder="Destination"
            value={formData.to}
            onChangeText={(text) => setFormData({ ...formData, to: text })}
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.vehicleOption, formData.vehicleType === 'CNG' && styles.selectedVehicle]}
            onPress={() => setFormData({ ...formData, vehicleType: 'CNG' })}>
            <Car size={24} color={formData.vehicleType === 'CNG' ? '#FFFFFF' : '#007AFF'} />
            <Text
              style={[
                styles.vehicleText,
                formData.vehicleType === 'CNG' && styles.selectedVehicleText,
              ]}>
              CNG Auto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.vehicleOption, formData.vehicleType === 'Car' && styles.selectedVehicle]}
            onPress={() => setFormData({ ...formData, vehicleType: 'Car' })}>
            <Car size={24} color={formData.vehicleType === 'Car' ? '#FFFFFF' : '#007AFF'} />
            <Text
              style={[
                styles.vehicleText,
                formData.vehicleType === 'Car' && styles.selectedVehicleText,
              ]}>
              Car
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Users size={20} color="#007AFF" />
            <TextInput
              style={styles.input}
              placeholder="Available Seats"
              value={formData.seats}
              onChangeText={(text) => setFormData({ ...formData, seats: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Coins size={20} color="#007AFF" />
            <TextInput
              style={styles.input}
              placeholder="Price per Seat (BDT)"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.safetyTipsButton}
          onPress={() => setShowSafetyTips(!showSafetyTips)}>
          <AlertCircle size={20} color="#007AFF" />
          <Text style={styles.safetyTipsText}>Safety Tips for Drivers</Text>
        </TouchableOpacity>

        {showSafetyTips && (
          <View style={styles.safetyTipsContainer}>
            <Text style={styles.safetyTip}>• Verify rider's identity before starting</Text>
            <Text style={styles.safetyTip}>• Share your live location with emergency contacts</Text>
            <Text style={styles.safetyTip}>• Keep emergency numbers handy</Text>
            <Text style={styles.safetyTip}>• Follow traffic rules and speed limits</Text>
          </View>
        )}

        <TextInput
          style={styles.descriptionInput}
          placeholder="Additional Notes (Optional)"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Offer Ride</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  mapContainer: {
    height: 200,
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  vehicleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedVehicle: {
    backgroundColor: '#007AFF',
  },
  vehicleText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  selectedVehicleText: {
    color: '#FFFFFF',
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  safetyTipsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  safetyTipsText: {
    marginLeft: 10,
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  safetyTipsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  safetyTip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});