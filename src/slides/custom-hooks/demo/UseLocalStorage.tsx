import { useState, useEffect } from 'react';
import InfoNote from '@/components/demo/InfoNote';
import { NameField } from './components/NameField';
import { AccentPicker } from './components/AccentPicker';
import { LocalStorageCallDisplay } from './components/LocalStorageCallDisplay';

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
            <LocalStorageCallDisplay storageKey="demo:name" />

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
