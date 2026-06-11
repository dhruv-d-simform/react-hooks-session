const hints = [
    { keys: 'Space', action: 'start / pause' },
    { keys: 'R', action: 'reset' },
];

export function ShortcutHints() {
    return (
        <div className="flex items-center justify-center gap-4">
            {hints.map((h) => (
                <span
                    key={h.keys}
                    className="text-[11px] text-zinc-500 flex items-center gap-1.5"
                >
                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[10px] text-zinc-300">
                        {h.keys}
                    </kbd>
                    {h.action}
                </span>
            ))}
            <span className="text-[11px] text-zinc-600">
                · watch the browser tab title while it runs
            </span>
        </div>
    );
}
