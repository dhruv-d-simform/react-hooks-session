import { useSyncExternalStore } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
import { StoreCard } from './components/StoreCard';
import {
    subscribeOnline,
    getOnlineSnapshot,
    subscribeDarkMode,
    getDarkModeSnapshot,
    subscribeWindowSize,
    getWindowSizeSnapshot,
} from './stores';

export const fileUrl = '/src/slides/use-sync-external-store/demo/index.tsx';

export default function Demo() {
    const isOnline = useSyncExternalStore(
        subscribeOnline,
        getOnlineSnapshot,
        () => true
    );

    const isDarkMode = useSyncExternalStore(
        subscribeDarkMode,
        getDarkModeSnapshot,
        () => false
    );

    const windowSize = useSyncExternalStore(
        subscribeWindowSize,
        getWindowSizeSnapshot,
        () => ({ width: 0, height: 0 })
    );

    return (
        <DemoShell fileUrl={fileUrl}>
            <p className="text-xs text-zinc-500">
                Three external stores — none of these are React state, but they
                all update the UI reactively via{' '}
                <span className="font-mono text-purple-300">
                    useSyncExternalStore
                </span>
                .
            </p>

            <StoreCard
                label="Network Status"
                value={isOnline ? '🟢 Online' : '🔴 Offline'}
                code="subscribe: window online/offline events"
                color="emerald"
            />

            <StoreCard
                label="System Theme"
                value={isDarkMode ? '🌙 Dark' : '☀️ Light'}
                code="subscribe: matchMedia('prefers-color-scheme: dark')"
                color="purple"
            />

            <StoreCard
                label="Window Size"
                value={`${windowSize.width} × ${windowSize.height}`}
                code="subscribe: window resize event"
                color="sky"
            />

            <InfoNote color="zinc">
                💡 Try going offline (DevTools → Network → Offline) or resizing
                the window — both update instantly without any React state
                involved.
            </InfoNote>
        </DemoShell>
    );
}
