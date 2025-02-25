import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Users, Clock, Coins, CircleUser as UserCircle2, Car, Filter } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';

export default function BookRideScreen() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [seats, setSeats] = useState('1');
  const [genderPreference, setGenderPreference] = useState('any');
  const [selectedRide, setSelectedRide] = useState(null);
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');

  const areas = ['all', 'Bashundhara', 'Gulshan', 'Dhanmondi', 'Uttara'];
  const vehicleTypes = ['all', 'CNG Auto', 'Car'];

  const availableRides = [
    {
      id: 1,
      driver: 'Sarah Ahmed',
      rating: 4.8,
      from: 'Bashundhara',
      to: 'NSU',
      time: '8:30 AM',
      price: 150,
      seats: 3,
      vehicle: 'CNG Auto',
      gender: 'female',
      verified: true,
    },
    {
      id: 2,
      driver: 'Karim Rahman',
      rating: 4.9,
      from: 'Gulshan',
      to: 'NSU',
      time: '9:00 AM',
      price: 200,
      seats: 2,
      vehicle: 'Car',
      gender: 'male',
      verified: true,
    },
    {
      id: 3,
      driver: 'Rahim Khan',
      rating: 4.7,
      from: 'Dhanmondi',
      to: 'NSU',
      time: '8:45 AM',
      price: 180,
      seats: 4,
      vehicle: 'Car',
      gender: 'male',
      verified: true,
    },
  ];

  const filteredRides = availableRides.filter((ride) => {
    const matchesVehicle = vehicleFilter === 'all' || ride.vehicle === vehicleFilter;
    const matchesArea = areaFilter === 'all' || ride.from === areaFilter;
    return matchesVehicle && matchesArea;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book a Ride</Text>
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
            title="NSU"
          />
        </MapView>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <MapPin size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Where to?"
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Users size={20} color="#007AFF" />
            <TextInput
              style={styles.input}
              placeholder="Seats"
              value={seats}
              onChangeText={setSeats}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <UserCircle2 size={20} color="#007AFF" />
            <TouchableOpacity
              style={styles.genderSelector}
              onPress={() => {
                const preferences = ['any', 'male', 'female'];
                const currentIndex = preferences.indexOf(genderPreference);
                setGenderPreference(preferences[(currentIndex + 1) % 3]);
              }}>
              <Text style={styles.genderText}>
                Prefer: {genderPreference.charAt(0).toUpperCase() + genderPreference.slice(1)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Car size={20} color="#007AFF" />
              <Text style={styles.filterTitle}>Vehicle Type</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {vehicleTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.filterChip, vehicleFilter === type && styles.filterChipSelected]}
                  onPress={() => setVehicleFilter(type)}>
                  <Text
                    style={[
                      styles.filterChipText,
                      vehicleFilter === type && styles.filterChipTextSelected,
                    ]}>
                    {type === 'all' ? 'All Vehicles' : type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <MapPin size={20} color="#007AFF" />
              <Text style={styles.filterTitle}>Area</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {areas.map((area) => (
                <TouchableOpacity
                  key={area}
                  style={[styles.filterChip, areaFilter === area && styles.filterChipSelected]}
                  onPress={() => setAreaFilter(area)}>
                  <Text
                    style={[
                      styles.filterChipText,
                      areaFilter === area && styles.filterChipTextSelected,
                    ]}>
                    {area === 'all' ? 'All Areas' : area}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Rides</Text>

        {filteredRides.length === 0 ? (
          <View style={styles.noRidesContainer}>
            <Filter size={40} color="#8E8E93" />
            <Text style={styles.noRidesText}>No rides match your filters</Text>
            <TouchableOpacity
              style={styles.resetFiltersButton}
              onPress={() => {
                setVehicleFilter('all');
                setAreaFilter('all');
              }}>
              <Text style={styles.resetFiltersText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredRides.map((ride) => (
            <TouchableOpacity
              key={ride.id}
              style={[styles.rideCard, selectedRide?.id === ride.id && styles.selectedRide]}
              onPress={() => setSelectedRide(ride)}>
              <View style={styles.rideHeader}>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>{ride.driver}</Text>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>★ {ride.rating}</Text>
                  </View>
                  {ride.verified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓ Verified</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.price}>{ride.price} BDT</Text>
              </View>

              <View style={styles.rideDetails}>
                <View style={styles.routeInfo}>
                  <Text style={styles.routeText}>
                    {ride.from} → {ride.to}
                  </Text>
                  <View style={styles.timeSeats}>
                    <Clock size={16} color="#666" />
                    <Text style={styles.detailText}>{ride.time}</Text>
                    <Users size={16} color="#666" />
                    <Text style={styles.detailText}>{ride.seats} seats</Text>
                  </View>
                </View>
                <View style={styles.vehicleType}>
                  <Text style={styles.vehicleText}>{ride.vehicle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity
          style={[styles.bookButton, !selectedRide && styles.bookButtonDisabled]}
          disabled={!selectedRide}
          onPress={() => {
            if (selectedRide) {
              router.push({
                pathname: '/confirm-booking',
                params: { rideId: selectedRide.id },
              });
            }
          }}>
          <Text style={styles.bookButtonText}>
            {selectedRide ? 'Confirm Booking' : 'Select a Ride'}
          </Text>
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
  genderSelector: {
    flex: 1,
    marginLeft: 10,
  },
  genderText: {
    fontSize: 16,
    color: '#007AFF',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 15,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#1C1C1E',
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  filterChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 14,
    color: '#1C1C1E',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  noRidesContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
  },
  noRidesText: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 10,
    marginBottom: 15,
  },
  resetFiltersButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  resetFiltersText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedRide: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  ratingBadge: {
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  ratingText: {
    color: '#FFA000',
    fontSize: 12,
    fontWeight: '500',
  },
  verifiedBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34C759',
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeInfo: {
    flex: 1,
  },
  routeText: {
    fontSize: 15,
    marginBottom: 5,
  },
  timeSeats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    marginRight: 12,
    color: '#666',
    fontSize: 14,
  },
  vehicleType: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  vehicleText: {
    fontSize: 12,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonDisabled: {
    backgroundColor: '#A2A2A2',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});