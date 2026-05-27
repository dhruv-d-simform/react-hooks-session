import SlideShell from '@/components/SlideShell';
import Info from './Info';
import Demo from './Demo';

export default function CustomHooksSlide() {
    return <SlideShell left={<Info />} right={<Demo />} />;
}
