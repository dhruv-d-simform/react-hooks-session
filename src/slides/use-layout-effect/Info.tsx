import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Effect · Escape Hatch"
                badgeVariant="indigo"
                title="useLayoutEffect"
                subtitle="Like useEffect, but fires synchronously before the browser paints."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Execution order
                </p>
                <div className="space-y-1.5">
                    {[
                        {
                            step: '1',
                            label: 'React renders',
                            color: 'text-zinc-400',
                        },
                        {
                            step: '2',
                            label: 'React updates the DOM',
                            color: 'text-zinc-400',
                        },
                        {
                            step: '3',
                            label: 'useLayoutEffect fires ⚡',
                            color: 'text-amber-300',
                            highlight: true,
                        },
                        {
                            step: '4',
                            label: 'Browser paints the screen',
                            color: 'text-zinc-400',
                        },
                        {
                            step: '5',
                            label: 'useEffect fires',
                            color: 'text-indigo-300',
                        },
                    ].map(({ step, label, color, highlight }) => (
                        <div
                            key={step}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${highlight ? 'bg-amber-900/20 border border-amber-700/25' : ''}`}
                        >
                            <span className="text-[10px] font-mono text-zinc-600 w-3">
                                {step}
                            </span>
                            <span className={`text-xs ${color}`}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    When to use it
                </p>
                <div className="space-y-2 text-xs">
                    {[
                        {
                            label: 'Measure DOM elements',
                            desc: "Read an element's size or position before the user sees it — avoids flicker.",
                        },
                        {
                            label: 'Tooltip / popover positioning',
                            desc: "Calculate where to place a floating element based on the trigger's rect.",
                        },
                        {
                            label: 'Scroll restoration',
                            desc: 'Restore scroll position synchronously so the user never sees the wrong position.',
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex gap-2 items-start"
                        >
                            <span className="text-amber-400 mt-0.5">→</span>
                            <div>
                                <span className="text-zinc-300 font-medium">
                                    {item.label}
                                </span>
                                <p className="text-zinc-500 mt-0.5">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1.5">
                    Default to useEffect
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="font-mono text-zinc-300">
                        useLayoutEffect
                    </span>{' '}
                    blocks painting — if your work is slow, the user feels it.
                    Only switch from{' '}
                    <span className="font-mono text-zinc-300">useEffect</span>{' '}
                    when you need to measure the DOM before the user sees it.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 The demo shows a tooltip — flip between{' '}
                    <span className="font-semibold text-zinc-200">
                        useLayoutEffect
                    </span>{' '}
                    and{' '}
                    <span className="font-semibold text-zinc-200">
                        useEffect
                    </span>{' '}
                    to see the positioning flicker appear and disappear.
                </p>
            </div>
        </div>
    );
}
