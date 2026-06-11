import { useState, useEffect, useEffectEvent } from 'react';
import InfoNote from '@/components/demo/InfoNote';
import { Controls } from './components/Controls';
import { ConnectionLog } from './components/ConnectionLog';
import { connectToRoom } from './components/chatServer';

export const fileUrl =
    '/src/slides/use-effect-event/demo/UseEffectEventDemo.tsx';

type Room = 'general' | 'random' | 'react';
type Theme = 'dark' | 'light';

export default function UseEffectEventDemo() {
    const [room, setRoom] = useState<Room>('general');
    const [theme, setTheme] = useState<Theme>('dark');
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) =>
        setLog((prev) => [msg, ...prev].slice(0, 6));

    const onConnect = useEffectEvent(() => {
        addLog(`[${theme}] Connected to #${room}`);
    });

    const onDisconnect = useEffectEvent(() => {
        addLog(`[${theme}] Disconnected from #${room}`);
    });

    useEffect(() => {
        return connectToRoom(room, { onConnect, onDisconnect });
    }, [room]); // theme is not a dep — effect events always read the latest value ✅

    return (
        <div className="space-y-3">
            <InfoNote color="emerald">
                ✅ useEffectEvent — theme is read fresh, never a dependency
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
