import { mmkvStorage } from '@/services/storage/mmkv-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';

type Profile = { 
	userId: number;
	name: string;
	login: string;
}

type ProfileState = {
	profile: Profile;
	hasHydrated: boolean;
}

type ProfileActions = {
	setProfile: (profile: Profile) => void;
	setHasHydrated: (value: boolean) => void;
}

const useProfileStore = create<ProfileState & ProfileActions>()(
	persist(
		(set, get) => ({
			profile: { userId: 0, name: '', login: '' },
			setProfile: (profile) => set({ profile }),

			hasHydrated: false,
			setHasHydrated: (v) => set({ hasHydrated: v }),
		}),
		{
			name: 'profile-storage',
			storage: createJSONStorage(() => mmkvStorage),
			onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      }
		}
	),
)

export default useProfileStore;