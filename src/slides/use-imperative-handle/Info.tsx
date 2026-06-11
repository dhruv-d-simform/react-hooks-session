import InfoHeader from '@/components/InfoHeader';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Ref · Escape Hatch"
                badgeVariant="amber"
                title="useImperativeHandle"
                docsUrl="https://react.dev/reference/react/useImperativeHandle"
                subtitle="Expose a custom set of methods from a child component to its parent — nothing more."
            />

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 font-mono">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    Syntax
                </p>
                <div className="text-sm space-y-0.5">
                    <p>
                        <span className="text-yellow-400">
                            useImperativeHandle
                        </span>
                        <span className="text-zinc-200">(</span>
                        <span className="text-amber-300">ref</span>
                        <span className="text-zinc-400">, </span>
                        <span className="text-zinc-200">() =&gt; {'({'}</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-emerald-400">focus</span>
                        <span className="text-zinc-400">: () =&gt; </span>
                        <span className="text-zinc-300">
                            inputRef.current?.focus()
                        </span>
                        <span className="text-zinc-500">,</span>
                    </p>
                    <p className="pl-4">
                        <span className="text-emerald-400">clear</span>
                        <span className="text-zinc-400">: () =&gt; </span>
                        <span className="text-zinc-300">...</span>
                    </p>
                    <p>
                        <span className="text-zinc-200">{'}))'}</span>
                    </p>
                </div>
                <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    <p>
                        <span className="text-amber-300">ref</span> — the ref
                        received from the parent
                    </p>
                    <p>
                        The returned object becomes what{' '}
                        <span className="font-mono text-zinc-300">
                            ref.current
                        </span>{' '}
                        holds in the parent
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    How the pattern works
                </p>
                <div className="space-y-2.5 text-xs">
                    <div className="flex gap-3 items-start">
                        <span className="text-[10px] font-mono text-zinc-600 mt-0.5 w-4">
                            1
                        </span>
                        <p className="text-zinc-400">
                            Parent creates a ref and passes it to the child:{' '}
                            <span className="font-mono text-zinc-300">
                                &lt;FancyInput ref=&#123;ref&#125; /&gt;
                            </span>
                        </p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <span className="text-[10px] font-mono text-zinc-600 mt-0.5 w-4">
                            2
                        </span>
                        <p className="text-zinc-400">
                            Child accepts{' '}
                            <span className="font-mono text-zinc-300">ref</span>{' '}
                            as a prop and calls{' '}
                            <span className="font-mono text-zinc-300">
                                useImperativeHandle
                            </span>{' '}
                            to define what the parent sees.
                        </p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <span className="text-[10px] font-mono text-zinc-600 mt-0.5 w-4">
                            3
                        </span>
                        <p className="text-zinc-400">
                            Parent calls methods on{' '}
                            <span className="font-mono text-zinc-300">
                                ref.current
                            </span>{' '}
                            — it only sees what the child chose to expose.
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-sky-900/15 border border-sky-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400/70 mb-1.5">
                    React 19 note
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    In React 19,{' '}
                    <span className="font-mono text-zinc-300">ref</span> is a
                    regular prop — no need for{' '}
                    <span className="font-mono text-zinc-500 line-through">
                        forwardRef
                    </span>
                    . Just accept{' '}
                    <span className="font-mono text-zinc-300">
                        &#123; ref &#125;
                    </span>{' '}
                    in the component's props.
                </p>
            </div>

            <div className="rounded-xl bg-amber-900/15 border border-amber-700/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/70 mb-1.5">
                    Use sparingly
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Imperative code breaks the declarative React model. Only
                    reach for this when you need to expose a behaviour that
                    can't be expressed through props — like focusing, scrolling,
                    or playing media.
                </p>
            </div>
        </div>
    );
}
