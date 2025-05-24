import styles from '@/styles/HeroTitle.module.css';
import Typewriter from 'typewriter-effect';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: '700' });

const HeroTitle = () => {
    return (
        <div className={[styles.heroTitle, spaceGrotesk.className].join(' ')}>
            <Typewriter component="div"
                options={{
                delay: 50,
                deleteSpeed: 30,
                cursor: '',
                }}
                onInit={
                    (typewriter) => {
                        typewriter
                            .pauseFor(500)
                            .typeString('Hi, ').pauseFor(300)
                            .typeString("I'm Kayra").pauseFor(1000)
                            .deleteChars(7).pauseFor(300)
                            .typeString(" M. Kayra")
                            .start();
                    }
                }
            />
        </div>
    );
}

export default HeroTitle;