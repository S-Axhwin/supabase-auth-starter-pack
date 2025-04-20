import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity, Platform, Button } from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStore } from "@/lib/store"
import DateTimePicker from '@react-native-community/datetimepicker'

const PersonalInformation = () => {
  const navigation = useNavigation();
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 86400000),
    showDatePicker: Platform.OS === 'android' ? false : true
  })

  const [duration, setDuration] = useState(3)
  const { filters, profile } = useStore()
  const route = useRoute()
  const { rooms } = route.params || {}

  // Duration options based on booking mode
  const hourOptions = [3, 4, 5] // hours
  const dayOptions = [1, 2, 3, 4, 5] // days
  const monthlylyOptions = [1, 3, 6, 12] // monthlys

  const handleChange = (field: string, value: string | Date) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateTotalPrice = () => {
    if (!rooms || rooms.length === 0) return 0
    let timeDiff
    
    switch (filters.duration) {
      case 'hour':
        timeDiff = duration // Use selected hours directly
        return rooms.reduce((total, room) => total + (room.hourRate || 0) * timeDiff, 0)
      case 'day':
        timeDiff = duration * 24 // Convert days to hours
        return rooms.reduce((total, room) => total + (room.hourRate || 0) * timeDiff, 0)
      case 'monthlyly':
        timeDiff = duration * 30 * 24 // Convert monthlys to hours (approximate)
        return rooms.reduce((total, room) => total + (room.hourRate || 0) * timeDiff, 0)
      default:
        return 0
    }
  }
  console.log(filters);
  
  return (
    <View
      className="flex-1 h-screen bg-gray-50"
    >
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="justify-center items-center w-10 h-10"
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="flex-1 mr-10 text-xl font-bold text-center text-sky-900">Room Booking</Text>
      </View>
      <SafeAreaView className="flex-1">
        <ScrollView className="overflow-visible flex-1 px-5 pb-8">
          <View className="p-6 mt-4 rounded-2xl shadow-sm bg-white/80">
            <Text className="mb-6 text-2xl font-bold text-sky-700">Personal Details</Text>
            <View className="space-y-4">
              <View>
                <Text className="mb-1 text-sm font-medium text-gray-600">Full Name</Text>
                <TextInput
                  className="px-4 h-12 bg-white rounded-xl border border-gray-200"
                  placeholder="Enter your full name"
                  value={profile.name}
                  onChangeText={(value) => handleChange("name", value)}
                />
              </View>
              <View>
                <Text className="mb-1 text-sm font-medium text-gray-600">Email</Text>
                <TextInput
                  className="px-4 h-12 bg-white rounded-xl border border-gray-200"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={profile.email}
                  onChangeText={(value) => handleChange("email", value)}
                />
              </View>
              <View>
                <Text className="mb-1 text-sm font-medium text-gray-600">Phone Number</Text>
                <TextInput
                  className="px-4 h-12 bg-white rounded-xl border border-gray-200"
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={profile.phone}
                  onChangeText={(value) => handleChange("phone", value)}
                />
              </View>
            </View>
          </View>

          <View className="p-6 mt-4 mb-6 rounded-2xl shadow-sm">
            <Text className="mb-6 text-2xl font-bold text-sky-700">Check-in/out Details</Text>
            <View className="space-y-4">
              <View>
                <Text className="mb-1 text-sm font-medium text-gray-600">Check-in Date</Text>
                <View className="p-2 text-black rounded-xl border border-gray-200">
                  {Platform.OS === 'android' && !personalInfo.showDatePicker ? (
                    <TouchableOpacity
                      onPress={() => handleChange("showDatePicker", true)}
                    >
                      <Text className="text-black">
                        {filters.duration === 'hour'
                          ? `${personalInfo.checkIn.toLocaleDateString()} ${personalInfo.checkIn.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                          : personalInfo.checkIn.toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <DateTimePicker
                      value={personalInfo.checkIn}
                      onChange={(event, date) => {
                        if (Platform.OS === 'android') {
                          handleChange("showDatePicker", false);
                        }
                        if (date) {
                          handleChange("checkIn", date);
                          const newCheckOutDate = new Date(date.getTime());
                          switch (filters.duration) {
                            case 'hour':
                              newCheckOutDate.setHours(date.getHours() + duration);
                              break;
                            case 'day':
                              newCheckOutDate.setDate(date.getDate() + duration);
                              break;
                            case 'monthlyly':
                              newCheckOutDate.setMonth(date.getMonth() + duration);
                              break;
                            default:
                              newCheckOutDate.setHours(date.getHours() + 3);
                          }
                          handleChange("checkOut", newCheckOutDate);
                        }
                      }}
                      mode={filters.duration === 'hour' ? 'datetime' : 'date'}
                      minimumDate={new Date()}
                      minuteInterval={30}
                      className="text-black"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    />
                  )}
                </View>
              </View>

              <View>
                <Text className="mb-1 text-sm font-medium text-gray-600">Duration</Text>
                <View className="flex-row flex-wrap gap-2">
                  {(filters.duration === 'hour' ? hourOptions :
                    filters.duration === 'day' ? dayOptions :
                    monthlylyOptions).map((option) => (
                    <TouchableOpacity
                      key={option}
                      className={`px-4 py-2 rounded-full ${duration === option ? 'bg-sky-700' : 'bg-gray-200'}`}
                      onPress={() => {
                        setDuration(option)
                        const newCheckOutDate = new Date(personalInfo.checkIn)
                        if (filters.duration === 'hour') {
                          newCheckOutDate.setHours(newCheckOutDate.getHours() + option)
                        } else if (filters.duration === 'day') {
                          newCheckOutDate.setDate(newCheckOutDate.getDate() + option)
                        } else {
                          newCheckOutDate.setMonth(newCheckOutDate.getMonth() + option)
                        }
                        handleChange("checkOut", newCheckOutDate)
                      }}
                    >
                      <Text className={`text-sm font-medium ${duration === option ? 'text-white' : 'text-gray-700'}`}>
                        {option} {filters.duration === 'hour' ? 'hours' : filters.duration === 'day' ? 'days' : 'monthlys'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View>
                <Text className="mb-1 text-sm font-medium text-black">Check-out Date & Time (Auto-calculated)</Text>
                <View className="p-2 bg-gray-50 rounded-xl border border-gray-200">
                  <Text className="text-base text-gray-700">
                    {filters.duration === 'hour' 
                      ? `${personalInfo.checkOut.toLocaleDateString()} ${personalInfo.checkOut.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                      : personalInfo.checkOut.toLocaleDateString()}
                  </Text>
                </View>
                <Text className="mt-1 text-sm text-gray-500">
                  {`Based on ${duration} ${filters.duration === 'hour' ? 'hours' : filters.duration === 'day' ? 'days' : 'monthlys'} duration`}
                </Text>
              </View>
            </View>
            <Button 
              title="Proceed To Pay"
              onPress={() => navigation.navigate("payment")}
              color="skyblue"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default PersonalInformation
