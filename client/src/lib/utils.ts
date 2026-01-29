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
 * Download ICS file or share it
 */
export function downloadOrShareICS(event: Event, festivalStartDate: Date) {
  const icsContent = generateICS(event, festivalStartDate);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const filename = `${event.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`;

  // Try Web Share API first (better on mobile)
  if (navigator.share && navigator.canShare) {
    const file = new File([blob], filename, { type: 'text/calendar' });

    if (navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: `Add ${event.name} to Calendar`,
        text: `${event.name} at ${event.location}`
      }).catch((error) => {
        // If share fails, fall back to download
        if (error.name !== 'AbortError') {
          downloadICSFile(blob, filename);
        }
      });
      return;
    }
  }

  // Fallback to direct download
  downloadICSFile(blob, filename);
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
