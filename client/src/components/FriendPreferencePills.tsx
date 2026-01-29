import { useFriendsLists } from '@/hooks/use-friends-lists';
import { EventStatus } from '@/data';
import { cn } from '@/lib/utils';

interface FriendPreferencePillsProps {
  eventId: string;
}

// Color configuration based on preference status
const pillColors: Record<Exclude<EventStatus, 'none'>, { bg: string; text: string; border: string }> = {
  'must-see': {
    bg: 'bg-neon-yellow/20',
    text: 'text-neon-yellow',
    border: 'border-neon-yellow/50',
  },
  'nice': {
    bg: 'bg-neon-cyan/20',
    text: 'text-neon-cyan',
    border: 'border-neon-cyan/50',
  },
  'have': {
    bg: 'bg-neon-green/20',
    text: 'text-neon-green',
    border: 'border-neon-green/50',
  },
};

interface FriendWithStatus {
  name: string;
  status: Exclude<EventStatus, 'none'>;
}

export function FriendPreferencePills({ eventId }: FriendPreferencePillsProps) {
  const { friendsLists } = useFriendsLists();

  // Find friends who have this event in their schedule
  const friendsWithEvent: FriendWithStatus[] = friendsLists
    .filter(friend => {
      const status = friend.schedule[eventId];
      return status && status !== 'none';
    })
    .map(friend => ({
      name: friend.name,
      status: friend.schedule[eventId] as Exclude<EventStatus, 'none'>,
    }));

  if (friendsWithEvent.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5 mt-2">
      {friendsWithEvent.map((friend, index) => {
        const colors = pillColors[friend.status];
        const firstLetter = friend.name.charAt(0).toUpperCase();

        return (
          <div
            key={`${friend.name}-${index}`}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center",
              "text-xs font-bold font-mono border",
              "transition-all duration-200",
              colors.bg,
              colors.text,
              colors.border
            )}
            title={`${friend.name} - ${friend.status === 'must-see' ? 'Must See' : friend.status === 'nice' ? 'Nice to see' : 'Going/Have'}`}
          >
            {firstLetter}
          </div>
        );
      })}
    </div>
  );
}
