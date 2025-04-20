import { Text, View, TextInput, SafeAreaView, TouchableOpacity } from "react-native"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"
import { useNavigation } from "expo-router"
import { useStore } from "@/lib/store"

const Welcome = () => {
  
  const navigation = useNavigation();
  const { profile, setProfile } = useStore();
  const { session } = useAuth()

  const handleSubmit = async () => {
    if (!profile.name || !profile.phone) return

    const { error } = await supabase
      .from('users')
      .insert({
        id: session?.user.id,
        name: profile.name,
        phone: profile.phone,
        email: session?.user.email
      })

    if (!error) {
      // Profile created successfully
      navigation.navigate("home")
    }
  }

  const handleSkip = () => {
    navigation.navigate("home")
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-full max-w-md">
          <Text className="mb-8 text-3xl font-bold text-center text-blue-800">
            Welcome! Let's get started
          </Text>

          <View className="p-6 space-y-4 bg-white rounded-xl border border-blue-100 shadow-md">
            <View>
              <Text className="mb-1 text-sm font-medium text-gray-700">Name</Text>
              <TextInput
                className="px-4 h-12 bg-gray-50 rounded-lg border border-gray-200"
                placeholder="Enter your name"
                value={profile.name}
                onChangeText={(value) => setProfile({ name: value })}
              />
            </View>

            <View>
              <Text className="mb-1 text-sm font-medium text-gray-700">Phone Number</Text>
              <TextInput
                className="px-4 h-12 bg-gray-50 rounded-lg border border-gray-200"
                placeholder="Enter your phone number"
                value={profile.phone}
                onChangeText={(value) => setProfile({ phone: value })}
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity
              className="justify-center items-center mt-4 h-12 bg-blue-600 rounded-lg"
              onPress={handleSubmit}
            >
              <Text className="font-medium text-white">Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="justify-center items-center mt-2"
              onPress={handleSkip}
            >
              <Text className="text-blue-600">Skip for now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Welcome
