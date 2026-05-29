import { useState, useEffect } from 'react';

export const fileUrl = '/src/slides/custom-hooks/demo/UseLocalStorage.tsx';

/**
 * Composes useState + useEffect into a drop-in replacement for useState that
 * persists to localStorage. Same `[value, setValue]` shape as useState — that
 * familiar API is what makes a good custom hook feel invisible.
 */
function useLocalStorage<T>(key: string, initial: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored !== null ? (JSON.parse(stored) as T) : initial;
        } catch {
            return initial;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // ignore write errors (e.g. private mode / quota)
        }
    }, [key, value]);

    return [value, setValue] as const;
}

const ACCENTS = [
    { key: 'teal', dot: 'bg-teal-500', ring: 'ring-teal-400' },
    { key: 'indigo', dot: 'bg-indigo-500', ring: 'ring-indigo-400' },
    { key: 'rose', dot: 'bg-rose-500', ring: 'ring-rose-400' },
    { key: 'amber', dot: 'bg-amber-500', ring: 'ring-amber-400' },
];

export default function UseLocalStorage() {
    const [name, setName] = useLocalStorage('demo:name', 'Ada Lovelace');
    const [accent, setAccent] = useLocalStorage('demo:accent', 'teal');

    return (
        <div className="space-y-4">
            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-2.5 font-mono text-[11px]">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-zinc-200">[</span>
                <span className="text-indigo-300">name</span>
                <span className="text-zinc-200">, </span>
                <span className="text-emerald-400">setName</span>
                <span className="text-zinc-200">] = </span>
                <span className="text-yellow-400">useLocalStorage</span>
                <span className="text-zinc-200">(</span>
                <span className="text-orange-300">'demo:name'</span>
                <span className="text-zinc-200">, …)</span>
            </div>

            <div className="space-y-2.5">
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Display name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-teal-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Accent
                    </label>
                    <div className="flex gap-2">
                        {ACCENTS.map((a) => (
                            <button
                                key={a.key}
                                onClick={() => setAccent(a.key)}
                                className={`w-7 h-7 rounded-full ${a.dot} transition-all ${
                                    accent === a.key
                                        ? `ring-2 ring-offset-2 ring-offset-zinc-900 ${a.ring}`
                                        : ''
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-lg p-3">
                <p className="text-xs text-emerald-300/90 leading-relaxed">
                    🔄 Edit a field, then{' '}
                    <span className="font-semibold">reload the page</span> —
                    your values survive. State lives in React but is mirrored to
                    localStorage by the hook&rsquo;s effect.
                </p>
            </div>
        </div>
    );
}
