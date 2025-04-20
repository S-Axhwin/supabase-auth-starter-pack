import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useStore } from "@/lib/store";

const RoomDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { filters } = useStore();
  const room = route.params?.room;
  console.log("this room:", room);
  
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRooms, setSelectedRooms] = useState([room.id]);
  const [activeImage, setActiveImage] = useState(0);
  const images = [room.images[0], ...room.images.slice(1, 4)];
  const otherRooms = [
    {
      id: 2,
      name: '1BHK',
      image: 'URL_ADDRESS.a0.dev/assets/image?text=junior%20suite%20hotel%20room&aspect=16:9',
      price: 180,
      size: '450 ft²',
      available: true 
    }
  ]
  // Get price based on selected duration
  const getPrice = () => {
    console.log("filter in roomdetail: ",filters.duration);
      
    switch(filters.duration) {
      case 'hour':
        return room.price_per_hour;
      case 'day':
        return room.price_per_day;
      case 'month':
        return room.price_per_month;
      default:
        return room.price_per_hour;
    }
  };

  const getPriceLabel = () => {
    console.log();
    
    switch(filters.duration) {
      case 'hours':
        return '/3 hour';
      case 'day':
        return '/day';
      case 'month':
        return '/month';
      default:
        return '/3 hour';
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="relative">
          <Image 
            source={{ uri: room.images[0] || 'https://via.placeholder.com/300x200' }}
            className="w-full h-[300px]"
          />
          <View className="absolute top-0 right-0 left-0 p-5 pt-14">
            <View className="flex-row justify-between">
              <TouchableOpacity 
                className="justify-center items-center w-10 h-10 rounded-full bg-black/30"
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <View className="flex-row">
                <TouchableOpacity className="justify-center items-center ml-2 w-10 h-10 rounded-full bg-black/30">
                  <MaterialIcons name="videocam" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="justify-center items-center ml-2 w-10 h-10 rounded-full bg-black/30">
                  <MaterialIcons name="share" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="justify-center items-center ml-2 w-10 h-10 rounded-full bg-black/30">
                  <MaterialIcons name="favorite-border" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row p-5">
          {images.slice(1).map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              className="mr-2 w-20 h-20 rounded-xl"
            />
          ))}
          <TouchableOpacity className="justify-center items-center w-20 h-20 rounded-xl bg-black/60">
            <Text className="text-base font-bold text-white">10+</Text>
          </TouchableOpacity>
        </View>
 
        <View className="p-5">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-2xl font-bold text-gray-800">{room.description}</Text>
            <View className="flex-row items-center px-3 py-2 bg-gray-100 rounded-xl">
              <MaterialIcons name="star" size={20} color="#96B374" />
              <Text className="ml-1 font-bold text-gray-800">{room.rating}</Text>
            </View>
          </View>
          <Text className="text-2xl font-bold text-[#96B374] mb-5">${getPrice()}{getPriceLabel()}</Text>

          <View className="flex-row mb-5">
            <TouchableOpacity 
              className={`mr-8 pb-2 ${activeTab === 'Overview' ? 'border-b-2 border-[#96B374]' : ''}`}
              onPress={() => setActiveTab('Overview')}
            >
              <Text className={`text-base ${activeTab === 'Overview' ? 'text-[#96B374] font-semibold' : 'text-gray-600'}`}>Overview</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`pb-2 ${activeTab === 'OtherRooms' ? 'border-b-2 border-[#96B374]' : ''}`}
              onPress={() => setActiveTab('OtherRooms')}
            >
              <Text className={`text-base ${activeTab === 'OtherRooms' ? 'text-[#96B374] font-semibold' : 'text-gray-600'}`}>Other Rooms</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View className="absolute right-0 bottom-0 left-0 bg-white border-t border-gray-200 shadow-lg">
        <View className="flex-row justify-between items-center p-5">
          <View>
            <Text className="mb-1 text-sm text-gray-600">{selectedRooms.length} room{selectedRooms.length > 1 ? 's' : ''} selected</Text>
            <Text className="text-2xl font-bold text-[#96B374]">
              ${selectedRooms.reduce((total, id) => {
                const selectedRoom = [room, ...otherRooms].find(r => r.id === id);
                return total + (selectedRoom ? getPrice() : 0);
              }, 0)}{getPriceLabel()}
            </Text>
          </View>
          <TouchableOpacity 
            className="bg-[#96B374] px-8 py-4 rounded-2xl shadow-sm"
            onPress={() => {
              const selectedRoomObjects = selectedRooms.map(id => {
                return [room, ...otherRooms].find(r => r.id === id);
              }).filter((r): r is Room => r !== undefined);
              
              navigation.navigate('PersonalInformation', { 
                rooms: selectedRoomObjects,
                totalPrice: selectedRoomObjects.reduce((total, r) => total + (r.hourRate || 0), 0),
                isMultipleBooking: selectedRooms.length > 1
              });
            }}
          >
            <Text className="text-lg font-semibold text-white">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default RoomDetail;

const baseStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    color: '#495057',
    fontSize: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

const styles = StyleSheet.create({
  // Other Rooms styles
  otherRoomsContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
  },

  otherRoomsGrid: {
    width: '100%',
  },

  roomCardContentWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  roomCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  roomActionButtonContainer: {
    alignSelf: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10,
  },
  roomActionButton: {
    ...baseStyles.button,
    backgroundColor: '#96B374',
  },
  roomActionButtonText: {
    ...baseStyles.buttonText,
  },
  removeButton: {
    backgroundColor: '#FF5A5F',
  },
  removeButtonText: {
    color: 'white',
  },
  roomHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  unavailableCard: {
    opacity: 0.85,
  },
  unavailableBadge: {
    backgroundColor: '#f0f0f0',
  },
  prebookButton: {
    ...baseStyles.button,
    backgroundColor: '#FF9800',
  },
  prebookButtonText: {
    ...baseStyles.buttonText,
  },
  prebookFeeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
    marginTop: 2,
  },
  availableFromText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
    marginTop: 4,
  },
  totalContainer: {
    flex: 1,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: '#96B374',
  },
  otherRoomsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  availabilityBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 1,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#96B374',
  },
  unavailableText: {
    color: '#999',
  },
  otherRoomsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  otherRoomCard: {
    width: '100%',
    height: 140,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedRoomCard: {
    borderWidth: 2,
    borderColor: '#96B374',
  },
  otherRoomImage: {
    width: 120,
    height: 140,
    resizeMode: 'cover',
  },
  otherRoomInfo: {
    flex: 1,
    padding: 16,
    paddingLeft: 20,
  },
  otherRoomName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  otherRoomNumber: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 4,
  },
  otherRoomType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  otherRoomDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  hourRate: {
    fontSize: 18,
    color: '#96B374',
    fontWeight: '600',
    marginTop: 4,
  },
  dayPrice: {
    fontSize: 16,
    color: '#96B374',
    fontWeight: '600',
  },
  bookingType: {
    color: '#96B374',
    fontSize: 12,
    fontWeight: '500',
  },
  otherRoomPrice: {
    fontSize: 14,
    color: '#96B374',
    marginBottom: 4,
  },
  otherRoomSize: {
    fontSize: 12,
    color: '#666',
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  // Footer styles
  footerContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  priceContainer: {
    flex: 1,
    marginRight: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    opacity: 0.8,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#96B374',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 64, // Space for footer
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 60,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    padding: 20,
  },
  gridImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
  },
  morePhotosButton: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  morePhotosText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 24,
    color: '#96B374',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    marginRight: 30,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#96B374',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#96B374',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  facilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  facilityText: {
    marginLeft: 8,
    color: '#333',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },

  selectedInfo: {
    flex: 1,
    marginRight: 20,
  },
  selectedCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#96B374',
  },
  bookButton: {
    backgroundColor: '#96B374',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
});
