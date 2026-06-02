import { useRef, useImperativeHandle } from 'react';

const SHAKE_KEYFRAMES = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
}
.animate-shake { animation: shake 0.4s ease-in-out; }
`;

export interface FancyInputHandle {
    focus: () => void;
    clear: () => void;
    shake: () => void;
}

export default function FancyInput({
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
        <>
            <style>{SHAKE_KEYFRAMES}</style>
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
        </>
    );
}
