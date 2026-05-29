import { useSyncExternalStore } from 'react';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-sync-external-store/demo/index.tsx';

// --- Online status store ---
function subscribeOnline(cb: () => void) {
    window.addEventListener('online', cb);
    window.addEventListener('offline', cb);
    return () => {
        window.removeEventListener('online', cb);
        window.removeEventListener('offline', cb);
    };
}
function getOnlineSnapshot() {
    return navigator.onLine;
}

// --- Dark mode store ---
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
function subscribeDarkMode(cb: () => void) {
    darkModeQuery.addEventListener('change', cb);
    return () => darkModeQuery.removeEventListener('change', cb);
}
function getDarkModeSnapshot() {
    return darkModeQuery.matches;
}

// --- Window size store ---
function subscribeWindowSize(cb: () => void) {
    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
}
// Cache the snapshot so getSnapshot returns a stable reference until the
// dimensions actually change. Returning a fresh object every call would make
// useSyncExternalStore detect a change on every render → infinite loop.
let cachedWindowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
};
function getWindowSizeSnapshot() {
    if (
        cachedWindowSize.width !== window.innerWidth ||
        cachedWindowSize.height !== window.innerHeight
    ) {
        cachedWindowSize = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
    return cachedWindowSize;
}

function StoreCard({
    label,
    value,
    code,
    color,
}: {
    label: string;
    value: React.ReactNode;
    code: string;
    color: 'emerald' | 'purple' | 'sky';
}) {
    const colorMap = {
        emerald: 'bg-emerald-900/15 border-emerald-700/25 text-emerald-300',
        purple: 'bg-purple-900/15 border-purple-700/25 text-purple-300',
        sky: 'bg-sky-900/15 border-sky-700/25 text-sky-300',
    };

    return (
        <div
            className={`rounded-xl border p-4 space-y-2 ${colorMap[color].split(' ').slice(0, 2).join(' ')}`}
        >
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {label}
                </span>
                <span
                    className={`text-sm font-bold font-mono ${colorMap[color].split(' ')[2]}`}
                >
                    {value}
                </span>
            </div>
            <p className="font-mono text-[10px] text-zinc-600">{code}</p>
        </div>
    );
}

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
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <p className="text-xs text-zinc-500">
                    Three external stores — none of these are React state, but
                    they all update the UI reactively via{' '}
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

                <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3">
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                        💡 Try going offline (DevTools → Network → Offline) or
                        resizing the window — both update instantly without any
                        React state involved.
                    </p>
                </div>
            </div>
        </div>
    );
}
