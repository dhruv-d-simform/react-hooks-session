import InfoHeader from '@/components/InfoHeader';
import SyntaxBlock from '@/components/SyntaxBlock';
import BulletList from '@/components/BulletList';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Custom Hooks"
                title="Custom Hooks"
                subtitle="Extract stateful logic into reusable functions — the most powerful pattern in React"
            />
            <SyntaxBlock>{`function useMyHook(args) {
  // any built-in hooks here
  return [value, updater]
}`}</SyntaxBlock>
            <BulletList
                items={[
                    { text: 'A custom hook is just a function starting with "use" that calls hooks inside' },
                    {
                        text: 'Lets you extract and share stateful logic across components',
                        highlight: true,
                    },
                    { text: 'Each component calling the hook gets its own isolated state' },
                    { text: 'useLocalStorage — useState + localStorage sync' },
                    { text: 'useDebounce — delay value updates to reduce API calls' },
                    { text: 'useFetch — data + loading + error + cleanup in one hook' },
                ]}
            />
        </div>
    );
}
