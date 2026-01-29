export type EventStatus = 'none' | 'must-see' | 'nice' | 'have';

export interface Event {
  id: string;
  name: string;
  location: string;
  startTime: string;
  endTime?: string;
  lengthMinutes?: number;
  day: string;
  category: 'music' | 'workshop' | 'performer' | 'vj';
  description?: string;
}

// Festival start date (Friday)
export const FESTIVAL_START_DATE = new Date(2025, 0, 31); // January 31, 2025 (Friday)

// Raw data from festival
const FESTIVAL_DATA = {
  "performers": [
    {
      "day": "fri",
      "name": "Go Green High Tea Party",
      "location": "Astral Arena",
      "startTime": "21:00",
      "endTime": "22:30",
      "lengthMinutes": 90
    },
    {
      "day": "fri",
      "name": "Kinetic Alignment",
      "location": "Astral Arena",
      "startTime": "22:30",
      "endTime": "23:00",
      "lengthMinutes": 30
    },
    {
      "day": "fri",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "23:00",
      "endTime": "23:30",
      "lengthMinutes": 30
    },
    {
      "day": "fri",
      "name": "Nova Grove Fire Synergy",
      "location": "Nova Grove",
      "startTime": "23:30",
      "endTime": "00:30",
      "lengthMinutes": 60
    },
    {
      "day": "sat",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "00:30",
      "endTime": "01:00",
      "lengthMinutes": 30
    },
    {
      "day": "sat",
      "name": "Nova Grove Fire Synergy",
      "location": "Nova Grove",
      "startTime": "01:00",
      "endTime": "02:00",
      "lengthMinutes": 60
    },
    {
      "day": "sat",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "02:00",
      "endTime": "12:30",
      "lengthMinutes": 630
    },
    {
      "day": "sat",
      "name": "Psy Circus",
      "location": "Astral Arena",
      "startTime": "12:30",
      "endTime": "15:30",
      "lengthMinutes": 180
    },
    {
      "day": "sat",
      "name": "Psy Circus",
      "location": "Astral Arena",
      "startTime": "15:30",
      "endTime": "17:30",
      "lengthMinutes": 120
    },
    {
      "day": "sat",
      "name": "Ascension",
      "location": "Astral Arena",
      "startTime": "17:30",
      "endTime": "18:30",
      "lengthMinutes": 60
    },
    {
      "day": "sat",
      "name": "Ascension",
      "location": "Astral Arena",
      "startTime": "18:30",
      "endTime": "20:00",
      "lengthMinutes": 90
    },
    {
      "day": "sat",
      "name": "Psy Circus",
      "location": "Astral Arena",
      "startTime": "20:00",
      "endTime": "21:00",
      "lengthMinutes": 60
    },
    {
      "day": "sat",
      "name": "Psy Circus",
      "location": "Cosmic Cove",
      "startTime": "21:00",
      "endTime": "21:30",
      "lengthMinutes": 30
    },
    {
      "day": "sat",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "21:30",
      "endTime": "22:00",
      "lengthMinutes": 30
    },
    {
      "day": "sat",
      "name": "Nova Grove Fire Synergy",
      "location": "Nova Grove",
      "startTime": "22:00",
      "endTime": "22:30",
      "lengthMinutes": 30
    },
    {
      "day": "sat",
      "name": "Dixiedoll Visionary Flow",
      "location": "Astral Arena",
      "startTime": "22:30",
      "endTime": "23:00",
      "lengthMinutes": 30
    },
    {
      "day": "sat",
      "name": "Kinetic Alignment",
      "location": "Astral Arena",
      "startTime": "23:00",
      "endTime": "23:30",
      "lengthMinutes": 30
    },
    {
      "day": "sat",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "23:30",
      "endTime": "00:00",
      "lengthMinutes": 30
    },
    {
      "day": "sun",
      "name": "Psy Circus",
      "location": "Cosmic Cove",
      "startTime": "00:00",
      "endTime": "00:30",
      "lengthMinutes": 30
    },
    {
      "day": "sun",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "00:30",
      "endTime": "01:00",
      "lengthMinutes": 30
    },
    {
      "day": "sun",
      "name": "Cosmic Cove Fire Odyssey",
      "location": "Cosmic Cove",
      "startTime": "01:00",
      "endTime": "01:30",
      "lengthMinutes": 30
    },
    {
      "day": "sun",
      "name": "Nova Grove Fire Synergy",
      "location": "Nova Grove",
      "startTime": "01:30",
      "endTime": "02:00",
      "lengthMinutes": 30
    },
    {
      "day": "sun",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "02:00",
      "endTime": "02:30",
      "lengthMinutes": 30
    },
    {
      "day": "sun",
      "name": "Psy Circus",
      "location": "Astral Arena",
      "startTime": "12:30",
      "endTime": "18:30",
      "lengthMinutes": 360
    },
    {
      "day": "sun",
      "name": "Ascension Vol 2",
      "location": "Astral Arena",
      "startTime": "18:30",
      "endTime": "20:00",
      "lengthMinutes": 90
    },
    {
      "day": "sun",
      "name": "Ascension Vol 2",
      "location": "Astral Arena",
      "startTime": "20:00",
      "endTime": "20:30",
      "lengthMinutes": 30
    },
    {
      "day": "sun",
      "name": "Transmutation",
      "location": "Astral Arena",
      "startTime": "20:30",
      "endTime": "21:00",
      "lengthMinutes": 30
    },
    {
      "day": "sun",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "21:00",
      "endTime": "22:00",
      "lengthMinutes": 60
    },
    {
      "day": "sun",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "22:00",
      "endTime": "22:30",
      "lengthMinutes": 30
    },
    {
      "day": "sun",
      "name": "Psy Circus",
      "location": "Cosmic Cove",
      "startTime": "22:30",
      "endTime": "23:00",
      "lengthMinutes": 30
    },
    {
      "day": "sun",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "23:00",
      "endTime": "00:30",
      "lengthMinutes": 90
    },
    {
      "day": "mon",
      "name": "Kinetic Alignment",
      "location": "Astral Arena",
      "startTime": "00:30",
      "endTime": "01:00",
      "lengthMinutes": 30
    },
    {
      "day": "mon",
      "name": "Astral Fire Flow",
      "location": "Astral Arena",
      "startTime": "01:00",
      "endTime": "01:30",
      "lengthMinutes": 30
    },
    {
      "day": "mon",
      "name": "Kinetic Alignment",
      "location": "Nova Grove",
      "startTime": "01:30",
      "endTime": "02:00",
      "lengthMinutes": 30
    },
    {
      "day": "mon",
      "name": "Cosmic Cove Fire Odyssey",
      "location": "Cosmic Cove",
      "startTime": "02:00",
      "endTime": "02:30",
      "lengthMinutes": 30
    },
    {
      "day": "mon",
      "name": "Psy Circus",
      "location": "Nova Grove",
      "startTime": "02:30",
      "endTime": "03:00",
      "lengthMinutes": 30
    },
    {
      "day": "mon",
      "name": "Psy Circus",
      "location": "Cosmic Cove",
      "startTime": "03:00",
      "endTime": "12:30",
      "lengthMinutes": 570
    },
    {
      "day": "mon",
      "name": "Psy Circus",
      "location": "Astral Arena",
      "startTime": "12:30",
      "endTime": "14:00",
      "lengthMinutes": 90
    },
    {
      "day": "mon",
      "name": "Psy Circus",
      "location": "Astral Arena",
      "startTime": "14:00",
      "endTime": "15:00",
      "lengthMinutes": 60
    },
    {
      "day": "mon",
      "name": "The Afterglow",
      "location": "Astral Arena",
      "startTime": "15:00",
      "endTime": "16:30",
      "lengthMinutes": 90
    }
  ],
  "music": [
    {
      "location": "Astral Arena",
      "events": [
        {
          "day": "fri",
          "name": "Opening Ceremony",
          "startTime": "14:30",
          "endTime": "15:00",
          "lengthMinutes": 30
        },
        {
          "day": "fri",
          "name": "Terranine in Psy",
          "startTime": "15:00",
          "endTime": "16:30",
          "lengthMinutes": 90
        },
        {
          "day": "fri",
          "name": "Vivaek",
          "startTime": "16:30",
          "endTime": "18:00",
          "lengthMinutes": 90
        },
        {
          "day": "fri",
          "name": "Shamanik Bunny",
          "startTime": "18:00",
          "endTime": "19:30",
          "lengthMinutes": 90
        },
        {
          "day": "fri",
          "name": "Finch",
          "startTime": "19:30",
          "endTime": "21:00",
          "lengthMinutes": 90
        },
        {
          "day": "fri",
          "name": "Sharkra",
          "startTime": "21:00",
          "endTime": "22:30",
          "lengthMinutes": 90
        },
        {
          "day": "fri",
          "name": "Megapixel",
          "startTime": "22:30",
          "endTime": "00:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Chromatone",
          "startTime": "00:00",
          "endTime": "01:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Big Dave",
          "startTime": "01:30",
          "endTime": "03:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "ICU",
          "startTime": "03:00",
          "endTime": "04:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Glacial",
          "startTime": "04:30",
          "endTime": "06:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Simiantics",
          "startTime": "06:00",
          "endTime": "07:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Ijigga",
          "startTime": "07:30",
          "endTime": "09:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Dynamite",
          "startTime": "09:00",
          "endTime": "10:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Platypuss",
          "startTime": "10:30",
          "endTime": "12:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Greenwolve",
          "startTime": "12:00",
          "endTime": "13:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Antix",
          "startTime": "13:30",
          "endTime": "15:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Emok",
          "startTime": "15:00",
          "endTime": "16:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Ace Ventura",
          "startTime": "16:30",
          "endTime": "19:30",
          "lengthMinutes": 180
        },
        {
          "day": "sat",
          "name": "Molly",
          "startTime": "19:30",
          "endTime": "21:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Ozzy",
          "startTime": "21:00",
          "endTime": "22:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Mekkanikka",
          "startTime": "22:30",
          "endTime": "00:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Jungli",
          "startTime": "00:00",
          "endTime": "01:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Unexpected",
          "startTime": "01:30",
          "endTime": "03:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Psybaba",
          "startTime": "03:00",
          "endTime": "04:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Akasha",
          "startTime": "04:30",
          "endTime": "06:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Mota Bhai",
          "startTime": "06:00",
          "endTime": "07:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Makolly",
          "startTime": "07:30",
          "endTime": "09:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Saija",
          "startTime": "09:00",
          "endTime": "10:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Semilocybe",
          "startTime": "10:30",
          "endTime": "12:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Cosmck-J",
          "startTime": "12:00",
          "endTime": "13:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Ashwynz",
          "startTime": "13:30",
          "endTime": "15:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "MTM",
          "startTime": "15:00",
          "endTime": "16:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Renegade DJ",
          "startTime": "16:30",
          "endTime": "18:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Flow Theory",
          "startTime": "18:00",
          "endTime": "19:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Ajja",
          "startTime": "19:30",
          "endTime": "22:30",
          "lengthMinutes": 180
        },
        {
          "day": "mon",
          "name": "Biggins",
          "startTime": "00:00",
          "endTime": "01:30",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Jumpstreet",
          "startTime": "01:30",
          "endTime": "03:00",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Mavzy",
          "startTime": "03:00",
          "endTime": "04:30",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Subchamatkar",
          "startTime": "04:30",
          "endTime": "06:00",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Junky Monkey",
          "startTime": "06:00",
          "endTime": "07:30",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Sapian",
          "startTime": "07:30",
          "endTime": "09:00",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Mr Mils",
          "startTime": "09:00",
          "endTime": "10:30",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Barfly",
          "startTime": "10:30",
          "endTime": "12:00",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Sonic Climax",
          "startTime": "12:00",
          "endTime": "13:30",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Special Guest",
          "startTime": "13:30",
          "endTime": "15:00",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Special Guest",
          "startTime": "15:00",
          "endTime": "16:30",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Big Dave",
          "startTime": "16:30",
          "endTime": "17:00",
          "lengthMinutes": 30
        }
      ]
    },
    {
      "location": "Nova Grove",
      "events": [
        {
          "day": "fri",
          "name": "Mistype",
          "startTime": "17:00",
          "endTime": "18:30",
          "lengthMinutes": 90
        },
        {
          "day": "fri",
          "name": "Toy Purple",
          "startTime": "18:30",
          "endTime": "20:00",
          "lengthMinutes": 90
        },
        {
          "day": "fri",
          "name": "Weka Tek",
          "startTime": "20:00",
          "endTime": "21:30",
          "lengthMinutes": 90
        },
        {
          "day": "fri",
          "name": "Pitch Black",
          "startTime": "21:30",
          "endTime": "23:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Paige Julia",
          "startTime": "00:30",
          "endTime": "02:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Optimus Gryme",
          "startTime": "02:00",
          "endTime": "03:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Heathen",
          "startTime": "03:30",
          "endTime": "05:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Hōna",
          "startTime": "11:00",
          "endTime": "13:00",
          "lengthMinutes": 120
        },
        {
          "day": "sat",
          "name": "Zaenth",
          "startTime": "13:00",
          "endTime": "14:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Abeat Lost",
          "startTime": "14:30",
          "endTime": "16:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Kompulse",
          "startTime": "16:00",
          "endTime": "17:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Dietrich",
          "startTime": "17:30",
          "endTime": "19:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Ohana",
          "startTime": "19:00",
          "endTime": "21:00",
          "lengthMinutes": 120
        },
        {
          "day": "sat",
          "name": "Tom Baker",
          "startTime": "21:00",
          "endTime": "23:00",
          "lengthMinutes": 120
        },
        {
          "day": "sun",
          "name": "Mallki",
          "startTime": "23:00",
          "endTime": "01:00",
          "lengthMinutes": 120
        },
        {
          "day": "sun",
          "name": "Unknown Concept",
          "startTime": "01:00",
          "endTime": "03:00",
          "lengthMinutes": 120
        },
        {
          "day": "sun",
          "name": "Bushtalk",
          "startTime": "03:00",
          "endTime": "05:00",
          "lengthMinutes": 120
        },
        {
          "day": "sun",
          "name": "Morgan Drops",
          "startTime": "05:00",
          "endTime": "07:00",
          "lengthMinutes": 120
        },
        {
          "day": "sun",
          "name": "4th Shaman",
          "startTime": "11:00",
          "endTime": "13:00",
          "lengthMinutes": 120
        },
        {
          "day": "sun",
          "name": "Ellaluna",
          "startTime": "13:00",
          "endTime": "14:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Aman Deep",
          "startTime": "14:30",
          "endTime": "16:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Improper Presence",
          "startTime": "16:00",
          "endTime": "17:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Ozzy Kay",
          "startTime": "17:30",
          "endTime": "19:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Donna Marie",
          "startTime": "19:00",
          "endTime": "20:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Neurai",
          "startTime": "20:30",
          "endTime": "22:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "The Piper",
          "startTime": "22:00",
          "endTime": "00:00",
          "lengthMinutes": 120
        },
        {
          "day": "mon",
          "name": "Kozy",
          "startTime": "00:00",
          "endTime": "02:00",
          "lengthMinutes": 120
        },
        {
          "day": "mon",
          "name": "Greenwolve",
          "startTime": "02:00",
          "endTime": "04:00",
          "lengthMinutes": 120
        },
        {
          "day": "mon",
          "name": "Aztoria",
          "startTime": "04:00",
          "endTime": "06:00",
          "lengthMinutes": 120
        },
        {
          "day": "mon",
          "name": "Rakish",
          "startTime": "06:00",
          "endTime": "08:00",
          "lengthMinutes": 120
        },
        {
          "day": "mon",
          "name": "Ohana (Closing Set)",
          "startTime": "08:00",
          "endTime": "09:00",
          "lengthMinutes": 60
        }
      ]
    }
  ],
  "workshops": [
    {
      "location": "Cosmic Cove",
      "events": [
        {
          "day": "sat",
          "name": "Slow Flow Yoga",
          "startTime": "09:00",
          "endTime": "10:00",
          "lengthMinutes": 60
        },
        {
          "day": "sat",
          "name": "Reclaim Your Cycle",
          "startTime": "10:00",
          "endTime": "11:00",
          "lengthMinutes": 60
        },
        {
          "day": "sat",
          "name": "Inner Dimensions with Psychedelics",
          "startTime": "11:00",
          "endTime": "12:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Conscious Dating",
          "startTime": "12:30",
          "endTime": "13:30",
          "lengthMinutes": 60
        },
        {
          "day": "sat",
          "name": "Music Production with Akashic Records",
          "startTime": "13:30",
          "endTime": "15:00",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Harakeke Weaving",
          "startTime": "15:00",
          "endTime": "16:30",
          "lengthMinutes": 90
        },
        {
          "day": "sat",
          "name": "Somatic Dance for Men",
          "startTime": "16:30",
          "endTime": "18:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Metta Breathwork",
          "startTime": "09:00",
          "endTime": "10:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Heart Opening Yoga",
          "startTime": "10:30",
          "endTime": "12:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Inner Dimensions with Psychedelics",
          "startTime": "12:00",
          "endTime": "13:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Intro to Tantra",
          "startTime": "13:30",
          "endTime": "15:00",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Authentic Relating",
          "startTime": "15:00",
          "endTime": "16:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Haka with Aroha",
          "startTime": "16:30",
          "endTime": "18:00",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Cosmic Sound Journey",
          "startTime": "09:00",
          "endTime": "10:00",
          "lengthMinutes": 60
        },
        {
          "day": "mon",
          "name": "Yin Yoga",
          "startTime": "10:00",
          "endTime": "11:30",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Macrame Jewellery",
          "startTime": "11:30",
          "endTime": "13:00",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Acro Yoga",
          "startTime": "13:00",
          "endTime": "14:30",
          "lengthMinutes": 90
        },
        {
          "day": "mon",
          "name": "Didgeridoo",
          "startTime": "14:30",
          "endTime": "16:00",
          "lengthMinutes": 90
        }
      ]
    },
    {
      "location": "Teepee",
      "events": [
        {
          "day": "sat",
          "name": "Medicine Offerings",
          "startTime": "11:00",
          "endTime": "13:00",
          "lengthMinutes": 120
        },
        {
          "day": "sat",
          "name": "Align and Ascend – Divination",
          "startTime": "13:00",
          "endTime": "16:00",
          "lengthMinutes": 180
        },
        {
          "day": "sat",
          "name": "Womans Sharing Circle",
          "startTime": "16:00",
          "endTime": "19:30",
          "lengthMinutes": 210
        },
        {
          "day": "sat",
          "name": "Kirtan",
          "startTime": "19:30",
          "endTime": "20:30",
          "lengthMinutes": 60
        },
        {
          "day": "sat",
          "name": "Fire and Rhythms",
          "startTime": "20:30",
          "endTime": "23:30",
          "lengthMinutes": 180
        },
        {
          "day": "sun",
          "name": "Medicine Offerings",
          "startTime": "11:00",
          "endTime": "13:00",
          "lengthMinutes": 120
        },
        {
          "day": "sun",
          "name": "Innocense of Eros",
          "startTime": "13:00",
          "endTime": "14:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Mens Sharing Circle",
          "startTime": "14:30",
          "endTime": "19:00",
          "lengthMinutes": 270
        },
        {
          "day": "sun",
          "name": "Kirtan",
          "startTime": "19:00",
          "endTime": "20:30",
          "lengthMinutes": 90
        },
        {
          "day": "sun",
          "name": "Full Moon Ceremony",
          "startTime": "20:30",
          "endTime": "23:30",
          "lengthMinutes": 180
        },
        {
          "day": "mon",
          "name": "Medicine Offerings",
          "startTime": "11:00",
          "endTime": "12:00",
          "lengthMinutes": 60
        },
        {
          "day": "mon",
          "name": "Sands of Time Story Time",
          "startTime": "12:00",
          "endTime": "13:00",
          "lengthMinutes": 60
        },
        {
          "day": "mon",
          "name": "Mixed Sharing Circle",
          "startTime": "13:00",
          "endTime": "15:00",
          "lengthMinutes": 120
        }
      ]
    },
    {
      "location": "Fire & Flow",
      "events": [
        {
          "day": "sat",
          "name": "Juggling | Zion",
          "startTime": "11:00",
          "endTime": "12:15",
          "lengthMinutes": 75
        },
        {
          "day": "sat",
          "name": "Poi | Marc",
          "startTime": "12:15",
          "endTime": "13:30",
          "lengthMinutes": 75
        },
        {
          "day": "sat",
          "name": "Contact Staff | Liao & Iris",
          "startTime": "13:30",
          "endTime": "14:45",
          "lengthMinutes": 75
        },
        {
          "day": "sat",
          "name": "Dragon Staff | Taliesin",
          "startTime": "14:45",
          "endTime": "16:00",
          "lengthMinutes": 75
        },
        {
          "day": "sat",
          "name": "Swords | Kelsey",
          "startTime": "16:00",
          "endTime": "17:15",
          "lengthMinutes": 75
        },
        {
          "day": "sun",
          "name": "Poi | Josh",
          "startTime": "11:00",
          "endTime": "12:15",
          "lengthMinutes": 75
        },
        {
          "day": "sun",
          "name": "Juggling | Benji",
          "startTime": "12:15",
          "endTime": "13:30",
          "lengthMinutes": 75
        },
        {
          "day": "sun",
          "name": "Dragon Staff | Zhanti",
          "startTime": "13:30",
          "endTime": "14:45",
          "lengthMinutes": 75
        },
        {
          "day": "sun",
          "name": "Fans | Mika",
          "startTime": "14:45",
          "endTime": "16:00",
          "lengthMinutes": 75
        },
        {
          "day": "sun",
          "name": "Rope Dart | Hugin",
          "startTime": "16:00",
          "endTime": "17:15",
          "lengthMinutes": 75
        },
        {
          "day": "mon",
          "name": "Partner Poi | Ruby & Nathan",
          "startTime": "11:00",
          "endTime": "12:15",
          "lengthMinutes": 75
        },
        {
          "day": "mon",
          "name": "Staves | Andreas",
          "startTime": "12:15",
          "endTime": "13:30",
          "lengthMinutes": 75
        },
        {
          "day": "mon",
          "name": "Rope Staff | Jonty",
          "startTime": "13:30",
          "endTime": "14:45",
          "lengthMinutes": 75
        }
      ]
    }
  ],
  "vjs": [
    {
      "location": "Astral Arena",
      "events": [
        {
          "day": "fri",
          "name": "Visualanti",
          "startTime": "21:00",
          "endTime": "23:00",
          "lengthMinutes": 120
        },
        {
          "day": "fri",
          "name": "Fractually",
          "startTime": "23:00",
          "endTime": "01:00",
          "lengthMinutes": 120
        },
        {
          "day": "sat",
          "name": "ICU",
          "startTime": "01:00",
          "endTime": "03:00",
          "lengthMinutes": 120
        },
        {
          "day": "sat",
          "name": "Lumos",
          "startTime": "03:00",
          "endTime": "21:00",
          "lengthMinutes": 1080
        },
        {
          "day": "sun",
          "name": "ICU",
          "startTime": "21:00",
          "endTime": "23:00",
          "lengthMinutes": 120
        },
        {
          "day": "sun",
          "name": "Fractually",
          "startTime": "23:00",
          "endTime": "01:00",
          "lengthMinutes": 120
        },
        {
          "day": "mon",
          "name": "Visualanti",
          "startTime": "01:00",
          "endTime": "03:00",
          "lengthMinutes": 120
        }
      ]
    }
  ],
  "key_times": {
    "festival": [
      {
        "day": "fri",
        "time": "10:00",
        "label": "Festival Site & Gates Open"
      },
      {
        "day": "sun",
        "time": "02:00",
        "label": "Festival Site & Gates Closed"
      }
    ],
    "transport": [
      {
        "day": "fri",
        "time": "13:00",
        "label": "Bus from Auckland Arrival"
      },
      {
        "day": "tue",
        "time": "09:00",
        "label": "Bus to Auckland Departure"
      }
    ]
  }
};

