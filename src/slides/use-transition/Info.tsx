import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Performance"
                badgeVariant="emerald"
                title="useTransition"
                subtitle='Mark a state update as "non-urgent" so React keeps the UI responsive while it processes it.'
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <p className="text-sm">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-zinc-200">[</span>
                    <span className="text-indigo-300">isPending</span>
                    <span className="text-zinc-200">, </span>
                    <span className="text-emerald-400">startTransition</span>
                    <span className="text-zinc-200">] = </span>
                    <span className="text-yellow-400">useTransition</span>
                    <span className="text-zinc-200">()</span>
                </p>
                <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    <p>
                        <span className="text-indigo-300">isPending</span> —{' '}
                        <span className="font-mono">true</span> while the
                        transition is in progress
                    </p>
                    <p>
                        <span className="text-emerald-400">
                            startTransition
                        </span>{' '}
                        — wrap slow state updates inside this
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Two priority levels
                </p>
                <div className="space-y-2">
                    <div className="flex gap-2 items-start">
                        <span className="text-rose-400 text-xs">🔴</span>
                        <div>
                            <p className="text-xs text-zinc-300 font-medium">
                                Urgent
                            </p>
                            <p className="text-[11px] text-zinc-500">
                                User input, button clicks — must respond
                                immediately
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 items-start">
                        <span className="text-emerald-400 text-xs">🟢</span>
                        <div>
                            <p className="text-xs text-zinc-300 font-medium">
                                Transition (non-urgent)
                            </p>
                            <p className="text-[11px] text-zinc-500">
                                Tab switching, search results, heavy renders —
                                can be interrupted
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono text-[11px] space-y-1.5">
                <p className="text-[10px] not-italic font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    Pattern
                </p>
                <p className="text-zinc-500">
                    <span className="text-purple-400">const</span> [isPending,
                    startTransition] = useTransition()
                </p>
                <p className="text-zinc-500">
                    <span className="text-yellow-400">startTransition</span>
                    {'(() => {'}
                </p>
                <p className="pl-4 text-zinc-300">
                    setTab(nextTab){' '}
                    <span className="text-zinc-600">← slow update</span>
                </p>
                <p className="text-zinc-500">{'}) '}</p>
                <p className="mt-1 text-zinc-500">
                    if (<span className="text-indigo-300">isPending</span>){' '}
                    <span className="text-zinc-300">
                        return &lt;Spinner /&gt;
                    </span>
                </p>
            </div>

            <div className="rounded-xl bg-indigo-900/15 border border-indigo-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/70 mb-1.5">
                    vs useDeferredValue
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Use{' '}
                    <span className="font-mono text-zinc-300">
                        useTransition
                    </span>{' '}
                    when you control the state update. Use{' '}
                    <span className="font-mono text-zinc-300">
                        useDeferredValue
                    </span>{' '}
                    when the value comes from outside (props, URL params).
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 Click tabs on the right — without transition the UI
                    freezes, with transition the old tab stays visible while the
                    new one loads.
                </p>
            </div>
        </div>
    );
}
