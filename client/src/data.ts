export type EventStatus = 'none' | 'must-see' | 'nice' | 'have';

export interface Event {
  id: string;
  title: string;
  location: string;
  startTime: string; // ISO string or just time string for prototype
  day: string; // "Friday", "Saturday", "Sunday"
  category: 'music' | 'workshop' | 'performance';
  description?: string;
}

export const EVENTS: Event[] = [
  // COSMIC COVE WORKSHOPS - SATURDAY
  { id: 'cc-1', title: 'Slow Flow Yoga', location: 'Cosmic Cove', startTime: '08:00 AM', day: 'Saturday', category: 'workshop' },
  { id: 'cc-2', title: 'Reclaim Your Cycle', location: 'Cosmic Cove', startTime: '10:00 AM', day: 'Saturday', category: 'workshop' },
  { id: 'cc-3', title: 'Inner Dimensions with Psychedelics', location: 'Cosmic Cove', startTime: '11:00 AM', day: 'Saturday', category: 'workshop' },
  { id: 'cc-4', title: 'Conscious Dating', location: 'Cosmic Cove', startTime: '12:30 PM', day: 'Saturday', category: 'workshop' },
  { id: 'cc-5', title: 'Music Production with Akashic Records', location: 'Cosmic Cove', startTime: '01:30 PM', day: 'Saturday', category: 'workshop' },
  { id: 'cc-6', title: 'Harakeke Weaving', location: 'Cosmic Cove', startTime: '03:00 PM', day: 'Saturday', category: 'workshop' },
  { id: 'cc-7', title: 'Somatic Dance For Men', location: 'Cosmic Cove', startTime: '04:30 PM', day: 'Saturday', category: 'workshop' },

  // TEEPEE WORKSHOPS - SATURDAY
  { id: 'tp-1', title: 'Medicine Offerings', location: 'Teepee', startTime: '11:00 AM', day: 'Saturday', category: 'workshop' },
  { id: 'tp-2', title: 'Align and Ascend - Divination', location: 'Teepee', startTime: '01:00 PM', day: 'Saturday', category: 'workshop' },
  { id: 'tp-3', title: 'Womans Sharing Circle', location: 'Teepee', startTime: '04:00 PM', day: 'Saturday', category: 'workshop' },
  { id: 'tp-4', title: 'Kirtan', location: 'Teepee', startTime: '07:30 PM', day: 'Saturday', category: 'workshop' },

  // FIRE & FLOW WORKSHOPS - SATURDAY
  { id: 'ff-1', title: 'Juggling | Zion', location: 'Fire & Flow', startTime: '11:00 AM', day: 'Saturday', category: 'workshop' },
  { id: 'ff-2', title: 'Poi | Marc', location: 'Fire & Flow', startTime: '12:15 PM', day: 'Saturday', category: 'workshop' },
  { id: 'ff-3', title: 'Contact Staff | Iao & Iris', location: 'Fire & Flow', startTime: '01:30 PM', day: 'Saturday', category: 'workshop' },

  // ASTRAL ARENA - FRIDAY
  { id: 'aa-1', title: 'Opening Ceremony', location: 'Astral Arena', startTime: '03:00 PM', day: 'Friday', category: 'music' },
  { id: 'aa-2', title: 'Terranine in Dub', location: 'Astral Arena', startTime: '04:30 PM', day: 'Friday', category: 'music' },
  { id: 'aa-3', title: 'Shamanik Bunny', location: 'Astral Arena', startTime: '06:00 PM', day: 'Friday', category: 'music' },
  { id: 'aa-4', title: 'Finch', location: 'Astral Arena', startTime: '07:30 PM', day: 'Friday', category: 'music' },
  { id: 'aa-5', title: 'Sharkra', location: 'Astral Arena', startTime: '09:00 PM', day: 'Friday', category: 'music' },
  { id: 'aa-6', title: 'Megapixel', location: 'Astral Arena', startTime: '10:30 PM', day: 'Friday', category: 'music' },

  // ASTRAL ARENA - SATURDAY
  { id: 'aa-7', title: 'Chromatone', location: 'Astral Arena', startTime: '12:00 AM', day: 'Saturday', category: 'music' },
  { id: 'aa-8', title: 'Big Dave', location: 'Astral Arena', startTime: '01:30 AM', day: 'Saturday', category: 'music' },
  { id: 'aa-9', title: 'IOU', location: 'Astral Arena', startTime: '03:00 AM', day: 'Saturday', category: 'music' },

  // NOVA GROVE - FRIDAY
  { id: 'ng-1', title: 'Mistype', location: 'Nova Grove', startTime: '05:00 PM', day: 'Friday', category: 'music' },
  { id: 'ng-2', title: 'Toy Purple', location: 'Nova Grove', startTime: '06:30 PM', day: 'Friday', category: 'music' },
  { id: 'ng-3', title: 'Weka Tek', location: 'Nova Grove', startTime: '08:00 PM', day: 'Friday', category: 'music' },
  { id: 'ng-4', title: 'Pitch Black', location: 'Nova Grove', startTime: '09:30 PM', day: 'Friday', category: 'music' },
  
  // PERFORMERS - VARIOUS
  { id: 'pf-1', title: 'Astral Fire Flow', location: 'Astral Arena', startTime: '11:00 PM', day: 'Friday', category: 'performance' },
  { id: 'pf-2', title: 'Psy Circus', location: 'Astral Arena', startTime: '12:30 PM', day: 'Saturday', category: 'performance' },
  { id: 'pf-3', title: 'Ascension', location: 'Astral Arena', startTime: '05:30 PM', day: 'Saturday', category: 'performance' },
];
