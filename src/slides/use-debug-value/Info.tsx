import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Library Authors"
                badgeVariant="purple"
                title="useDebugValue"
                docsUrl="https://react.dev/reference/react/useDebugValue"
                subtitle="Add a label to your custom hook so it's readable in React DevTools."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <p className="text-sm">
                    <span className="text-yellow-400">useDebugValue</span>
                    <span className="text-zinc-200">(</span>
                    <span className="text-purple-300">value</span>
                    <span className="text-zinc-200">)</span>
                </p>
                <p className="text-sm mt-1">
                    <span className="text-zinc-500">
                        {'// With optional formatter:'}
                    </span>
                </p>
                <p className="text-sm">
                    <span className="text-yellow-400">useDebugValue</span>
                    <span className="text-zinc-200">(</span>
                    <span className="text-purple-300">date</span>
                    <span className="text-zinc-400">, </span>
                    <span className="text-zinc-300">
                        (d) =&gt; d.toLocaleDateString()
                    </span>
                    <span className="text-zinc-200">)</span>
                </p>
                <div className="mt-3 text-[11px] text-zinc-500">
                    <p>Only runs in development. Zero cost in production.</p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    When to use it
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Add it to custom hooks that are shared across many
                    components — things like{' '}
                    <span className="font-mono text-zinc-300">
                        useOnlineStatus
                    </span>
                    , <span className="font-mono text-zinc-300">useAuth</span>,{' '}
                    <span className="font-mono text-zinc-300">
                        useLocalStorage
                    </span>
                    . Without it, DevTools shows the raw state value and you
                    have to guess what it means.
                </p>
            </div>

            <div className="rounded-xl bg-purple-900/15 border border-purple-700/30 p-4 font-mono text-[11px] space-y-1">
                <p className="text-[10px] not-italic font-bold uppercase tracking-widest text-purple-400/70 mb-2">
                    DevTools appearance
                </p>
                <div className="bg-zinc-900 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-400">useOnlineStatus</span>
                        <span className="text-rose-400 text-[10px]">
                            (without useDebugValue)
                        </span>
                    </div>
                    <div className="pl-3 text-zinc-500">true</div>

                    <div className="border-t border-zinc-800 pt-2 flex items-center justify-between">
                        <span className="text-zinc-400">useOnlineStatus</span>
                        <span className="text-emerald-400 text-[10px]">
                            (with useDebugValue)
                        </span>
                    </div>
                    <div className="pl-3 text-emerald-300">
                        Online ✓{' '}
                        <span className="text-zinc-600">
                            ← meaningful label
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1.5">
                    Only for custom hooks
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Calling{' '}
                    <span className="font-mono text-zinc-300">
                        useDebugValue
                    </span>{' '}
                    at the top level of a component has no effect. It only shows
                    up in DevTools when called inside a custom hook.
                </p>
            </div>
        </div>
    );
}
