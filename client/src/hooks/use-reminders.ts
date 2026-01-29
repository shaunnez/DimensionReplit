import { useState, useEffect } from 'react';

export interface EventReminder {
  eventId: string;
  reminderDate: string; // ISO date string
  reminderTime: string; // HH:MM format
}

type RemindersState = Record<string, EventReminder>;

export function useReminders() {
  const [reminders, setReminders] = useState<RemindersState>(() => {
    const saved = localStorage.getItem('dimension-reminders');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('dimension-reminders', JSON.stringify(reminders));
  }, [reminders]);

  const setReminder = (eventId: string, date: string, time: string) => {
    setReminders(prev => ({
      ...prev,
      [eventId]: {
        eventId,
        reminderDate: date,
        reminderTime: time,
      }
    }));
  };

  const clearReminder = (eventId: string) => {
    setReminders(prev => {
      const newReminders = { ...prev };
      delete newReminders[eventId];
      return newReminders;
    });
  };

  const getReminder = (eventId: string): EventReminder | undefined => {
    return reminders[eventId];
  };

  const hasReminder = (eventId: string): boolean => {
    return !!reminders[eventId];
  };

  const getAllReminders = (): EventReminder[] => {
    return Object.values(reminders);
  };

  return {
    reminders,
    setReminder,
    clearReminder,
    getReminder,
    hasReminder,
    getAllReminders
  };
}
