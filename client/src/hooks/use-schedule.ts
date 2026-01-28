import { useState, useEffect } from 'react';
import { EventStatus } from '../data';

type ScheduleState = Record<string, EventStatus>;

export function useSchedule() {
  const [schedule, setSchedule] = useState<ScheduleState>(() => {
    const saved = localStorage.getItem('dimension-schedule');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('dimension-schedule', JSON.stringify(schedule));
  }, [schedule]);

  const toggleStatus = (eventId: string, nextStatus: EventStatus) => {
    setSchedule(prev => ({
      ...prev,
      [eventId]: nextStatus
    }));
  };

  const getStatus = (eventId: string): EventStatus => {
    return schedule[eventId] || 'none';
  };

  return { schedule, toggleStatus, getStatus };
}
