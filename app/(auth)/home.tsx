import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useStore } from "@/lib/store";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const { filters, setFilters, profile } = useStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [location, setLocation] = useState("All");
  const locations = ["All", "Law Gate", "Green Valley"];

  return (
    <SafeAreaView className="flex-1 bg-sky-50">
      <ScrollView className="flex-1">
        <View className="p-5">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-5">
            <View>
              <Text className="text-base text-slate-500">Hello, {profile.name}!</Text>
              <Text className="text-2xl font-bold text-sky-700">Let's Start Exploring 👋</Text>
            </View>
            <Image
              source={{ uri: "https://placekitten.com/100/100" }}
              className="w-12 h-12 rounded-full"
            />
          </View>

          {/* Main Card */}
          <View className="p-5 bg-white rounded-3xl shadow-lg">
            <Text className="mb-4 text-xl font-semibold">Choose Your Mode</Text>
            {/* Mode Selection */}
            <View className="flex-row gap-2 mb-5">
              {["hour", "day", "month"].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setFilters({ ...filters, duration: item.toLowerCase() })}
                  className={`flex-1 py-2 px-4 rounded-full items-center ${filters.duration === item.toLowerCase() ? 'bg-[#96B374]' : 'bg-gray-100'}`}
                >
                  <Text className={filters.duration === item.toLowerCase() ? 'text-white' : 'text-gray-600'}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Location Picker */}
            <Text className="mb-2 text-base">Location</Text>
            <TouchableOpacity 
              onPress={() => setShowDropdown(!showDropdown)} 
              className="flex-row justify-between items-center px-4 mb-5 h-12 rounded-xl border border-gray-200"
            >
              <Text className="text-base text-gray-700">{filters.location || 'All'}</Text>
              <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#666" />
            </TouchableOpacity>

            <Modal
              visible={showDropdown}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setShowDropdown(false)}
            >
              <TouchableOpacity 
                activeOpacity={1} 
                onPress={() => setShowDropdown(false)} 
                className="flex-1 bg-black/30"
              >
                <View className="overflow-hidden mx-5 mt-[120px] bg-white rounded-xl shadow-xl">
                  {["All", "Law Gate", "Green Valley"].map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => {
                        setFilters({ ...filters, location: item });
                        setShowDropdown(false);
                      }}
                      className={`px-4 py-3 border-b border-gray-100 ${location === item ? 'bg-gray-50' : ''}`}
                    >
                      <Text className={`text-base ${location === item ? 'text-[#96B374] font-medium' : 'text-gray-700'}`}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Guests and Rooms */}
            <View className="flex-row gap-4 mb-5">
              {filters.duration === 'month' && (
                <View className="flex-1">
                  <Text className="mb-2 text-base">Guests</Text>
                  <View className="flex-row items-center p-3 rounded-xl border border-gray-200">
                    <TouchableOpacity onPress={() => setGuests(Math.max(1, guests - 1))}>
                      <Ionicons name="remove-circle-outline" size={24} className="text-gray-400" />
                    </TouchableOpacity>
                    <Text className="flex-1 text-base text-center">{guests}</Text>
                    <TouchableOpacity onPress={() => setGuests(guests + 1)}>
                      <Ionicons name="add-circle-outline" size={24} className="text-gray-400" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View className={`flex-1 ${filters.duration !== 'month' ? 'w-full' : ''}`}>
                <Text className="mb-2 text-base">Rooms</Text>
                <View className="flex-row items-center p-3 rounded-xl border border-gray-200">
                  <TouchableOpacity onPress={() => setRooms(Math.max(1, rooms - 1))}>
                    <Ionicons name="remove-circle-outline" size={24} className="text-gray-400" />
                  </TouchableOpacity>
                  <Text className="flex-1 text-base text-center">{rooms}</Text>
                  <TouchableOpacity onPress={() => setRooms(rooms + 1)}>
                    <Ionicons name="add-circle-outline" size={24} className="text-gray-400" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity className="flex-row justify-center items-center p-4 space-x-2 bg-[#96B374] rounded-xl" onPress={() => {
              setFilters({ ...filters, guests, rooms });
              console.log("filters: ",filters);
              
              navigation.navigate('search', { filters });
            }}>
              <Ionicons name="search" size={20} color="white" />
              <Text className="text-base font-semibold text-white" >Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
