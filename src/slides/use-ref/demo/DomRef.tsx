import { useRef, useState } from 'react';

export const fileUrl = '/src/slides/use-ref/demo/DomRef.tsx';

export default function DomRef() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) =>
        setLog((prev) => [`→ ${msg}`, ...prev].slice(0, 4));

    return (
        <div className="space-y-4">
            <p className="text-xs text-zinc-500">
                Buttons call DOM methods directly via{' '}
                <span className="font-mono text-amber-300">ref.current</span> —
                no state involved.
            </p>

            <div className="space-y-2.5">
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Name
                    </label>
                    <input
                        ref={nameRef}
                        placeholder="Click 'Focus Name' below"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Email
                    </label>
                    <input
                        ref={emailRef}
                        placeholder="Click 'Focus Email' below"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => {
                        nameRef.current?.focus();
                        addLog('nameRef.current.focus()');
                    }}
                    className="py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 text-xs text-amber-300 hover:bg-amber-900/50 transition-colors"
                >
                    Focus Name
                </button>
                <button
                    onClick={() => {
                        emailRef.current?.focus();
                        addLog('emailRef.current.focus()');
                    }}
                    className="py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 text-xs text-amber-300 hover:bg-amber-900/50 transition-colors"
                >
                    Focus Email
                </button>
                <button
                    onClick={() => {
                        if (nameRef.current) {
                            nameRef.current.select();
                            addLog('nameRef.current.select()');
                        }
                    }}
                    className="py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    Select Name
                </button>
                <button
                    onClick={() => {
                        if (nameRef.current) {
                            nameRef.current.value = '';
                            nameRef.current.focus();
                            addLog('nameRef.current.value = ""');
                        }
                    }}
                    className="py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    Clear Name
                </button>
            </div>

            {log.length > 0 && (
                <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                        Actions called
                    </p>
                    <div className="space-y-0.5">
                        {log.map((entry, i) => (
                            <p
                                key={i}
                                className={`text-[11px] font-mono ${i === 0 ? 'text-amber-300' : 'text-zinc-600'}`}
                            >
                                {entry}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
