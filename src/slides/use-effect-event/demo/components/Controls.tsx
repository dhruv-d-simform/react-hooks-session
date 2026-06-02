type Room = 'general' | 'random' | 'react';
type Theme = 'dark' | 'light';

const ROOMS: Room[] = ['general', 'random', 'react'];

export function Controls({
    room,
    theme,
    onRoom,
    onTheme,
}: {
    room: Room;
    theme: Theme;
    onRoom: (r: Room) => void;
    onTheme: (t: Theme) => void;
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 w-12">
                    Room
                </span>
                {ROOMS.map((r) => (
                    <button
                        key={r}
                        onClick={() => onRoom(r)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border ${
                            room === r
                                ? 'bg-indigo-600 border-indigo-500 text-white'
                                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        #{r}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 w-12">
                    Theme
                </span>
                <button
                    onClick={() => onTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    Toggle ({theme})
                </button>
            </div>
        </div>
    );
}
