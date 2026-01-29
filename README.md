# Dimension Festival - Mobile Event App

A mobile-first progressive web application for the Dimension Festival 10th Anniversary Edition in Nukutawhiti, Northland, Aotearoa (New Zealand).

## Overview

This app helps festival attendees plan their experience by browsing the festival schedule, marking events they want to attend, and setting reminders. Built with a cyberpunk aesthetic featuring neon colors and a dark theme.

## Features

- **📅 Event Categories**: Browse music, performers, workshops, VJs, and more
- **⭐ Personal Planning**: Mark events as "Must See", "Nice to See", or "Going/Have"
- **⏰ Reminders**: Set custom date/time reminders for events
- **🗓️ My Plan**: View all your selected events organized by priority
- **🔔 Reminders Page**: Manage all your event reminders in one place
- **🗺️ Festival Info**: Access key times, transport info, and site map
- **📱 Mobile-First**: Optimized for mobile devices with touch-friendly UI
- **💾 Offline Storage**: All selections persist using browser localStorage

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Wouter** - Lightweight routing
- **Vaul** - Drawer/modal components
- **Lucide React** - Icons

### Backend
- **Express** - Server framework
- **Drizzle ORM** - Database toolkit
- **PostgreSQL** - Database

## Project Structure

```
DimensionReplit/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── data.ts        # Festival event data
│   │   └── App.tsx        # Main app component
│   └── public/            # Static assets
├── server/                # Backend Express server
├── shared/                # Shared types and utilities
└── dist/                  # Build output
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5000`

### Building for Production

```bash
# Build client and server
npm run build

# Start production server
npm start
```

## Festival Information

**Dimension Festival - 10th Anniversary Edition**

- **Location**: Nukutawhiti, Northland, Aotearoa NZ
- **Dates**: Friday - Monday
- **Stages**:
  - Astral Arena (Main Stage)
  - Nova Grove
  - Cosmic Cove (Workshops)
  - Teepee (Ceremonies)
  - Fire & Flow (Performance Workshops)

## Data Structure

Events are organized by category:

- **Music** - DJs and live acts at various stages
- **Performers** - Fire performers, flow artists, circus acts
- **Workshops** - Healing, learning, and creative sessions
- **VJs** - Visual artists and projections
- **Key Times** - Festival gates, transport schedules

All event data is stored in `client/src/data.ts` in JSON format.

## Features in Detail

### Event Planning
- Browse events by category and day
- Each event shows time, location, and duration
- Color-coded by category for easy identification
- Tap any event to see details and set status

### Status Options
- **Must See** ⭐ (Yellow) - Can't miss events
- **Nice to See** 👍 (Cyan) - Interesting but not critical
- **Going/Have** ✓ (Green) - Confirmed attendance

### Reminders
- Set custom date/time reminders for any event
- View all reminders in dedicated page
- Clear or modify reminders easily
- Persistent storage across sessions

### Mobile Optimization
- Touch-friendly tap targets
- Smooth drawer interactions
- No annoying scroll behavior
- Responsive layout for all screen sizes
- Horizontal scrollable navigation

## Development

### Adding Events
Edit `client/src/data.ts` to add or modify events:

```typescript
{
  "day": "sat",
  "name": "Event Name",
  "location": "Astral Arena",
  "startTime": "14:30",
  "endTime": "16:00",
  "lengthMinutes": 90
}
```

### Customizing Theme
Colors and styles are defined in `client/src/index.css`:
- `--neon-cyan`: Primary accent color
- `--neon-magenta`: Secondary accent
- `--neon-yellow`: Highlights
- `--neon-green`: Success states

## Deployment

### GitHub Pages

The app is configured for automatic deployment to GitHub Pages via GitHub Actions.

#### Setup Instructions:

1. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"

2. **Push to main branch**:
   ```bash
   git push origin main
   ```
   The GitHub Action will automatically build and deploy your site.

3. **Access your site**:
   - Your site will be available at: `https://<username>.github.io/DimensionReplit/`
   - Or your custom domain if configured

#### Manual Deployment:

If you prefer manual deployment:

```bash
# Build the client
npm run build:client

# The built files will be in dist/public/
# Deploy these files to your hosting service
```

#### Custom Domain:

If using a custom domain:

1. Update `vite.config.ts` and set `base: '/'` instead of `/DimensionReplit/`
2. Add a `CNAME` file to `client/public/` with your domain name
3. Configure your DNS settings to point to GitHub Pages

### Other Platforms
The app can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting service

## Browser Support

- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a community project for Dimension Festival attendees. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on mobile devices
5. Submit a pull request

## License

MIT License - feel free to use and modify for your own festivals and events.

## Acknowledgments

- Dimension Festival organizers and crew
- All the artists, performers, and workshop facilitators
- The Dimension community

---

Built with 💚 for the Dimension Festival family
