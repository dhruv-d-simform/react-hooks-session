import { useState, useEffect } from 'react';
import InfoNote from '@/components/demo/InfoNote';
import { NameField } from './components/NameField';
import { AccentPicker } from './components/AccentPicker';

export const fileUrl = '/src/slides/custom-hooks/demo/UseLocalStorage.tsx';

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
                <NameField value={name} onChange={setName} />
                <AccentPicker accent={accent} onChange={setAccent} />
            </div>

            <InfoNote color="emerald">
                🔄 Edit a field, then{' '}
                <span className="font-semibold">reload the page</span> — your
                values survive. State lives in React but is mirrored to
                localStorage by the hook&rsquo;s effect.
            </InfoNote>
        </div>
    );
}
