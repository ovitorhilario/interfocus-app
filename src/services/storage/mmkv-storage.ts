import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

const mmkv = new MMKV({
  id: 'todo-list-storage'
});

export const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    try {
      mmkv.set(name, value);
    } catch (error) {
      console.log('Error setting item in MMKV:', error);
    }
  },
  getItem: (name) => {
    try {
      const value = mmkv.getString(name);
      return value ?? null;
    } catch (error) {
      console.log('Error getting item from MMKV:', error);
      return null;
    }
  },
  removeItem: (name) => {
    try {
      mmkv.delete(name);
    } catch (error) {
      console.log('Error removing item from MMKV:', error);
    }
  },
};