import { createContext, useContext, useState } from 'react';
import CodeBlock from '@/components/CodeBlock';

// --- Context definitions ---

interface Theme {
    name: 'dark' | 'light' | 'purple';
    bg: string;
    card: string;
    text: string;
    accent: string;
    border: string;
}

const themes: Record<string, Theme> = {
    dark: {
        name: 'dark',
        bg: 'bg-zinc-900',
        card: 'bg-zinc-800',
        text: 'text-zinc-100',
        accent: 'bg-indigo-600',
        border: 'border-zinc-700',
    },
    light: {
        name: 'light',
        bg: 'bg-gray-100',
        card: 'bg-white',
        text: 'text-gray-900',
        accent: 'bg-blue-500',
        border: 'border-gray-200',
    },
    purple: {
        name: 'purple',
        bg: 'bg-purple-950',
        card: 'bg-purple-900',
        text: 'text-purple-100',
        accent: 'bg-fuchsia-600',
        border: 'border-purple-700',
    },
};

interface ThemeContextValue {
    theme: Theme;
    setThemeName: (name: keyof typeof themes) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
}

// --- Deep component tree showing NO prop drilling ---

function Avatar() {
    const { theme } = useTheme();
    return (
        <div
            className={`w-10 h-10 rounded-full ${theme.accent} flex items-center justify-center text-white font-bold text-sm`}
        >
            RH
        </div>
    );
}

function UserCard() {
    const { theme } = useTheme();
    return (
        <div
            className={`${theme.card} border ${theme.border} rounded-xl p-4 flex items-center gap-3`}
        >
            <Avatar />
            <div>
                <p className={`text-sm font-semibold ${theme.text}`}>
                    React Hooks
                </p>
                <p className="text-xs text-zinc-400">Session 2025</p>
            </div>
        </div>
    );
}

function ThemeSwitcher() {
    const { theme, setThemeName } = useTheme();
    return (
        <div className="flex gap-2">
            {Object.keys(themes).map((name) => (
                <button
                    key={name}
                    onClick={() => setThemeName(name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-colors ${
                        theme.name === name
                            ? 'border-indigo-500 text-indigo-300 bg-indigo-900/30'
                            : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                    }`}
                >
                    {name}
                </button>
            ))}
        </div>
    );
}

function Navbar() {
    const { theme } = useTheme();
    return (
        <div
            className={`${theme.card} border-b ${theme.border} px-4 py-3 flex items-center justify-between`}
        >
            <span className={`text-sm font-bold ${theme.text}`}>My App</span>
            <ThemeSwitcher />
        </div>
    );
}

function Page() {
    const { theme } = useTheme();
    return (
        <div
            className={`${theme.bg} rounded-xl overflow-hidden border ${theme.border}`}
        >
            <Navbar />
            <div className="p-4 space-y-3">
                <UserCard />
                <div
                    className={`${theme.card} border ${theme.border} rounded-xl p-4`}
                >
                    <p className={`text-xs ${theme.text} opacity-60`}>
                        Page Content
                    </p>
                    <p className={`text-sm ${theme.text} mt-1`}>
                        Theme is consumed deep in the tree — no props passed
                        down. ✓
                    </p>
                </div>
            </div>
        </div>
    );
}

function ThemeDemo() {
    const [themeName, setThemeName] = useState<keyof typeof themes>('dark');

    return (
        <ThemeContext.Provider
            value={{ theme: themes[themeName], setThemeName }}
        >
            <div className="space-y-3">
                <p className="text-xs text-zinc-500">
                    Component tree:{' '}
                    <code className="text-indigo-400">
                        ThemeProvider → Page → Navbar → ThemeSwitcher → Avatar
                    </code>
                </p>
                <Page />
                <p className="text-xs text-zinc-600">
                    No theme prop is passed to any intermediate component.
                </p>
            </div>
        </ThemeContext.Provider>
    );
}

const code = `// 1. Create context
const ThemeContext = createContext<ThemeContextValue | null>(null)

// 2. Custom hook for clean consumption
function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}

// 3. Wrap your tree with a provider
function App() {
  const [theme, setTheme] = useState(themes.dark)
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />   {/* No props needed! */}
    </ThemeContext.Provider>
  )
}

// 4. Consume anywhere deep in the tree — no prop drilling
function Avatar() {
  const { theme } = useTheme()          // just call the hook
  return <div className={theme.accent}>RH</div>
}`;

export default function Demo() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Live Demo</p>
                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
                    <ThemeDemo />
                </div>
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Source</p>
                <CodeBlock code={code} title="useContext — Theme Example" />
            </div>
        </div>
    );
}
