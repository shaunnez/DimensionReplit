import { useState, useEffect } from 'react';

export interface EventReminder {
  eventId: string;
  reminderDate: string; // ISO date string
  reminderTime: string; // HH:MM format
  eventName?: string;
  notificationScheduled?: boolean;
}

type RemindersState = Record<string, EventReminder>;

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    return await Notification.requestPermission();
  }

  return Notification.permission;
}

// Get base URL for assets
const getBaseUrl = () => {
  // Use Vite's base URL if available, otherwise default to /
  if (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) {
    return import.meta.env.BASE_URL;
  }
  return '/';
};

// Schedule a notification for an event
function scheduleNotification(eventId: string, eventName: string, reminderDateTime: string) {
  const now = new Date();
  const reminderTime = new Date(reminderDateTime);
  const timeUntilReminder = reminderTime.getTime() - now.getTime();
  const baseUrl = getBaseUrl();

  // Only schedule if the reminder is in the future
  if (timeUntilReminder > 0) {
    // For service worker-based notifications
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SCHEDULE_NOTIFICATION',
        eventId,
        eventName,
        eventTime: reminderDateTime
      });
    }

    // Also schedule using setTimeout as a fallback (only works while page is open)
    setTimeout(() => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Event Reminder - Dimension Festival', {
          body: `${eventName} is starting soon!`,
          icon: `${baseUrl}icon-192.png`,
          badge: `${baseUrl}icon-192.png`,
          tag: eventId,
          requireInteraction: true,
          vibrate: [200, 100, 200, 100, 200]
        });
      }
    }, timeUntilReminder);
  }
}

export function useReminders() {
  const [reminders, setReminders] = useState<RemindersState>(() => {
    const saved = localStorage.getItem('dimension-reminders');
    return saved ? JSON.parse(saved) : {};
  });
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );

  useEffect(() => {
    localStorage.setItem('dimension-reminders', JSON.stringify(reminders));
  }, [reminders]);

  const setReminder = async (eventId: string, date: string, time: string, eventName?: string) => {
    // Request notification permission if not already granted
    const permission = await requestNotificationPermission();
    setNotificationPermission(permission);

    const reminderDateTime = `${date}T${time}:00`;

    // Schedule the notification
    if (permission === 'granted' && eventName) {
      scheduleNotification(eventId, eventName, reminderDateTime);
    }

    setReminders(prev => ({
      ...prev,
      [eventId]: {
        eventId,
        reminderDate: date,
        reminderTime: time,
        eventName,
        notificationScheduled: permission === 'granted'
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
    getAllReminders,
    notificationPermission,
    requestNotificationPermission: async () => {
      const permission = await requestNotificationPermission();
      setNotificationPermission(permission);
      return permission;
    }
  };
}
