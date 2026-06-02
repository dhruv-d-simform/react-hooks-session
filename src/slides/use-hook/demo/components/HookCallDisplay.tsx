export function HookCallDisplay() {
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 font-mono text-[11px] space-y-0.5">
            <p className="text-zinc-500">
                <span className="text-purple-400">const</span> post ={' '}
                <span className="text-yellow-400">use</span>(promise)
            </p>
            <p className="text-zinc-600">
                {'// Suspense shows fallback while pending'}
            </p>
        </div>
    );
}
