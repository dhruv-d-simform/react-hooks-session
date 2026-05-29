import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Effect · Library Authors"
                badgeVariant="purple"
                title="useInsertionEffect"
                subtitle="Inject CSS rules into the DOM before any layout effects run. For CSS-in-JS libraries only."
            />

            <div className="rounded-xl bg-purple-900/15 border border-purple-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400/70 mb-1.5">
                    You probably won't use this directly
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="font-mono text-zinc-300">
                        useInsertionEffect
                    </span>{' '}
                    is designed for CSS-in-JS libraries like{' '}
                    <span className="font-mono text-zinc-300">
                        styled-components
                    </span>{' '}
                    and <span className="font-mono text-zinc-300">emotion</span>
                    . It exists so they can inject{' '}
                    <span className="font-mono text-zinc-300">{'<style>'}</span>{' '}
                    tags before layout effects read them.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Effect execution order
                </p>
                <div className="space-y-1.5">
                    {[
                        {
                            step: '1',
                            label: 'useInsertionEffect',
                            desc: 'inject styles',
                            highlight: true,
                            color: 'text-purple-300',
                        },
                        {
                            step: '2',
                            label: 'useLayoutEffect',
                            desc: 'measure DOM (styles already injected)',
                            color: 'text-amber-300',
                        },
                        {
                            step: '3',
                            label: 'Browser paints',
                            desc: '',
                            color: 'text-zinc-500',
                        },
                        {
                            step: '4',
                            label: 'useEffect',
                            desc: 'async side effects',
                            color: 'text-indigo-300',
                        },
                    ].map(({ step, label, desc, highlight, color }) => (
                        <div
                            key={step}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${highlight ? 'bg-purple-900/20 border border-purple-700/25' : ''}`}
                        >
                            <span className="text-[10px] font-mono text-zinc-600 w-3">
                                {step}
                            </span>
                            <span className={`text-xs font-mono ${color}`}>
                                {label}
                            </span>
                            {desc && (
                                <span className="text-[10px] text-zinc-600">
                                    — {desc}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-2.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Key constraints
                </p>
                <ul className="space-y-2 text-xs text-zinc-400">
                    <li className="flex gap-2">
                        <span className="text-rose-400 shrink-0">⚠️</span>
                        Cannot read or update state inside it (runs too early)
                    </li>
                    <li className="flex gap-2">
                        <span className="text-rose-400 shrink-0">⚠️</span>
                        Cannot access DOM refs — they're not populated yet
                    </li>
                    <li className="flex gap-2">
                        <span className="text-emerald-400 shrink-0">✅</span>
                        Can safely insert{' '}
                        <span className="font-mono text-zinc-300">
                            {'<style>'}
                        </span>{' '}
                        tags via{' '}
                        <span className="font-mono text-zinc-300">
                            document.head
                        </span>
                    </li>
                </ul>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 The demo shows a minimal CSS-in-JS pattern — styles are
                    injected before the component paints, so the element is
                    never unstyled.
                </p>
            </div>
        </div>
    );
}
