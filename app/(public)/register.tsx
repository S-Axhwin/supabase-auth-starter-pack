import { Text, View, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import Auth from "@/components/Auth";

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri();

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);
    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;
    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    return data.session;
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          phone,
        },
      },
    });

    if (!error) {
      router.replace("/welcome");
    }
  };

  // Handle linking into app from email app
  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-start items-center px-6 pt-12">
        <TouchableOpacity 
          className="self-start mb-8" 
          onPress={() => router.back()}
        >
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>

        <View className="w-full max-w-md">
          <Text className="mb-2 text-2xl font-bold text-gray-900">
            Hello! Register to get started
          </Text>

          <View className="gap-4 mt-8 space-y-4">
            <View>
              <TextInput
                className="px-4 h-12 rounded-lg border border-gray-200 placeholder:text-black/30"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View>
              <TextInput
                className="px-4 h-12 rounded-lg border border-gray-200 placeholder:text-black/30"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <TextInput
                className="px-4 h-12 rounded-lg border border-gray-200 placeholder:text-black/30"
                placeholder="Phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View>
              <TextInput
                className="px-4 h-12 rounded-lg border border-gray-200 placeholder:text-black/30"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View>
              <TextInput
                className="px-4 h-12 rounded-lg border border-gray-200 placeholder:text-black/30"
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              className="justify-center items-center mt-4 h-12 bg-gray-900 rounded-lg"
              onPress={handleRegister}
            >
              <Text className="text-base font-medium text-white">Register</Text>
            </TouchableOpacity>

            <View className="flex-row items-center mt-6 mb-6">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="mx-4 text-sm text-gray-500">Or Register with</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            <View className="flex-row gap-3 justify-center space-x-4">

              <Auth/>
            </View>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/sign-in")}>
                <Text className="font-medium text-blue-600">Login Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}