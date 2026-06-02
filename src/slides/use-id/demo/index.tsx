import { useId, useState } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
import { IdToggle } from './components/IdToggle';

export const fileUrl = '/src/slides/use-id/demo/index.tsx';

function PasswordField({ label }: { label: string }) {
    const id = useId();
    const [value, setValue] = useState('');

    return (
        <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {label}
                </span>
                <span className="font-mono text-[10px] text-purple-400 bg-purple-900/20 border border-purple-700/30 px-2 py-0.5 rounded-full">
                    id="{id}"
                </span>
            </div>
            <div className="space-y-1.5">
                <label
                    htmlFor={id}
                    className="text-xs text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors"
                >
                    Password{' '}
                    <span className="text-zinc-600">
                        (click label to focus input)
                    </span>
                </label>
                <input
                    id={id}
                    type="password"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter password…"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-purple-500 transition-colors placeholder:text-zinc-600"
                />
            </div>
            <p className="text-[10px] text-zinc-600">
                <span className="font-mono text-zinc-500">
                    &lt;label htmlFor="{id}"&gt;
                </span>{' '}
                links to{' '}
                <span className="font-mono text-zinc-500">
                    &lt;input id="{id}"&gt;
                </span>
            </p>
        </div>
    );
}

function BrokenPasswordField({
    label,
    hardcodedId,
}: {
    label: string;
    hardcodedId: string;
}) {
    const [value, setValue] = useState('');

    return (
        <div className="bg-zinc-800/60 border border-rose-700/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {label}
                </span>
                <span className="font-mono text-[10px] text-rose-400 bg-rose-900/20 border border-rose-700/30 px-2 py-0.5 rounded-full">
                    id="{hardcodedId}" ❌
                </span>
            </div>
            <div className="space-y-1.5">
                <label
                    htmlFor={hardcodedId}
                    className="text-xs text-zinc-400 cursor-pointer"
                >
                    Password{' '}
                    <span className="text-zinc-600">
                        (click label — which input gets focused?)
                    </span>
                </label>
                <input
                    id={hardcodedId}
                    type="password"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter password…"
                    className="w-full bg-zinc-900 border border-rose-700/50 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-rose-500 transition-colors placeholder:text-zinc-600"
                />
            </div>
        </div>
    );
}

export default function Demo() {
    const [showBroken, setShowBroken] = useState(false);

    return (
        <DemoShell fileUrl={fileUrl}>
            <IdToggle showBroken={showBroken} onToggle={setShowBroken} />

            {showBroken ? (
                <>
                    <BrokenPasswordField
                        label="Login Form"
                        hardcodedId="password"
                    />
                    <BrokenPasswordField
                        label="Register Form"
                        hardcodedId="password"
                    />
                    <InfoNote color="rose">
                        ⚠️ Both fields share{' '}
                        <span className="font-mono">id="password"</span> —
                        clicking either label focuses only the first input.
                        Accessibility broken.
                    </InfoNote>
                </>
            ) : (
                <>
                    <PasswordField label="Login Form" />
                    <PasswordField label="Register Form" />
                    <InfoNote color="emerald">
                        ✅ Each instance has a unique ID — clicking either label
                        focuses the correct input.
                    </InfoNote>
                </>
            )}
        </DemoShell>
    );
}
