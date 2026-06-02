import { useRef, useImperativeHandle } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import { ApiDescription } from './components/ApiDescription';
import { ParentControls, SHAKE_KEYFRAMES } from './components/ParentControls';

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
        <DemoShell fileUrl={fileUrl}>
            <ApiDescription />

            <div className="space-y-3">
                <FancyInput label="Username" ref={usernameRef} />
                <FancyInput label="Password" ref={passwordRef} />
            </div>

            <ParentControls
                onFocusUser={() => usernameRef.current?.focus()}
                onFocusPass={() => passwordRef.current?.focus()}
                onClearAll={() => {
                    usernameRef.current?.clear();
                    passwordRef.current?.clear();
                }}
                onShakeUser={() => usernameRef.current?.shake()}
            />

            <style>{SHAKE_KEYFRAMES}</style>
        </DemoShell>
    );
}
