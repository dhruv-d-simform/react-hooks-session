import { useState, useRef } from 'react';

const COLORS = [
    { bg: 'bg-indigo-500', ring: 'ring-indigo-400', label: 'Indigo' },
    { bg: 'bg-emerald-500', ring: 'ring-emerald-400', label: 'Emerald' },
    { bg: 'bg-rose-500', ring: 'ring-rose-400', label: 'Rose' },
    { bg: 'bg-amber-500', ring: 'ring-amber-400', label: 'Amber' },
    { bg: 'bg-purple-500', ring: 'ring-purple-400', label: 'Purple' },
];

export const fileUrl = '/src/slides/use-state/demo/CardBuilder.tsx';

export default function CardBuilder() {
    const [name, setName] = useState('Alex Johnson');
    const [role, setRole] = useState('Frontend Developer');
    const [colorIdx, setColorIdx] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const renderCount = useRef(0);
    renderCount.current++;

    const color = COLORS[colorIdx];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    State Inputs
                </p>
                <span className="text-[10px] font-mono text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-full">
                    renders:{' '}
                    <span className="text-indigo-400">
                        {renderCount.current}
                    </span>
                </span>
            </div>

            <div className="space-y-2.5">
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Role
                    </label>
                    <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Avatar Color
                    </label>
                    <div className="flex gap-2">
                        {COLORS.map((c, i) => (
                            <button
                                key={c.label}
                                onClick={() => setColorIdx(i)}
                                className={`w-7 h-7 rounded-full ${c.bg} transition-all ${
                                    colorIdx === i
                                        ? `ring-2 ring-offset-2 ring-offset-zinc-900 ${c.ring}`
                                        : ''
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsActive((a) => !a)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                            isActive ? 'bg-indigo-600' : 'bg-zinc-700'
                        }`}
                    >
                        <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                                isActive ? 'left-5' : 'left-0.5'
                            }`}
                        />
                    </button>
                    <span className="text-xs text-zinc-400">
                        {isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    Live Preview
                </p>
                <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4 flex items-center gap-4">
                    <div
                        className={`w-12 h-12 rounded-full ${color.bg} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                    >
                        {name.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm text-zinc-100 truncate">
                                {name || 'Enter a name'}
                            </p>
                            {isActive && (
                                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                            )}
                        </div>
                        <p className="text-xs text-zinc-400 truncate">
                            {role || 'Enter a role'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
