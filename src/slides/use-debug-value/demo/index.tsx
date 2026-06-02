import { useState, useEffect, useDebugValue } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import { StatusCard } from './components/StatusCard';
import { FormatterExample } from './components/FormatterExample';

export const fileUrl = '/src/slides/use-debug-value/demo/index.tsx';

function useOnlineStatusPlain() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        const on = () => setIsOnline(true);
        const off = () => setIsOnline(false);
        window.addEventListener('online', on);
        window.addEventListener('offline', off);
        return () => {
            window.removeEventListener('online', on);
            window.removeEventListener('offline', off);
        };
    }, []);
    return isOnline;
}

function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        const on = () => setIsOnline(true);
        const off = () => setIsOnline(false);
        window.addEventListener('online', on);
        window.addEventListener('offline', off);
        return () => {
            window.removeEventListener('online', on);
            window.removeEventListener('offline', off);
        };
    }, []);

    useDebugValue(isOnline ? 'Online ✓' : 'Offline ✗');
    return isOnline;
}

function useLastSeen() {
    const [ts] = useState(new Date());
    useDebugValue(ts, (d) => `Last seen: ${d.toLocaleTimeString()}`);
    return ts;
}

export default function Demo() {
    const onlinePlain = useOnlineStatusPlain();
    const onlineLabeled = useOnlineStatus();
    const lastSeen = useLastSeen();

    return (
        <DemoShell fileUrl={fileUrl}>
            <p className="text-xs text-zinc-500">
                Both components use the same online status — the difference is
                what React DevTools shows.
            </p>

            <StatusCard labeled={false} isOnline={onlinePlain} />
            <StatusCard labeled={true} isOnline={onlineLabeled} />

            <FormatterExample time={lastSeen.toLocaleTimeString()} />
        </DemoShell>
    );
}
