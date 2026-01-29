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
    console.log(eventId, nextStatus)
    const oldSchedule = localStorage.getItem('dimension-schedule');
    const jsonSchedule = oldSchedule ? JSON.parse(oldSchedule) : {};
    const theItem = jsonSchedule[eventId];
    if (theItem && theItem === nextStatus) {
      delete jsonSchedule[eventId];
    } else {
      jsonSchedule[eventId] = nextStatus;
    }

    setSchedule({...jsonSchedule})
    // setSchedule(prev => ({
    //   ...prev,
    //   [eventId]: nextStatus
    // }));
  };

  const getStatus = (eventId: string): EventStatus => {
    return schedule[eventId] || 'none';
  };

  return { schedule, toggleStatus, getStatus };
}
