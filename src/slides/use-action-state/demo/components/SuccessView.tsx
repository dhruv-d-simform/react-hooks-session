export function SuccessView({ name }: { name: string }) {
    return (
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-8 flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-2xl">
                ✅
            </div>
            <div>
                <p className="font-semibold text-zinc-100 mb-1">
                    Thanks, {name}!
                </p>
                <p className="text-sm text-zinc-500">Your message was sent.</p>
            </div>
            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 font-mono text-[11px] w-full text-left">
                <p className="text-emerald-400">state.status === "success"</p>
                <p className="text-zinc-500 mt-0.5">
                    state.name === "{name}"
                </p>
            </div>
        </div>
    );
}
