import { ArrowUpRight } from 'lucide-react';

interface Post {
    title: string;
    href: string;
}

// Essays by Dan Abramov — the engineer who introduced Hooks back in 2018.
const posts: Post[] = [
    {
        title: 'Why Do React Hooks Rely on Call Order?',
        href: 'https://overreacted.io/why-do-hooks-rely-on-call-order/',
    },
    {
        title: 'Why Isn’t X a Hook?',
        href: 'https://overreacted.io/why-isnt-x-a-hook/',
    },
    {
        title: 'React as a UI Runtime',
        href: 'https://overreacted.io/react-as-a-ui-runtime/',
    },
    {
        title: 'Making setInterval Declarative with React Hooks',
        href: 'https://overreacted.io/making-setinterval-declarative-with-react-hooks/',
    },
    {
        title: 'How Are Function Components Different from Classes?',
        href: 'https://overreacted.io/how-are-function-components-different-from-classes/',
    },
    {
        title: 'A Complete Guide to useEffect',
        href: 'https://overreacted.io/a-complete-guide-to-useeffect/',
    },
];

const journey = [
    { icon: '🕰️', title: 'Before Hooks', desc: 'Classes, HOCs & wrapper hell' },
    {
        icon: '🪝',
        title: '19 Built-in Hooks',
        desc: 'State, effects, performance & more',
    },
    {
        icon: '🧩',
        title: 'Custom Hooks',
        desc: 'Reuse stateful logic, your way',
    },
];

export default function WrapUp() {
    return (
        <div className="h-full overflow-y-auto slide-scroll flex items-center justify-center px-10 py-8">
            <div className="max-w-5xl w-full mx-auto">
                <div className="text-center mb-8">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-teal-400 px-3 py-1.5 bg-teal-500/10 rounded-full border border-teal-500/20 mb-4">
                        That&rsquo;s a wrap
                    </span>
                    <h1 className="text-5xl font-black tracking-tight mb-3 bg-linear-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                        Keep Going
                    </h1>
                    <p className="text-sm text-zinc-500">
                        From the world before hooks, through every built-in, to
                        rolling your own
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-10">
                    {journey.map((j, i) => (
                        <div
                            key={j.title}
                            className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center"
                        >
                            <span className="text-2xl block mb-2">
                                {j.icon}
                            </span>
                            <h3 className="text-sm font-semibold text-zinc-100 mb-0.5">
                                {j.title}
                            </h3>
                            <p className="text-[11px] text-zinc-500">
                                {j.desc}
                            </p>
                            {i < journey.length - 1 && (
                                <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-zinc-700 text-lg">
                                    →
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-lg flex-shrink-0">
                        ✍️
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-indigo-300">
                            Further reading — essays by Dan Abramov
                        </h2>
                        <p className="text-[11px] text-zinc-500">
                            The engineer who introduced Hooks, writing at{' '}
                            <span className="font-mono text-zinc-400">
                                overreacted.io
                            </span>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {posts.map((post) => (
                        <a
                            key={post.href}
                            href={post.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 transition-colors hover:border-indigo-500/60 hover:bg-indigo-500/5"
                        >
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-zinc-200 leading-snug group-hover:text-indigo-200 transition-colors">
                                    {post.title}
                                </p>
                                <p className="text-[10px] text-zinc-600 font-mono mt-1">
                                    overreacted.io
                                </p>
                            </div>
                            <ArrowUpRight
                                size={16}
                                className="text-zinc-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5"
                            />
                        </a>
                    ))}
                </div>

                <p className="text-center text-sm text-zinc-400 mt-8">
                    Thanks for hooking along — now go{' '}
                    <span className="text-teal-300 font-semibold">
                        build something
                    </span>
                    . ⚛
                </p>
            </div>
        </div>
    );
}