// Helper to convert day abbreviation to full name
const dayMap: Record<string, string> = {
  'fri': 'Friday',
  'sat': 'Saturday',
  'sun': 'Sunday',
  'mon': 'Monday',
  'tue': 'Tuesday'
};

// Transform nested music/workshop data to flat event list
function transformLocationEvents(locationData: any[], category: Event['category']): Event[] {
  const events: Event[] = [];

  locationData.forEach((locationObj) => {
    locationObj.events.forEach((event: any, index: number) => {
      const id = `${category}-${locationObj.location.toLowerCase().replace(/\s+/g, '-')}-${event.day}-${index}`;
      events.push({
        id,
        name: event.name,
        location: locationObj.location,
        startTime: event.startTime,
        endTime: event.endTime,
        lengthMinutes: event.lengthMinutes,
        day: dayMap[event.day] || event.day,
        category
      });
    });
  });

  return events;
}

// Transform flat performer/vj data to event list
function transformFlatEvents(flatData: any[], category: Event['category']): Event[] {
  return flatData.map((event, index) => ({
    id: `${category}-${event.location.toLowerCase().replace(/\s+/g, '-')}-${event.day}-${index}`,
    name: event.name,
    location: event.location,
    startTime: event.startTime,
    endTime: event.endTime,
    lengthMinutes: event.lengthMinutes,
    day: dayMap[event.day] || event.day,
    category
  }));
}

// Generate all events from festival data
export const EVENTS: Event[] = [
  ...transformFlatEvents(FESTIVAL_DATA.performers, 'performer'),
  ...transformLocationEvents(FESTIVAL_DATA.music, 'music'),
  ...transformLocationEvents(FESTIVAL_DATA.workshops, 'workshop'),
  ...transformLocationEvents(FESTIVAL_DATA.vjs, 'vj'),
];

// Export key times for separate display
export const KEY_TIMES = FESTIVAL_DATA.key_times;
