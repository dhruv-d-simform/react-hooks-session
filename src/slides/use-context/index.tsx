import SlideShell from '@/components/SlideShell';
import Info from './Info';
import Demo from './Demo';

export default function UseContextSlide() {
    return <SlideShell left={<Info />} right={<Demo />} />;
}
