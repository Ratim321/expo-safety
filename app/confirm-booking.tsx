import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Shield, Clock, Users, MapPin, Phone, MessageSquare } from 'lucide-react-native';

export default function ConfirmBookingScreen() {
  const router = useRouter();
  const { rideId } = useLocalSearchParams();

  // In a real app, you would fetch this data based on the rideId
  const rideDetails = {
    driver: 'Sarah Ahmed',
    rating: 4.8,
    from: 'Bashundhara',
    to: 'NSU',
    time: '8:30 AM',
    price: 150,
    seats: 3,
    vehicle: 'CNG Auto',
    licensePlate: 'DHA-1234',
    estimatedTime: '25 mins',
    distance: '5.2 km',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Confirm Booking</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.driverInfo}>
          <View style={styles.driverHeader}>
            <Text style={styles.driverName}>{rideDetails.driver}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ {rideDetails.rating}</Text>
            </View>
          </View>
          <View style={styles.verificationBadge}>
            <Shield size={16} color="#4CAF50" />
            <Text style={styles.verifiedText}>Verified Driver</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.rideInfo}>
          <View style={styles.infoRow}>
            <Clock size={20} color="#666" />
            <Text style={styles.infoText}>{rideDetails.time}</Text>
            <Text style={styles.infoSecondary}>Today</Text>
          </View>
          <View style={styles.infoRow}>
            <Users size={20} color="#666" />
            <Text style={styles.infoText}>{rideDetails.seats} seats available</Text>
            <Text style={styles.price}>{rideDetails.price} BDT</Text>
          </View>
          <View style={styles.infoRow}>
            <MapPin size={20} color="#666" />
            <View style={styles.routeContainer}>
              <Text style={styles.routeText}>{rideDetails.from}</Text>
              <Text style={styles.routeArrow}>↓</Text>
              <Text style={styles.routeText}>{rideDetails.to}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleTitle}>Vehicle Details</Text>
          <Text style={styles.vehicleText}>
            {rideDetails.vehicle} • {rideDetails.licensePlate}
          </Text>
        </View>

        <View style={styles.tripInfo}>
          <View style={styles.tripDetail}>
            <Clock size={16} color="#666" />
            <Text style={styles.tripDetailText}>{rideDetails.estimatedTime}</Text>
          </View>
          <View style={styles.tripDetail}>
            <MapPin size={16} color="#666" />
            <Text style={styles.tripDetailText}>{rideDetails.distance}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.contactButton}>
            <Phone size={20} color="#007AFF" />
            <Text style={styles.contactButtonText}>Call Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <MessageSquare size={20} color="#007AFF" />
            <Text style={styles.contactButtonText}>Message</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            // Here you would typically make an API call to confirm the booking
            router.push('/booking-success');
          }}>
          <Text style={styles.confirmButtonText}>Confirm & Pay {rideDetails.price} BDT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.safetyCard}>
        <Shield size={20} color="#4CAF50" />
        <View style={styles.safetyInfo}>
          <Text style={styles.safetyTitle}>Safety Features</Text>
          <Text style={styles.safetyText}>
            • Share trip details with emergency contacts{'\n'}
            • 24/7 customer support{'\n'}
            • Verified driver and vehicle
          </Text>
        </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  driverInfo: {
    marginBottom: 15,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  ratingBadge: {
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFA000',
    fontSize: 12,
    fontWeight: '500',
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    color: '#4CAF50',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 15,
  },
  rideInfo: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  infoSecondary: {
    color: '#8E8E93',
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34C759',
  },
  routeContainer: {
    marginLeft: 10,
  },
  routeText: {
    fontSize: 16,
    marginBottom: 2,
  },
  routeArrow: {
    fontSize: 16,
    color: '#8E8E93',
    marginVertical: 2,
  },
  vehicleInfo: {
    marginBottom: 15,
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  vehicleText: {
    fontSize: 15,
    color: '#666',
  },
  tripInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  tripDetailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 10,
    flex: 0.48,
    justifyContent: 'center',
  },
  contactButtonText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  safetyCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  safetyInfo: {
    marginLeft: 10,
    flex: 1,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  safetyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});