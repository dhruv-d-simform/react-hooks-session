import InfoHeader from '@/components/InfoHeader';

const useCases = [
    {
        emoji: '🎯',
        title: 'DOM Access',
        desc: 'Pass a ref to a JSX element and React sets ref.current to the DOM node after mount. Use it to call DOM methods directly: focus(), scroll(), measure dimensions.',
    },
    {
        emoji: '📦',
        title: 'Mutable Without Re-renders',
        desc: 'Store any mutable value that should survive re-renders but NOT cause one when changed. Classic use: storing a timer ID so you can cancel it later.',
    },
    {
        emoji: '🕰️',
        title: 'Previous Value',
        desc: "Store the previous render's value by writing to the ref in an effect. On next render it still holds the old value.",
    },
];

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Ref · Escape Hatch"
                badgeVariant="amber"
                title="useRef"
                docsUrl="https://react.dev/reference/react/useRef"
                subtitle='A mutable box that lives outside the re-render cycle. Two jobs: DOM access and "instance variables".'
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <p className="text-sm">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-amber-300">ref</span>
                    <span className="text-zinc-200"> = </span>
                    <span className="text-yellow-400">useRef</span>
                    <span className="text-zinc-200">(</span>
                    <span className="text-orange-300">initialValue</span>
                    <span className="text-zinc-200">)</span>
                </p>
                <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    <p>
                        Returns{' '}
                        <span className="font-mono text-zinc-300">
                            {'{ current: initialValue }'}
                        </span>{' '}
                        — the same object every render
                    </p>
                    <p>
                        <span className="font-mono text-amber-300">
                            ref.current
                        </span>{' '}
                        — read &amp; write freely, no re-render triggered
                    </p>
                    <p>
                        DOM use:{' '}
                        <span className="font-mono text-zinc-300">
                            {'<input ref={ref} />'}
                        </span>{' '}
                        — React populates it after mount
                    </p>
                </div>
            </div>

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Two main use cases
                </p>
                <div className="space-y-2.5">
                    {useCases.map((u, i) => (
                        <div
                            key={u.title}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-mono text-zinc-600">
                                    0{i + 1}
                                </span>
                                <span className="text-lg">{u.emoji}</span>
                                <span className="font-semibold text-xs">
                                    {u.title}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                {u.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1.5">
                    Key difference vs useState
                </p>
                <div className="space-y-1.5 text-xs">
                    <div className="flex gap-2">
                        <span className="text-emerald-400 font-mono w-24 shrink-0">
                            useRef
                        </span>
                        <span className="text-zinc-400">
                            Mutating .current does NOT cause a re-render
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-indigo-400 font-mono w-24 shrink-0">
                            useState
                        </span>
                        <span className="text-zinc-400">
                            Calling the setter always schedules a re-render
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 Try{' '}
                    <span className="font-semibold text-zinc-200">DOM Ref</span>{' '}
                    to focus an input imperatively, then{' '}
                    <span className="font-semibold text-zinc-200">
                        Mutable Value
                    </span>{' '}
                    to see a stopwatch that stores its timer ID in a ref.
                </p>
            </div>
        </div>
    );
}
