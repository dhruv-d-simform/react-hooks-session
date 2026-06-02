import { useState, useEffect, useRef } from 'react';
import { FireCard } from './components/FireCard';
import { DepsInputGrid } from './components/DepsInputGrid';

export const fileUrl = '/src/slides/use-effect/demo/DepsExplorer.tsx';

export default function DepsExplorer() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Alice');

    const renderFires = useRef(0);
    const [mountFires, setMountFires] = useState(0);
    const [countFires, setCountFires] = useState(0);

    renderFires.current++;

    // Fires once on mount
    useEffect(() => {
        setMountFires((n) => n + 1);
    }, []);

    // Fires when count changes
    useEffect(() => {
        setCountFires((n) => n + 1);
    }, [count]);

    return (
        <div className="space-y-4">
            <DepsInputGrid
                name={name}
                count={count}
                onNameChange={setName}
                onCountChange={setCount}
            />

            <div className="space-y-2">
                <FireCard
                    label="No array"
                    description="Runs after every render"
                    color="rose"
                    fires={renderFires.current}
                    note="Fires on every render: name changes, count changes, anything"
                />
                <FireCard
                    label="Empty []"
                    description="Once on mount"
                    color="emerald"
                    fires={mountFires}
                    note="Fired once when this component first mounted"
                />
                <FireCard
                    label="[count]"
                    description="When count changes"
                    color="indigo"
                    fires={countFires}
                    note="Fires only when count changes — name edits don't trigger it"
                />
            </div>
        </div>
    );
}
