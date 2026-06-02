import { useState, useEffect } from 'react';
import InfoNote from '@/components/demo/InfoNote';
import { Controls } from './components/Controls';
import { ConnectionLog } from './components/ConnectionLog';

type Room = 'general' | 'random' | 'react';
type Theme = 'dark' | 'light';

export default function ProblemDemo() {
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
            <InfoNote color="rose">
                ❌ theme is in deps — changing theme reconnects the room
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
