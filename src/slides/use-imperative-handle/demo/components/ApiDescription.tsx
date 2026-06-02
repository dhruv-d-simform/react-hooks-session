export function ApiDescription() {
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3">
            <p className="text-xs text-zinc-500">
                <span className="font-mono text-amber-300">FancyInput</span>{' '}
                exposes{' '}
                <span className="font-mono text-emerald-400">focus</span>,{' '}
                <span className="font-mono text-emerald-400">clear</span>, and{' '}
                <span className="font-mono text-emerald-400">shake</span> — the
                parent controls it without knowing its internals.
            </p>
        </div>
    );
}
