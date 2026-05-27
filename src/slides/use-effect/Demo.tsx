import { useState, useEffect, useRef } from 'react';
import CodeBlock from '@/components/CodeBlock';
import TabBar from '@/components/TabBar';

type Tab = 'title' | 'timer' | 'fetch';

function TitleDemo() {
    const [text, setText] = useState('');
    const original = useRef(document.title);

    useEffect(() => {
        document.title = text ? `📝 ${text}` : original.current;
        return () => {
            document.title = original.current;
        };
    }, [text]);

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs text-zinc-500 mb-1.5">
                    Type something — watch the browser tab title:
                </label>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
            </div>
            <div className="bg-zinc-800 rounded-lg p-3 text-sm font-mono">
                <span className="text-zinc-500">document.title = </span>
                <span className="text-indigo-300">
                    "{text ? `📝 ${text}` : 'React Hooks (original)'}"
                </span>
            </div>
            <p className="text-xs text-zinc-600">
                Effect runs after every render where{' '}
                <code className="text-indigo-400">text</code> changed. Cleanup
                restores the title on unmount.
            </p>
        </div>
    );
}

function TimerDemo() {
    const [running, setRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) =>
        setLog((prev) => [
            `[${new Date().toLocaleTimeString()}] ${msg}`,
            ...prev.slice(0, 4),
        ]);

    useEffect(() => {
        if (!running) return;

        addLog('▶ Effect ran — starting interval');
        const id = setInterval(() => setSeconds((s) => s + 1), 1000);

        return () => {
            addLog('🧹 Cleanup ran — clearing interval');
            clearInterval(id);
        };
    }, [running]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <span className="text-5xl font-black font-mono tabular-nums">
                    {seconds}s
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setRunning((r) => !r)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            running
                                ? 'bg-red-600/80 hover:bg-red-600'
                                : 'bg-indigo-600 hover:bg-indigo-500'
                        }`}
                    >
                        {running ? 'Stop' : 'Start'}
                    </button>
                    <button
                        onClick={() => setSeconds(0)}
                        className="px-4 py-2 rounded-lg text-sm bg-zinc-700 hover:bg-zinc-600 transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="bg-zinc-950 rounded-lg p-3 space-y-1 font-mono text-xs min-h-[80px]">
                {log.length === 0 ? (
                    <p className="text-zinc-600">
                        Effect log will appear here...
                    </p>
                ) : (
                    log.map((l, i) => (
                        <p
                            key={i}
                            className={
                                l.includes('Cleanup')
                                    ? 'text-amber-400'
                                    : 'text-emerald-400'
                            }
                        >
                            {l}
                        </p>
                    ))
                )}
            </div>
            <p className="text-xs text-zinc-600">
                Cleanup runs when the effect re-runs (or on unmount) — toggle to
                see it live.
            </p>
        </div>
    );
}

interface Post {
    id: number;
    title: string;
    body: string;
}

function FetchDemo() {
    const [postId, setPostId] = useState(1);
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        setError('');
        setPost(null);

        const controller = new AbortController();

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((data: Post) => {
                setPost(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [postId]);

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <label className="text-xs text-zinc-400">Post ID:</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((id) => (
                        <button
                            key={id}
                            onClick={() => setPostId(id)}
                            className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                                postId === id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                            }`}
                        >
                            {id}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-zinc-800 rounded-lg p-4 min-h-[100px]">
                {loading && (
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span className="animate-spin">⏳</span>
                        <span>Fetching post {postId}...</span>
                    </div>
                )}
                {error && (
                    <p className="text-sm text-red-400">Error: {error}</p>
                )}
                {post && (
                    <div>
                        <p className="text-xs text-zinc-500 mb-1">
                            Post #{post.id}
                        </p>
                        <p className="text-sm font-semibold capitalize mb-1.5">
                            {post.title}
                        </p>
                        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                            {post.body}
                        </p>
                    </div>
                )}
            </div>
            <p className="text-xs text-zinc-600">
                Cleanup returns an AbortController — cancels in-flight requests
                when postId changes.
            </p>
        </div>
    );
}

const codeSamples: Record<Tab, string> = {
    title: `// Runs after every render where 'text' changed
useEffect(() => {
  document.title = text ? \`📝 \${text}\` : 'App'

  // Cleanup: runs before next effect OR on unmount
  return () => { document.title = 'App' }
}, [text])  // ← dependency array`,

    timer: `useEffect(() => {
  if (!running) return  // early exit — effect is a no-op

  const id = setInterval(() => setSeconds(s => s + 1), 1000)

  // Cleanup runs when 'running' changes or component unmounts
  return () => clearInterval(id)
}, [running])`,

    fetch: `useEffect(() => {
  const controller = new AbortController()

  fetch(\`/posts/\${postId}\`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setPost(data))
    .catch(err => { if (err.name !== 'AbortError') setError(err.message) })

  // Cancel in-flight request when postId changes
  return () => controller.abort()
}, [postId])`,
};

const tabLabels: Record<Tab, string> = {
    title: 'Document Title',
    timer: 'Timer & Cleanup',
    fetch: 'Data Fetching',
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('title');

    return (
        <div className="p-6 space-y-6">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Live Demo</p>
                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                    <TabBar
                        tabs={tabLabels}
                        active={activeTab}
                        onSelect={(v) => setActiveTab(v as Tab)}
                    />
                    {activeTab === 'title' && <TitleDemo />}
                    {activeTab === 'timer' && <TimerDemo />}
                    {activeTab === 'fetch' && <FetchDemo />}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Source</p>
                <CodeBlock code={codeSamples[activeTab]} title={`useEffect — ${tabLabels[activeTab]}`} />
            </div>
        </div>
    );
}
