type Accent =
    | 'indigo'
    | 'purple'
    | 'amber'
    | 'rose'
    | 'emerald'
    | 'sky'
    | 'pink';

interface Category {
    title: string;
    icon: string;
    accent: Accent;
    hooks: string[];
    badge?: string;
    note?: string;
}

const accentStyles: Record<
    Accent,
    {
        ring: string;
        iconBg: string;
        iconText: string;
        chip: string;
        title: string;
        badge: string;
    }
> = {
    indigo: {
        ring: 'border-indigo-500/30 hover:border-indigo-500/60',
        iconBg: 'bg-indigo-500/15',
        iconText: 'text-indigo-300',
        chip: 'bg-indigo-500/10 text-indigo-200 border-indigo-500/30',
        title: 'text-indigo-300',
        badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    purple: {
        ring: 'border-purple-500/30 hover:border-purple-500/60',
        iconBg: 'bg-purple-500/15',
        iconText: 'text-purple-300',
        chip: 'bg-purple-500/10 text-purple-200 border-purple-500/30',
        title: 'text-purple-300',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    amber: {
        ring: 'border-amber-500/30 hover:border-amber-500/60',
        iconBg: 'bg-amber-500/15',
        iconText: 'text-amber-300',
        chip: 'bg-amber-500/10 text-amber-200 border-amber-500/30',
        title: 'text-amber-300',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    rose: {
        ring: 'border-rose-500/30 hover:border-rose-500/60',
        iconBg: 'bg-rose-500/15',
        iconText: 'text-rose-300',
        chip: 'bg-rose-500/10 text-rose-200 border-rose-500/30',
        title: 'text-rose-300',
        badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    emerald: {
        ring: 'border-emerald-500/30 hover:border-emerald-500/60',
        iconBg: 'bg-emerald-500/15',
        iconText: 'text-emerald-300',
        chip: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/30',
        title: 'text-emerald-300',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    sky: {
        ring: 'border-sky-500/30 hover:border-sky-500/60',
        iconBg: 'bg-sky-500/15',
        iconText: 'text-sky-300',
        chip: 'bg-sky-500/10 text-sky-200 border-sky-500/30',
        title: 'text-sky-300',
        badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    },
    pink: {
        ring: 'border-pink-500/30 hover:border-pink-500/60',
        iconBg: 'bg-pink-500/15',
        iconText: 'text-pink-300',
        chip: 'bg-pink-500/10 text-pink-200 border-pink-500/30',
        title: 'text-pink-300',
        badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    },
};

const categories: Category[] = [
    {
        title: 'State',
        icon: '🗂️',
        accent: 'indigo',
        hooks: ['useState', 'useReducer'],
    },
    {
        title: 'Context',
        icon: '🌐',
        accent: 'sky',
        hooks: ['useContext'],
    },
    {
        title: 'Ref',
        icon: '🎯',
        accent: 'amber',
        badge: 'Escape Hatch',
        hooks: ['useRef', 'useImperativeHandle'],
    },
    {
        title: 'Effect',
        icon: '⚡',
        accent: 'rose',
        badge: 'Escape Hatch',
        hooks: [
            'useEffect',
            'useEffectEvent',
            'useInsertionEffect',
            'useLayoutEffect',
        ],
    },
    {
        title: 'Performance',
        icon: '🚀',
        accent: 'emerald',
        hooks: ['useMemo', 'useCallback', 'useTransition', 'useDeferredValue'],
    },
    {
        title: 'Library Authors',
        icon: '🛠️',
        accent: 'purple',
        note: 'Mostly for library authors',
        hooks: ['useId', 'useDebugValue', 'useSyncExternalStore'],
    },
    {
        title: 'React 19 / Server Actions',
        icon: '✨',
        accent: 'pink',
        badge: 'New',
        hooks: ['use', 'useActionState', 'useOptimistic'],
    },
];

const totalHooks = categories.reduce((sum, c) => sum + c.hooks.length, 0);

export default function AllHooks() {
    return (
        <div className="h-full overflow-y-auto slide-scroll flex items-center justify-center px-10 py-8">
            <div className="max-w-6xl w-full mx-auto">
                <div className="text-center mb-8">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-indigo-400 px-3 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-4">
                        The Lineup
                    </span>
                    <h1 className="text-5xl font-black tracking-tight mb-3 bg-linear-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                        All React Hooks
                    </h1>
                    <p className="text-sm text-zinc-500">
                        {totalHooks} built-in hooks, grouped by what they're for
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {categories.map((cat) => {
                        const s = accentStyles[cat.accent];
                        return (
                            <div
                                key={cat.title}
                                className={`bg-zinc-900/60 border ${s.ring} rounded-xl p-4 transition-colors`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className={`w-9 h-9 rounded-lg ${s.iconBg} flex items-center justify-center text-lg`}
                                        >
                                            {cat.icon}
                                        </div>
                                        <div>
                                            <h3
                                                className={`text-sm font-bold ${s.title}`}
                                            >
                                                {cat.title}
                                            </h3>
                                            <p className="text-[10px] text-zinc-500 font-mono">
                                                {cat.hooks.length} hook
                                                {cat.hooks.length > 1
                                                    ? 's'
                                                    : ''}
                                            </p>
                                        </div>
                                    </div>
                                    {cat.badge && (
                                        <span
                                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.badge}`}
                                        >
                                            {cat.badge}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {cat.hooks.map((hook) => (
                                        <a
                                            key={hook}
                                            href={`https://react.dev/reference/react/${hook}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-[11px] font-mono px-2 py-1 rounded-md border transition-colors hover:brightness-125 ${s.chip}`}
                                        >
                                            {hook}
                                        </a>
                                    ))}
                                </div>

                                {cat.note && (
                                    <p className="text-[10px] text-zinc-500 mt-3 italic">
                                        {cat.note}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
