import { useState, useRef } from 'react';
import { NameInput } from './components/NameInput';
import { RoleInput } from './components/RoleInput';
import { ColorPicker } from './components/ColorPicker';
import { ActiveToggle } from './components/ActiveToggle';
import { CardPreview } from './components/CardPreview';

export const fileUrl = '/src/slides/use-state/demo/CardBuilder.tsx';

export default function CardBuilder() {
    const [name, setName] = useState('Alex Johnson');
    const [role, setRole] = useState('Frontend Developer');
    const [colorIdx, setColorIdx] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const renderCount = useRef(0);
    renderCount.current++;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    State Inputs
                </p>
                <span className="text-[10px] font-mono text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-full">
                    renders:{' '}
                    <span className="text-indigo-400">{renderCount.current}</span>
                </span>
            </div>

            <div className="space-y-2.5">
                <NameInput value={name} onChange={setName} />
                <RoleInput value={role} onChange={setRole} />
                <ColorPicker colorIdx={colorIdx} onChange={setColorIdx} />
                <ActiveToggle
                    isActive={isActive}
                    onToggle={() => setIsActive((a) => !a)}
                />
            </div>

            <CardPreview
                name={name}
                role={role}
                colorIdx={colorIdx}
                isActive={isActive}
            />
        </div>
    );
}
