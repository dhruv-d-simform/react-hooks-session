import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Library Authors"
                badgeVariant="purple"
                title="useSyncExternalStore"
                subtitle="Subscribe to external state that lives outside React — browser APIs, Redux, Zustand."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <div className="text-sm space-y-0.5">
                    <p>
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-purple-300">snapshot</span>
                        <span className="text-zinc-400"> = </span>
                        <span className="text-yellow-400">
                            useSyncExternalStore
                        </span>
                        <span className="text-zinc-200">(</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-emerald-400">subscribe</span>
                        <span className="text-zinc-400">,</span>
                        <span className="text-zinc-600 text-[11px] ml-2">
                            {'// (callback) => unsubscribe'}
                        </span>
                    </p>
                    <p className="pl-4">
                        <span className="text-indigo-300">getSnapshot</span>
                        <span className="text-zinc-400">,</span>
                        <span className="text-zinc-600 text-[11px] ml-2">
                            {'// () => currentValue'}
                        </span>
                    </p>
                    <p className="pl-4">
                        <span className="text-sky-300">getServerSnapshot</span>
                        <span className="text-zinc-600 text-[11px] ml-2">
                            {'// SSR value (optional)'}
                        </span>
                    </p>
                    <p>
                        <span className="text-zinc-200">)</span>
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Why not just useEffect + useState?
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    You could subscribe to external state with{' '}
                    <span className="font-mono text-zinc-300">useEffect</span>,
                    but in concurrent React this causes tearing — different
                    components may read different snapshots of the same store
                    during a single render. This hook guarantees consistency.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-2.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Real-world users
                </p>
                <div className="space-y-2 text-xs">
                    {[
                        {
                            name: 'Redux',
                            desc: 'subscribes to the store and re-renders when relevant state changes',
                        },
                        {
                            name: 'Zustand',
                            desc: 'uses it internally for all store subscriptions',
                        },
                        {
                            name: 'Jotai',
                            desc: "subscribes to atoms that live outside React's tree",
                        },
                        {
                            name: 'Browser APIs',
                            desc: 'window.matchMedia, navigator.onLine, localStorage',
                        },
                    ].map((item) => (
                        <div key={item.name} className="flex gap-2 items-start">
                            <span className="font-mono text-xs text-purple-300 w-28 shrink-0">
                                {item.name}
                            </span>
                            <span className="text-zinc-500">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 The demo subscribes to{' '}
                    <span className="font-mono text-zinc-300">
                        window.matchMedia
                    </span>{' '}
                    (system dark/light preference) and{' '}
                    <span className="font-mono text-zinc-300">
                        navigator.onLine
                    </span>{' '}
                    — neither of these is React state, but they update the UI
                    reactively.
                </p>
            </div>
        </div>
    );
}
