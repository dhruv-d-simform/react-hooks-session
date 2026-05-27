import SlideShell from '@/components/SlideShell';
import Info from './Info';
import Demo from './Demo';

export default function UseEffectSlide() {
    return <SlideShell left={<Info />} right={<Demo />} />;
}
