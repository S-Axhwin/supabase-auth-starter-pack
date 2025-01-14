import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AVATAR_SIZE = SCREEN_WIDTH * 0.4;

export default function Account() {
  const router = useRouter();
  const { session } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    async function loadProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setProfile(data);
      }
      setLoading(false);
    }

    loadProfile();
  }, [session]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#E3E3E3', '#3DABFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profile?.full_name?.substring(0, 2)?.toUpperCase() || 'AS'}
                </Text>
              </View>
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.name}>{profile?.full_name || 'Ashwin'}</Text>
              <Text style={styles.role}>{profile?.role || 'fullstack dev'}</Text>
            </View>

            <Text style={styles.skills}>
              {profile?.skills?.join(', ') || 'Python, JS, ReactJS, ReactNative'}
            </Text>
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Registration Number</Text>
              <Text style={styles.detailValue}>{profile?.reg_no || 'Not specified'}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{profile?.email || session?.user?.email}</Text>
            </View>

            {profile?.linkedin_url && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>LinkedIn</Text>
                <Text style={styles.detailValue}>{profile.linkedin_url}</Text>
              </View>
            )}

            {profile?.github_url && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>GitHub</Text>
                <Text style={styles.detailValue}>{profile.github_url}</Text>
              </View>
            )}

            {profile?.bio && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Bio</Text>
                <Text style={styles.detailValue}>{profile.bio}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={() => supabase.auth.signOut()}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: AVATAR_SIZE * 0.3,
    fontWeight: '600',
    color: '#666',
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    marginBottom: 4,
  },
  role: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  skills: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  detailsSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  signOutButton: {
    backgroundColor: '#ff4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
