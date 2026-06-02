import { useState, useEffect, useRef } from 'react';
import TabBar from '@/components/TabBar';
import DemoShell from '@/components/demo/DemoShell';
import { Controls } from './components/Controls';
import { ConnectionLog } from './components/ConnectionLog';

export const fileUrl = '/src/slides/use-effect-event/demo/index.tsx';

type Tab = 'problem' | 'workaround';
type Room = 'general' | 'random' | 'react';
type Theme = 'dark' | 'light';

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
            <ConnectionLog entries={log} />
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
                    ✅ Ref holds latest theme — changing theme does NOT reconnect
                </p>
            </div>
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

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('problem');

    return (
        <DemoShell fileUrl={fileUrl}>
            <TabBar
                tabs={TAB_LABELS}
                active={activeTab}
                onSelect={(v) => setActiveTab(v as Tab)}
            />
            {activeTab === 'problem' ? <ProblemDemo /> : <WorkaroundDemo />}
        </DemoShell>
    );
}
