import { useState } from 'react';

export default function BrokenPasswordField({
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
