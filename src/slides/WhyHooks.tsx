import CodeBlock from '@/components/CodeBlock';

const classCode = `// 😩 Class Component — logic scattered across 3 lifecycle methods
class Counter extends Component {
  state = { count: 0, timer: 0 }
  private intervalId?: ReturnType<typeof setInterval>

  componentDidMount() {
    document.title = \`Count: \${this.state.count}\`  // 1️⃣ title sync
    this.intervalId = setInterval(                  // 2️⃣ timer start
      () => this.setState(p => ({ timer: p.timer+1 })), 1000
    )
  }

  componentDidUpdate(_, prevState) {
    if (prevState.count !== this.state.count)
      document.title = \`Count: \${this.state.count}\`  // 1️⃣ title sync (again)
  }

  componentWillUnmount() {
    document.title = 'App'            // 1️⃣ title cleanup
    clearInterval(this.intervalId!)   // 2️⃣ timer cleanup (far from start)
  }

  render() { ... }
}`;

const hooksCode = `// ✅ Functional Component — related logic lives together
function Counter() {
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(0)

  // 1️⃣ Title sync — setup + cleanup in one place
  useEffect(() => {
    document.title = \`Count: \${count}\`
    return () => { document.title = 'App' }
  }, [count])

  // 2️⃣ Timer — start + cleanup live together
  useEffect(() => {
    const id = setInterval(() => setTimer(t => t + 1), 1000)
    return () => clearInterval(id)  // ✅ right next to start
  }, [])

  return ( ... )
}`;

const problems = [
    {
        emoji: '🔀',
        title: 'Scattered Logic',
        desc: 'Related code (timer setup + cleanup) is split across componentDidMount and componentWillUnmount.',
    },
    {
        emoji: '♻️',
        title: 'Hard to Reuse',
        desc: 'To reuse stateful logic, you need complex patterns like HOCs or render props.',
    },
    {
        emoji: '😵',
        title: '`this` Confusion',
        desc: '`this` binding is a source of bugs. Arrow functions or .bind() required everywhere.',
    },
    {
        emoji: '📦',
        title: 'Bloated Components',
        desc: 'Unrelated logic is forced together in the same lifecycle methods.',
    },
];

export default function WhyHooks() {
    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <div className="px-8 pt-5 pb-4 shrink-0">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-2.5">
                    Motivation
                </span>
                <h1 className="text-3xl font-black tracking-tight mb-1">
                    Why Hooks?
                </h1>
                <p className="text-zinc-400 text-sm">
                    Three problems with class components that hooks solve
                    elegantly
                </p>
            </div>

            <div className="px-8 pb-6 space-y-6">
                {/* Problems grid */}
                <div className="grid grid-cols-2 gap-3">
                    {problems.map((p) => (
                        <div
                            key={p.title}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                        >
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="text-xl">{p.emoji}</span>
                                <span className="font-semibold text-sm">
                                    {p.title}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                {p.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Side-by-side code comparison */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
                        Same functionality — Class vs Hooks
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-red-400 font-semibold mb-2">
                                😩 Before: Class Component
                            </p>
                            <CodeBlock
                                code={classCode}
                                title="Class Component"
                            />
                        </div>
                        <div>
                            <p className="text-xs text-emerald-400 font-semibold mb-2">
                                ✅ After: Functional + Hooks
                            </p>
                            <CodeBlock
                                code={hooksCode}
                                title="Functional Component"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-700/30 rounded-xl p-4">
                    <p className="text-sm font-semibold text-indigo-300 mb-1">
                        The Core Insight
                    </p>
                    <p className="text-sm text-zinc-300">
                        Hooks let you organize code by{' '}
                        <span className="text-indigo-300 font-semibold">
                            what it does
                        </span>
                        , not by{' '}
                        <span className="text-zinc-400 line-through">
                            when it runs
                        </span>
                        . Related logic stays together.
                    </p>
                </div>
            </div>
        </div>
    );
}
