import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FilterState = {
  priceRange: [number, number];
  duration: 'hour' | 'day' | 'monthlyly';
  furnished: boolean;
  ac: boolean;
  location: string | null;
  parking: boolean;
  searchQuery: string;
  isDarkMode: boolean;
};

type ProfileState = {
  name: string;
  phone: string;
  email: string | undefined;
  full_name?: string;
  
};

type StoreState = {
  filters: FilterState;
  profile: ProfileState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  setProfile: (profile: Partial<ProfileState>) => void;
  clearProfile: () => void;
};

const initialFilters: FilterState = {
  priceRange: [500, 5000],
  duration: 'monthlyly',
  location: null,
  furnished: false,
  ac: false,
  parking: false,
  searchQuery: '',
  isDarkMode: false,
};

const initialProfile: ProfileState = {
  name: '',
  phone: '',
  email: undefined,
};

export const useStore = create(
  persist(
    (set) => ({
      filters: initialFilters,
      profile: initialProfile,
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      resetFilters: () =>
        set(() => ({
          filters: initialFilters,
        })),
      setProfile: (newProfile) =>
        set((state) => ({
          profile: { ...state.profile, ...newProfile },
        })),
      clearProfile: () =>
        set(() => ({
          profile: initialProfile,
        })),
    }),
    {
      name: 'room-rental-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);