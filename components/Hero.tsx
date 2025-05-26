import HeroCalendar from './HeroCalendar';
import HeroTagline from './HeroTagline';
import HeroTitle from './HeroTitle';

const Hero = () => {
    return (
        <div style={{font: '36px'}}>
            <HeroTitle />
            <HeroTagline />
            <HeroCalendar />
        </div>

    )
}

export default Hero;