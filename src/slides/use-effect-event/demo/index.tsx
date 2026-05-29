import { useState, useEffect, useRef } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-effect-event/demo/index.tsx';

type Tab = 'problem' | 'workaround';
type Room = 'general' | 'random' | 'react';
type Theme = 'dark' | 'light';

const ROOMS: Room[] = ['general', 'random', 'react'];

const TAB_LABELS: Record<Tab, string> = {
    problem: 'Problem',
    workaround: 'Ref Workaround',
};

function ProblemDemo() {
    const [room, setRoom] = useState<Room>('general');
    const [theme, setTheme] = useState<Theme>('dark');
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) =>
        setLog((prev) => [msg, ...prev].slice(0, 6));

    useEffect(() => {
        addLog(`[${theme}] Connected to #${room}`);
        return () => {
            addLog(`[${theme}] Disconnected from #${room}`);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room, theme]); // theme in deps → reconnects on theme change ❌

    return (
        <div className="space-y-3">
            <div className="bg-rose-900/15 border border-rose-700/25 rounded-lg p-2.5">
                <p className="text-[10px] text-rose-400">
                    ❌ theme is in deps — changing theme reconnects the room
                </p>
            </div>
            <Controls
                room={room}
                theme={theme}
                onRoom={setRoom}
                onTheme={setTheme}
            />
            <Log entries={log} />
        </div>
    );
}

function WorkaroundDemo() {
    const [room, setRoom] = useState<Room>('general');
    const [theme, setTheme] = useState<Theme>('dark');
    const [log, setLog] = useState<string[]>([]);

    const latestTheme = useRef(theme);
    latestTheme.current = theme; // always up to date, not a dep

    const addLog = (msg: string) =>
        setLog((prev) => [msg, ...prev].slice(0, 6));

    useEffect(() => {
        const t = latestTheme.current; // read latest value without dep
        addLog(`[${t}] Connected to #${room}`);
        return () => {
            addLog(`[${latestTheme.current}] Disconnected from #${room}`);
        };
    }, [room]); // only room → theme changes don't reconnect ✅

    return (
        <div className="space-y-3">
            <div className="bg-emerald-900/15 border border-emerald-700/25 rounded-lg p-2.5">
                <p className="text-[10px] text-emerald-400">
                    ✅ Ref holds latest theme — changing theme does NOT
                    reconnect
                </p>
            </div>
            <Controls
                room={room}
                theme={theme}
                onRoom={setRoom}
                onTheme={setTheme}
            />
            <Log entries={log} />
        </div>
    );
}

function Controls({
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

function Log({ entries }: { entries: string[] }) {
    if (entries.length === 0)
        return (
            <p className="text-[11px] text-zinc-600 text-center py-3">
                Interact above to see connection log
            </p>
        );
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 space-y-0.5 font-mono">
            {entries.map((e, i) => (
                <p
                    key={i}
                    className={`text-[11px] ${
                        i === 0 ? 'text-zinc-300' : 'text-zinc-600'
                    } ${e.includes('Disconnected') ? 'text-rose-500/70' : ''}`}
                >
                    {e}
                </p>
            ))}
        </div>
    );
}

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('problem');

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <TabBar
                    tabs={TAB_LABELS}
                    active={activeTab}
                    onSelect={(v) => setActiveTab(v as Tab)}
                />
                {activeTab === 'problem' ? <ProblemDemo /> : <WorkaroundDemo />}
            </div>
        </div>
    );
}
