import InfoHeader from '@/components/InfoHeader';
import BulletList from '@/components/BulletList';

export default function Info() {
    return (
        <div className="p-6 space-y-5">
            <InfoHeader
                badge="Before Hooks"
                badgeVariant="amber"
                title="Class Components"
                subtitle="State and lifecycle in class-based React — the original way to build stateful UIs"
            />
            <BulletList
                items={[
                    { text: 'State lives in this.state, updated via this.setState()' },
                    { text: 'componentDidMount → runs after first render (like "setup")' },
                    { text: 'componentDidUpdate → runs after every re-render' },
                    { text: 'componentWillUnmount → cleanup before component is removed' },
                    {
                        text: 'Timer setup is in mount, cleanup is in unmount — logic is split',
                        highlight: true,
                    },
                    { text: 'Must use arrow functions or bind(this) for event handlers' },
                    { text: 'Class components are deprecated in React 19' },
                ]}
            />
        </div>
    );
}
