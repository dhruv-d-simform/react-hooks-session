import { useState, useEffect, useDebugValue } from 'react';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-debug-value/demo/index.tsx';

// Custom hook WITHOUT useDebugValue
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

// Custom hook WITH useDebugValue
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

// Custom hook showing the formatter overload
function useLastSeen() {
    const [ts] = useState(new Date());
    useDebugValue(ts, (d) => `Last seen: ${d.toLocaleTimeString()}`);
    return ts;
}

function StatusCard({
    labeled,
    isOnline,
}: {
    labeled: boolean;
    isOnline: boolean;
}) {
    return (
        <div
            className={`bg-zinc-800/60 border rounded-xl p-4 space-y-3 ${labeled ? 'border-emerald-700/30' : 'border-rose-700/20'}`}
        >
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {labeled ? 'With useDebugValue' : 'Without useDebugValue'}
                </span>
                <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${labeled ? 'text-emerald-400 bg-emerald-900/20 border-emerald-700/30' : 'text-rose-400 bg-rose-900/20 border-rose-700/30'}`}
                >
                    {labeled ? '✅' : '❌'}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <span
                    className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-zinc-600'}`}
                />
                <span className="text-sm text-zinc-300">
                    {isOnline ? 'You are online' : 'You are offline'}
                </span>
            </div>

            <div className="bg-zinc-900 rounded-lg p-3 font-mono text-[11px] space-y-1.5">
                <p className="text-zinc-500">DevTools → Components panel:</p>
                <div className="pl-3 space-y-0.5">
                    <p className="text-zinc-400">▸ StatusCard</p>
                    <p className="pl-4 text-zinc-500">
                        useOnlineStatus
                        {labeled ? (
                            <span className="text-emerald-300">
                                {' '}
                                → "Online ✓"
                            </span>
                        ) : (
                            <span className="text-zinc-600"> → true</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Demo() {
    const onlinePlain = useOnlineStatusPlain();
    const onlineLabeled = useOnlineStatus();
    const lastSeen = useLastSeen();

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
                    Both components use the same online status — the difference
                    is what React DevTools shows.
                </p>

                <StatusCard labeled={false} isOnline={onlinePlain} />
                <StatusCard labeled={true} isOnline={onlineLabeled} />

                <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 font-mono text-[11px]">
                    <p className="text-zinc-500 mb-1.5">
                        Formatter overload example:
                    </p>
                    <p className="text-zinc-400">
                        <span className="text-yellow-400">useDebugValue</span>
                        (ts,{' '}
                        <span className="text-zinc-300">
                            d =&gt; `Last seen: ${'${'}d.toLocaleTimeString()
                            {'}'}`
                        </span>
                        )
                    </p>
                    <p className="text-purple-300 mt-1">
                        → "{lastSeen.toLocaleTimeString()}"
                    </p>
                    <p className="text-zinc-600 text-[10px] mt-0.5">
                        Formatter only runs when DevTools inspects the hook
                    </p>
                </div>
            </div>
        </div>
    );
}
