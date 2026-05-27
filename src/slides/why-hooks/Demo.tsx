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

export default function Demo() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Code Comparison</p>
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
        </div>
    );
}
