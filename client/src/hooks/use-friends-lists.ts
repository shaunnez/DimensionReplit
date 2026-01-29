import { useState, useEffect } from 'react';
import { EventStatus } from '../data';

interface FriendSchedule {
  name: string;
  schedule: Record<string, EventStatus>;
  exportedAt: string;
}

const STORAGE_KEY = 'dimension-friends-lists';

export function useFriendsLists() {
  const [friendsLists, setFriendsLists] = useState<FriendSchedule[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(friendsLists));
  }, [friendsLists]);

  const addFriendsList = (friend: FriendSchedule) => {
    setFriendsLists(prev => [...prev, friend]);
  };

  const removeFriendsList = (index: number) => {
    setFriendsLists(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFriendsLists = () => {
    setFriendsLists([]);
  };

  return {
    friendsLists,
    addFriendsList,
    removeFriendsList,
    clearAllFriendsLists,
  };
}
