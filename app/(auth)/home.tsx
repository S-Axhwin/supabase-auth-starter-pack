import { View, Text, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

// Get screen dimensions
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Fake data for testing
const FAKE_FRIENDS = Array(19).fill({
  id: '1',
  username: 'Ashwin',
  role: 'fullstack dev',
  skills: ['Python', 'JS', 'ReactJS', 'ReactNative']
});

const FAKE_SUGGESTIONS = Array(4).fill({
  id: '2',
  username: 'Ashwin',
  role: 'fullstack dev',
  skills: ['Python', 'JS', 'ReactJS', 'ReactNative']
});

export default function Home() {
  const router = useRouter();
  const [friends, setFriends] = useState(FAKE_FRIENDS);
  const [suggestions, setSuggestions] = useState(FAKE_SUGGESTIONS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);

  const renderUserCard = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.userCard, { opacity: !isExpanded && index === 0 ? 1 : 0.6 }]}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
      </View>
      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.role}>{item.role}</Text>
        </View>
        <Text style={styles.skills}>{item.skills.join(', ')}</Text>
      </View>
    </View>
  );

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <LinearGradient
    colors={['#E3E3E3', '#3DABFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{flex: 1}}
  >
      <View style={styles.content}>
        <View style={styles.header}>
          {isExpanded && (
            <TouchableOpacity onPress={toggleExpand} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>Friends</Text>
          <Text style={styles.emoji}>👥</Text>
        </View>

        <View style={[styles.listContainer, isExpanded && styles.expandedListContainer]}>
          <FlatList
            data={friends}
            renderItem={renderUserCard}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {!isExpanded && (
          <>
            <TouchableOpacity onPress={toggleExpand}>
              <Text style={styles.more}>more.</Text>
            </TouchableOpacity>

            <View style={styles.suggestionHeader}>
              <Text style={styles.suggestionTitle}>Suggestion</Text>
              <Text style={styles.sparkles}>✨</Text>
            </View>

            <View style={styles.suggestionContainer}>
              <FlatList
                data={suggestions}
                renderItem={renderUserCard}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              />
            </View>
          </>
        )}
      </View>
    </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    marginRight: 8,
  },
  emoji: {
    fontSize: 28,
  },
  listContainer: {
    height: SCREEN_HEIGHT * 0.35, // 35% of screen height for friends list in collapsed state
  },
  expandedListContainer: {
    height: SCREEN_HEIGHT * 0.8, // 80% of screen height in expanded state
  },
  suggestionContainer: {
    height: SCREEN_HEIGHT * 0.35, // 35% of screen height for suggestions
  },
  listContent: {
    paddingBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  userInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginRight: 8,
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
  skills: {
    fontSize: 14,
    color: '#666',
  },
  more: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    marginVertical: 10,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  suggestionTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    marginRight: 8,
  },
  sparkles: {
    fontSize: 28,
  },
});