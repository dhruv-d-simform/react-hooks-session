import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import InfoNote from '@/components/demo/InfoNote';
import { Controls } from './components/Controls';
import { ConnectionLog } from './components/ConnectionLog';
import { connectToRoom } from './components/chatServer';

export const fileUrl = '/src/slides/use-effect-event/demo/WorkaroundDemo.tsx';

type Room = 'general' | 'random' | 'react';
type Theme = 'dark' | 'light';

export default function WorkaroundDemo() {
    const [room, setRoom] = useState<Room>('general');
    const [theme, setTheme] = useState<Theme>('dark');
    const [log, setLog] = useState<string[]>([]);

    const latestTheme = useRef(theme);
    useLayoutEffect(() => {
        latestTheme.current = theme;
    });

    const addLog = (msg: string) =>
        setLog((prev) => [msg, ...prev].slice(0, 6));

    useEffect(() => {
        return connectToRoom(room, {
            onConnect: () =>
                addLog(`[${latestTheme.current}] Connected to #${room}`),
            onDisconnect: () =>
                addLog(`[${latestTheme.current}] Disconnected from #${room}`),
        });
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
