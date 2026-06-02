export function ContactForm({
    dispatch,
    isPending,
}: {
    dispatch: (payload: FormData) => void;
    isPending: boolean;
}) {
    return (
        <form action={dispatch} className="space-y-3">
            <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                    Name
                </label>
                <input
                    name="name"
                    placeholder="Your name"
                    disabled={isPending}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-pink-500 disabled:opacity-50 transition-colors placeholder:text-zinc-600"
                />
            </div>
            <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    disabled={isPending}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-pink-500 disabled:opacity-50 transition-colors placeholder:text-zinc-600"
                />
            </div>
            <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                    Message
                </label>
                <textarea
                    name="message"
                    rows={3}
                    placeholder="Your message…"
                    disabled={isPending}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-pink-500 disabled:opacity-50 transition-colors placeholder:text-zinc-600 resize-none"
                />
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="w-full py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium text-white transition-colors flex items-center justify-center gap-2"
            >
                {isPending ? (
                    <>
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Sending…
                    </>
                ) : (
                    'Send Message'
                )}
            </button>
        </form>
    );
}
