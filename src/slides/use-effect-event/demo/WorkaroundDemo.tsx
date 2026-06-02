import { useState, useEffect, useRef } from 'react';
import InfoNote from '@/components/demo/InfoNote';
import { Controls } from './components/Controls';
import { ConnectionLog } from './components/ConnectionLog';

type Room = 'general' | 'random' | 'react';
type Theme = 'dark' | 'light';

export default function WorkaroundDemo() {
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
            <InfoNote color="emerald">
                ✅ Ref holds latest theme — changing theme does NOT reconnect
            </InfoNote>
            <Controls
                room={room}
                theme={theme}
                onRoom={setRoom}
                onTheme={setTheme}
            />
            <ConnectionLog entries={log} />
        </div>
    );
}
