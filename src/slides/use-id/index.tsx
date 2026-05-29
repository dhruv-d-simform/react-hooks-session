import SlideShell from '@/components/SlideShell';
import Info from './Info';
import Demo from './demo';

export default function UseIdSlide() {
    return <SlideShell left={<Info />} right={<Demo />} />;
}
