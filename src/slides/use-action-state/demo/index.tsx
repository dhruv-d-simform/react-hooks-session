import { useActionState } from 'react';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-action-state/demo/index.tsx';

type FormState =
    | { status: 'idle' }
    | { status: 'error'; message: string }
    | { status: 'success'; name: string };

async function submitContact(
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500));

    if (!name || !email || !message) {
        return { status: 'error', message: 'All fields are required.' };
    }
    if (!email.includes('@')) {
        return { status: 'error', message: 'Please enter a valid email.' };
    }

    return { status: 'success', name };
}

export default function Demo() {
    const [state, dispatch, isPending] = useActionState(submitContact, {
        status: 'idle',
    });

    if (state.status === 'success') {
        return (
            <div className="p-6">
                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-8 flex flex-col items-center gap-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-2xl">
                        ✅
                    </div>
                    <div>
                        <p className="font-semibold text-zinc-100 mb-1">
                            Thanks, {state.name}!
                        </p>
                        <p className="text-sm text-zinc-500">
                            Your message was sent.
                        </p>
                    </div>
                    <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 font-mono text-[11px] w-full text-left">
                        <p className="text-emerald-400">
                            state.status === "success"
                        </p>
                        <p className="text-zinc-500 mt-0.5">
                            state.name === "{state.name}"
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-2.5 font-mono text-[11px] flex items-center gap-2">
                    <span className="text-pink-300">state.status</span>
                    <span className="text-zinc-600">=</span>
                    <span className="text-zinc-300">"{state.status}"</span>
                    <span className="ml-auto text-indigo-300">
                        isPending: {String(isPending)}
                    </span>
                </div>

                {state.status === 'error' && (
                    <div className="bg-rose-900/20 border border-rose-700/30 rounded-lg px-3 py-2">
                        <p className="text-xs text-rose-400">{state.message}</p>
                    </div>
                )}

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
            </div>
        </div>
    );
}
