import { useRef, useImperativeHandle } from 'react';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-imperative-handle/demo/index.tsx';

interface FancyInputHandle {
    focus: () => void;
    clear: () => void;
    shake: () => void;
}

function FancyInput({
    label,
    ref,
}: {
    label: string;
    ref: React.Ref<FancyInputHandle>;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        clear: () => {
            if (inputRef.current) {
                inputRef.current.value = '';
                inputRef.current.focus();
            }
        },
        shake: () => {
            const el = wrapperRef.current;
            if (!el) return;
            el.classList.add('animate-shake');
            setTimeout(() => el.classList.remove('animate-shake'), 500);
        },
    }));

    return (
        <div ref={wrapperRef}>
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                {label}{' '}
                <span className="text-amber-400 normal-case">
                    (controlled by parent via ref)
                </span>
            </label>
            <input
                ref={inputRef}
                placeholder={`Type in ${label.toLowerCase()}…`}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600"
            />
        </div>
    );
}

export default function Demo() {
    const usernameRef = useRef<FancyInputHandle>(null);
    const passwordRef = useRef<FancyInputHandle>(null);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-5">
                <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3">
                    <p className="text-xs text-zinc-500">
                        <span className="font-mono text-amber-300">
                            FancyInput
                        </span>{' '}
                        exposes{' '}
                        <span className="font-mono text-emerald-400">
                            focus
                        </span>
                        ,{' '}
                        <span className="font-mono text-emerald-400">
                            clear
                        </span>
                        , and{' '}
                        <span className="font-mono text-emerald-400">
                            shake
                        </span>{' '}
                        — the parent controls it without knowing its internals.
                    </p>
                </div>

                <div className="space-y-3">
                    <FancyInput label="Username" ref={usernameRef} />
                    <FancyInput label="Password" ref={passwordRef} />
                </div>

                <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Parent controls
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => usernameRef.current?.focus()}
                            className="py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 text-[11px] text-amber-300 hover:bg-amber-900/50 transition-colors"
                        >
                            Focus User
                        </button>
                        <button
                            onClick={() => passwordRef.current?.focus()}
                            className="py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 text-[11px] text-amber-300 hover:bg-amber-900/50 transition-colors"
                        >
                            Focus Pass
                        </button>
                        <button
                            onClick={() => {
                                usernameRef.current?.clear();
                                passwordRef.current?.clear();
                            }}
                            className="py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={() => usernameRef.current?.shake()}
                            className="py-2 rounded-lg bg-rose-900/20 border border-rose-700/30 text-[11px] text-rose-400 hover:bg-rose-900/30 transition-colors col-span-3"
                        >
                            Shake Username (validation error)
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-6px); }
                    40% { transform: translateX(6px); }
                    60% { transform: translateX(-4px); }
                    80% { transform: translateX(4px); }
                }
                .animate-shake { animation: shake 0.4s ease-in-out; }
            `}</style>
        </div>
    );
}
