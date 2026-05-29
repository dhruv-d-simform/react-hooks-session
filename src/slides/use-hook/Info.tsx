import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="React 19 · New"
                badgeVariant="purple"
                title="use"
                subtitle="Read the value of a Promise or Context directly inside render — the first hook that can be called conditionally."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Two forms
                </p>
                <div className="space-y-3">
                    <div>
                        <p className="text-[10px] text-zinc-600 mb-1">
                            Read a promise:
                        </p>
                        <p className="text-sm">
                            <span className="text-purple-400">const</span>{' '}
                            <span className="text-pink-300">data</span>
                            <span className="text-zinc-400"> = </span>
                            <span className="text-yellow-400">use</span>
                            <span className="text-zinc-200">(</span>
                            <span className="text-indigo-300">promise</span>
                            <span className="text-zinc-200">)</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] text-zinc-600 mb-1">
                            Read context:
                        </p>
                        <p className="text-sm">
                            <span className="text-purple-400">const</span>{' '}
                            <span className="text-pink-300">value</span>
                            <span className="text-zinc-400"> = </span>
                            <span className="text-yellow-400">use</span>
                            <span className="text-zinc-200">(</span>
                            <span className="text-indigo-300">MyContext</span>
                            <span className="text-zinc-200">)</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    What makes it different
                </p>
                <div className="space-y-2.5 text-xs">
                    <div className="flex gap-2">
                        <span className="text-pink-400 shrink-0">→</span>
                        <p className="text-zinc-400">
                            <span className="text-zinc-300 font-medium">
                                Conditionally callable
                            </span>{' '}
                            — unlike every other hook, you can call{' '}
                            <span className="font-mono">use</span> inside if
                            statements and loops
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-pink-400 shrink-0">→</span>
                        <p className="text-zinc-400">
                            <span className="text-zinc-300 font-medium">
                                Suspense integration
                            </span>{' '}
                            — when the promise is pending, React suspends the
                            component and shows the nearest{' '}
                            <span className="font-mono">&lt;Suspense&gt;</span>{' '}
                            fallback
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-pink-400 shrink-0">→</span>
                        <p className="text-zinc-400">
                            <span className="text-zinc-300 font-medium">
                                Error boundaries
                            </span>{' '}
                            — rejected promises bubble to the nearest error
                            boundary
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono text-[11px] space-y-1">
                <p className="text-[10px] not-italic font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    Before (React 18)
                </p>
                <p className="text-zinc-500">
                    <span className="text-yellow-400">useEffect</span>
                    {'(() => {'}
                </p>
                <p className="pl-4 text-zinc-500">
                    fetch(url).then(setData){' '}
                    <span className="text-zinc-700">← complex boilerplate</span>
                </p>
                <p className="text-zinc-500">{'}, [url])'}</p>
                <div className="border-t border-zinc-800 pt-2 mt-2">
                    <p className="text-[10px] not-italic font-bold uppercase tracking-widest text-zinc-500 mb-2">
                        After (React 19)
                    </p>
                    <p className="text-zinc-400">
                        <span className="text-purple-400">const</span> data ={' '}
                        <span className="text-yellow-400">use</span>(promise)
                        <span className="text-emerald-400">
                            {' '}
                            ← done, Suspense handles loading
                        </span>
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 The demo wraps a fetch inside a promise and reads it with{' '}
                    <span className="font-mono text-pink-300">use()</span>.
                    Suspense shows a spinner while loading.
                </p>
            </div>
        </div>
    );
}
