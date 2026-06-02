import { useId, useState } from 'react';

export default function PasswordField({ label }: { label: string }) {
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
