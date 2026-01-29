import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Event } from "@/data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert day name to date offset from festival start
 */
function getDayOffset(day: string): number {
  const dayMap: Record<string, number> = {
    'Friday': 0,
    'Saturday': 1,
    'Sunday': 2,
    'Monday': 3,
    'Tuesday': 4
  };
  return dayMap[day] || 0;
}

/**
 * Format date for ICS file (YYYYMMDDTHHMMSS)
 */
function formatICSDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Parse time string (HH:MM) and combine with date
 */
function parseEventDateTime(festivalStartDate: Date, day: string, timeString: string): Date {
  const dayOffset = getDayOffset(day);
  const [hours, minutes] = timeString.split(':').map(Number);

  const eventDate = new Date(festivalStartDate);
  eventDate.setDate(eventDate.getDate() + dayOffset);
  eventDate.setHours(hours, minutes, 0, 0);

  return eventDate;
}

/**
 * Generate ICS calendar file content for an event
 */
export function generateICS(event: Event, festivalStartDate: Date): string {
  const startDateTime = parseEventDateTime(festivalStartDate, event.day, event.startTime);

  // Calculate end time
  let endDateTime: Date;
  if (event.endTime) {
    endDateTime = parseEventDateTime(festivalStartDate, event.day, event.endTime);

    // Handle events that go past midnight
    if (endDateTime < startDateTime) {
      endDateTime.setDate(endDateTime.getDate() + 1);
    }
  } else if (event.lengthMinutes) {
    endDateTime = new Date(startDateTime.getTime() + event.lengthMinutes * 60000);
  } else {
    // Default to 1 hour if no end time specified
    endDateTime = new Date(startDateTime.getTime() + 60 * 60000);
  }

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dimension Festival//Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@dimension-festival`,
    `DTSTART:${formatICSDate(startDateTime)}`,
    `DTEND:${formatICSDate(endDateTime)}`,
    `SUMMARY:${event.name}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.name} at ${event.location}${event.description ? '\\n\\n' + event.description : ''}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Event reminder: 30 minutes before',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

/**
 * Generate Google Calendar URL
 */
export function generateGoogleCalendarURL(event: Event, festivalStartDate: Date): string {
  const startDateTime = parseEventDateTime(festivalStartDate, event.day, event.startTime);

  let endDateTime: Date;
  if (event.endTime) {
    endDateTime = parseEventDateTime(festivalStartDate, event.day, event.endTime);
    if (endDateTime < startDateTime) {
      endDateTime.setDate(endDateTime.getDate() + 1);
    }
  } else if (event.lengthMinutes) {
    endDateTime = new Date(startDateTime.getTime() + event.lengthMinutes * 60000);
  } else {
    endDateTime = new Date(startDateTime.getTime() + 60 * 60000);
  }

  // Format dates for Google Calendar (YYYYMMDDTHHmmss)
  const formatGoogleDate = (date: Date) => {
    return formatICSDate(date).replace(/[-:]/g, '');
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.name,
    dates: `${formatGoogleDate(startDateTime)}/${formatGoogleDate(endDateTime)}`,
    details: `${event.name} at ${event.location}${event.description ? '\n\n' + event.description : ''}`,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Download ICS file
 */
export function downloadICS(event: Event, festivalStartDate: Date) {
  const icsContent = generateICS(event, festivalStartDate);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const filename = `${event.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`;

  // For iOS, try to open the ICS file directly
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    // Create data URL for iOS
    const dataUrl = URL.createObjectURL(blob);
    window.location.href = dataUrl;
    setTimeout(() => URL.revokeObjectURL(dataUrl), 100);
  } else {
    downloadICSFile(blob, filename);
  }
}

/**
 * Open Google Calendar with event
 */
export function openGoogleCalendar(event: Event, festivalStartDate: Date) {
  const url = generateGoogleCalendarURL(event, festivalStartDate);
  window.open(url, '_blank');
}

/**
 * Legacy function - kept for compatibility
 * @deprecated Use downloadICS or openGoogleCalendar instead
 */
export function downloadOrShareICS(event: Event, festivalStartDate: Date) {
  downloadICS(event, festivalStartDate);
}

/**
 * Trigger ICS file download
 */
function downloadICSFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
