import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Phone, Mail, Shield, Star, Clock } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <View style={styles.verificationBadge}>
          <Shield size={16} color="#4CAF50" />
          <Text style={styles.verificationText}>Verified User</Text>
        </View>
        <View style={styles.rating}>
          <Star size={16} color="#FFC107" />
          <Text style={styles.ratingText}>4.8</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactItem}>
          <Phone size={20} color="#007AFF" />
          <Text style={styles.contactText}>+880 1234-567890</Text>
        </View>
        <View style={styles.contactItem}>
          <Mail size={20} color="#007AFF" />
          <Text style={styles.contactText}>john.doe@northsouth.edu</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <TouchableOpacity style={styles.emergencyContact}>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>Sarah Doe</Text>
            <Text style={styles.contactRelation}>Sister</Text>
          </View>
          <Text style={styles.contactPhone}>+880 1234-567891</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Rides</Text>
        <View style={styles.rideItem}>
          <Clock size={20} color="#8E8E93" />
          <View style={styles.rideInfo}>
            <Text style={styles.rideRoute}>Bashundhara → NSU</Text>
            <Text style={styles.rideDate}>Today, 8:30 AM</Text>
          </View>
          <Text style={styles.rideAmount}>150 BDT</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 5,
  },
  verificationText: {
    marginLeft: 5,
    color: '#4CAF50',
    fontSize: 14,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFC107',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
  },
  emergencyContact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
  },
  contactRelation: {
    fontSize: 14,
    color: '#8E8E93',
  },
  contactPhone: {
    fontSize: 14,
    color: '#007AFF',
  },
  rideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginBottom: 10,
  },
  rideInfo: {
    flex: 1,
    marginLeft: 10,
  },
  rideRoute: {
    fontSize: 16,
    fontWeight: '500',
  },
  rideDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  rideAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34C759',
  },
  editButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});