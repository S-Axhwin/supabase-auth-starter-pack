import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function ProfileDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Profile ID: {id}</Text>
    </View>
  );
}
