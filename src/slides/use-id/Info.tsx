import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Library Authors"
                badgeVariant="purple"
                title="useId"
                subtitle="Generate a unique, stable ID that works across server and client rendering."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <p className="text-sm">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-purple-300">id</span>
                    <span className="text-zinc-400"> = </span>
                    <span className="text-yellow-400">useId</span>
                    <span className="text-zinc-200">()</span>
                </p>
                <div className="mt-3 text-[11px] text-zinc-500">
                    <p>
                        Returns a string like{' '}
                        <span className="text-purple-300">":r0:"</span>,{' '}
                        <span className="text-purple-300">":r1:"</span> — unique
                        per component instance
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    The accessibility problem
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    HTML requires a{' '}
                    <span className="font-mono text-zinc-300">
                        &lt;label&gt;
                    </span>{' '}
                    to reference its input via{' '}
                    <span className="font-mono text-zinc-300">htmlFor</span>. If
                    you hard-code an ID like{' '}
                    <span className="font-mono text-zinc-300">"password"</span>{' '}
                    and render the same component twice, both labels point to
                    the same input — broken accessibility.
                </p>
                <div className="font-mono text-[11px] bg-zinc-800/60 rounded-lg p-3 space-y-0.5">
                    <p className="text-rose-400">
                        {'// ❌ Two PasswordFields → same id="password" twice'}
                    </p>
                    <p className="text-zinc-400">
                        &lt;label htmlFor="password"&gt;...
                    </p>
                    <p className="text-zinc-400">
                        &lt;input id="password" /&gt;
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    The fix
                </p>
                <div className="font-mono text-[11px] bg-zinc-800/60 rounded-lg p-3 space-y-0.5">
                    <p className="text-emerald-400">
                        {'// ✅ Each instance gets its own unique id'}
                    </p>
                    <p className="text-zinc-400">
                        <span className="text-purple-400">const</span> id ={' '}
                        <span className="text-yellow-400">useId</span>()
                    </p>
                    <p className="text-zinc-400">
                        &lt;label htmlFor=&#123;id&#125;&gt;...
                    </p>
                    <p className="text-zinc-400">
                        &lt;input id=&#123;id&#125; /&gt;
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1.5">
                    Don't use for list keys
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="font-mono text-zinc-300">useId</span>{' '}
                    generates IDs for accessibility attributes, not for list
                    keys. For list keys, use your data's natural ID.
                </p>
            </div>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    👉 The demo renders two{' '}
                    <span className="font-semibold text-zinc-200">
                        PasswordField
                    </span>{' '}
                    components — inspect each to see they get different IDs
                    despite being the same component.
                </p>
            </div>
        </div>
    );
}
