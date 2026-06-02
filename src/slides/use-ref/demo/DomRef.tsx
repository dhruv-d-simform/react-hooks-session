import { useRef, useState } from 'react';
import { RefActionButtons } from './components/RefActionButtons';
import { ActionLog } from './components/ActionLog';
import { RefInput } from './components/RefInput';

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
                <RefInput
                    label="Name"
                    placeholder="Click 'Focus Name' below"
                    ref={nameRef}
                />
                <RefInput
                    label="Email"
                    placeholder="Click 'Focus Email' below"
                    ref={emailRef}
                />
            </div>

            <RefActionButtons
                onFocusName={() => {
                    nameRef.current?.focus();
                    addLog('nameRef.current.focus()');
                }}
                onFocusEmail={() => {
                    emailRef.current?.focus();
                    addLog('emailRef.current.focus()');
                }}
                onSelectName={() => {
                    if (nameRef.current) {
                        nameRef.current.select();
                        addLog('nameRef.current.select()');
                    }
                }}
                onClearName={() => {
                    if (nameRef.current) {
                        nameRef.current.value = '';
                        nameRef.current.focus();
                        addLog('nameRef.current.value = ""');
                    }
                }}
            />

            <ActionLog entries={log} />
        </div>
    );
}
