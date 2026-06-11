import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="React 19 · New"
                badgeVariant="purple"
                title="useActionState"
                docsUrl="https://react.dev/reference/react/useActionState"
                subtitle="Manage form state — pending, success, and error — with a single hook."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <div className="text-sm space-y-0.5">
                    <p>
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-zinc-200">[</span>
                        <span className="text-pink-300">state</span>
                        <span className="text-zinc-400">, </span>
                        <span className="text-emerald-400">dispatch</span>
                        <span className="text-zinc-400">, </span>
                        <span className="text-indigo-300">isPending</span>
                        <span className="text-zinc-200">]</span>
                    </p>
                    <p>
                        {'  '}
                        <span className="text-zinc-400">=</span>{' '}
                        <span className="text-yellow-400">useActionState</span>
                        <span className="text-zinc-200">(</span>
                        <span className="text-orange-300">action</span>
                        <span className="text-zinc-400">, </span>
                        <span className="text-sky-300">initialState</span>
                        <span className="text-zinc-200">)</span>
                    </p>
                </div>
                <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    <p>
                        <span className="text-orange-300">action</span> —{' '}
                        <span className="font-mono">
                            async (prevState, formData) =&gt; newState
                        </span>
                    </p>
                    <p>
                        <span className="text-pink-300">state</span> — the
                        current state (result of the last action)
                    </p>
                    <p>
                        <span className="text-indigo-300">isPending</span> —{' '}
                        <span className="font-mono">true</span> while the action
                        is running
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    What it replaces
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Before React 19, managing form submissions meant juggling
                    multiple state variables:
                </p>
                <div className="font-mono text-[11px] bg-zinc-800/60 rounded-lg p-3 space-y-0.5">
                    <p className="text-rose-400">{'// Old pattern'}</p>
                    <p className="text-zinc-500">
                        const [loading, setLoading] = useState(false)
                    </p>
                    <p className="text-zinc-500">
                        const [error, setError] = useState(null)
                    </p>
                    <p className="text-zinc-500">
                        const [data, setData] = useState(null)
                    </p>
                </div>
                <div className="font-mono text-[11px] bg-zinc-800/60 rounded-lg p-3 space-y-0.5">
                    <p className="text-emerald-400">{'// React 19'}</p>
                    <p className="text-zinc-400">
                        const [state, dispatch, isPending] ={' '}
                        <span className="text-yellow-400">useActionState</span>
                        (action, null)
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 The demo shows a contact form. Submit it to see the
                    pending spinner and success/error states managed entirely by{' '}
                    <span className="font-mono text-pink-300">
                        useActionState
                    </span>
                    .
                </p>
            </div>
        </div>
    );
}
