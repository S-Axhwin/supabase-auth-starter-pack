import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../lib/auth';
import { supabase } from '@/lib/supabase';

// Protect routes that require authentication
function ProtectedLayout() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    async function checkUserProfile() {
      if (!session?.user) {
        setIsCheckingProfile(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      setHasProfile(!!data);
      setIsCheckingProfile(false);
    }

    checkUserProfile();
  }, [session]);

  useEffect(() => {
    if (isLoading || isCheckingProfile) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inPublicGroup = segments[0] === '(public)';
    const inWelcomeScreen = segments[1] === 'welcome';

    if (!session && !inPublicGroup) {

      router.replace('/sign-in');
    } else if (session && !inAuthGroup) {
      // Redirect to welcome or home based on profile existence
      if (!hasProfile) {
        router.replace('/welcome');
      } else {
        router.replace('/home');
      }
    } else if (session && hasProfile && inWelcomeScreen) {
      // Redirect to home if user already has a profile
      router.replace('/home');
    }
  }, [session, segments, isLoading, hasProfile, isCheckingProfile]);

  if (isLoading || isCheckingProfile) {
    return null; // Or a loading spinner
  }

  return <Slot />;
}

// Root layout
export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
