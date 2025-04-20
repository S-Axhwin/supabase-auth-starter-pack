import React, { useState, useContext, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Switch,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/lib/store';
import { useNavigation } from 'expo-router';



const categories = [
  { icon: 'apartment', label: '1BHK' },
  { icon: 'home', label: '2BHK' },
  { icon: 'house', label: '3BHK' },
  { icon: 'villa', label: 'Villa' },
  { icon: 'business', label: 'PG' },
];



const HomeScreen = ({ route } : any ) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const {filters, setFilters} = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const { darkMode } = {darkMode: false};
  const [rooms, setRooms] = useState([]);

  // Get location and date information from route params if available
  const location = filters.location || 'law gate';
  
  useEffect(() => {
    const avil = filters.duration || 'hour';
    const dur = avil === 'hour'? 'hour_avl' :
                avil === 'day'? 'day_avl' :
                avil === 'monthlyly'? 'price_per_monthly' :
                'hour_avl';
    supabase
      .from('rooms')
      .select('*')
      .eq('location', location.toLowerCase())
      .eq(dur, 'true')
      .then(res => {
      if (res.data) {
        console.log(res.data[0]);
        
        setRooms(res.data);
      }
    })
  }, []); // Add empty dependency array to prevent infinite loop

  // Filter rooms based on search query and filters



  return (
    <View style={[styles.container, darkMode && styles.darkMode]}>
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <View style={styles.brandContainer}>
          <Text style={[styles.brandText, darkMode && styles.darkText]}>GateX</Text>
        </View>
        <View style={[styles.locationHeader, darkMode && styles.darkLocationHeader]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={darkMode ? "#fff" : "#333"} />
          </TouchableOpacity>
          
          <View style={styles.locationRoundedContainer}>
            <Text style={[styles.locationText, darkMode && styles.darkText]}>{filters.duration || 'Any'}</Text>
            <Text style={[styles.dateRangeText, darkMode && styles.darkSubText]}>{location}</Text>
          </View>
           
        </View>

      </View>

      <ScrollView style={styles.content}>
        {rooms.map((room) => (
          <TouchableOpacity 
            key={room.id} 
            style={[styles.roomCard, darkMode && styles.darkRoomCard]}
            onPress={() => navigation.navigate('RoomDetail', { room })}
          >
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: room.images[0] || 'https://via.placeholder.com/300x200' }} 
                style={styles.roomImage} 
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.4)', 'transparent']}
                style={styles.imageOverlay}
              >
                <View style={styles.roomBadge}>
                  <Text style={styles.badgeText}>{room.room_type}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.favoriteButton}
                  onPress={() => {
                    // Toggle wishlist logic here
                  }}
                >
                  <MaterialIcons 
                    name={room.isWishlisted ? "favorite" : "favorite-border"} 
                    size={24} 
                    color="white" 
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>
            
            <View style={styles.roomInfo}>
              <View style={styles.roomHeader}>
                <View>
                  <Text style={[styles.roomName, darkMode && styles.darkText]}>
                    {room.room_no}
                  </Text>
                  <Text style={[styles.roomType, darkMode && styles.darkText]}>
                    {room.room_type} · {room.location}
                  </Text>
                </View>
              </View>

              <Text style={[styles.description, darkMode && styles.darkText]}>
                {room.description}
              </Text>

              <View style={styles.priceContainer}>
                <Text style={[styles.price, darkMode && styles.darkText]}>
                  &#8377;{filters.duration === 'month' ? room.price_per_month: 
                     filters.duration === 'day' ? room.price_per_day : 
                     room.price_per_hour}
                  / <Text className='text-sm'>{filters.duration === 'month' ? 'mo' : 
                     filters.duration === 'day' ? 'day' : '3 hr'}
                     </Text>
                </Text>
                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => navigation.navigate('RoomDetail', { room })}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>      


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkMode: {
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginBottom: 15,
  },
  darkLocationHeader: {
    borderColor: '#333',
    backgroundColor: '#1e1e1e',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationRoundedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 13,
    paddingHorizontal: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
    textAlign: 'center',
  },
  dateRangeText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  darkSubText: {
    color: '#aaa',
  },
  filterIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkHeader: {
    backgroundColor: '#2a2a2a',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },
  darkSearchContainer: {
    backgroundColor: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  darkInput: {
    color: '#fff',
  },
  filterButton: {
    padding: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 30,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCategoryItem: {
    backgroundColor: '#2a2a2a',
  },
  categoryLabel: {
    marginTop: 8,
    color: '#666',
    fontSize: 12,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  roomCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkRoomCard: {
    backgroundColor: '#2a2a2a',
  },
  imageContainer: {
    position: 'relative',
  },
  roomImage: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
  },
  roomBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  roomInfo: {
    padding: 15,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  roomType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#96B374',
  },
  bookButton: {
    backgroundColor: '#96B374',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  darkBottomNav: {
    backgroundColor: '#2a2a2a',
    borderTopColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavText: {
    color: '#96B374',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  filterContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  durationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  activeDuration: {
    backgroundColor: '#96B374',
  },
  durationButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  activeDurationText: {
    color: 'white',
  },
  amenityToggles: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
  },
  amenityToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },  applyButton: {
    backgroundColor: '#96B374',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  priceInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    color: '#333',
  },
  priceRangeSeparator: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  roomTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  roomTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  activeRoomType: {
    backgroundColor: '#96B374',
    borderColor: '#96B374',
  },
  roomTypeText: {
    fontSize: 14,
    color: '#333',
  },
  activeRoomTypeText: {
    color: 'white',
  },
  addOnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addOnToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;