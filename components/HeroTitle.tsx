import styles from '@/styles/HeroTitle.module.css';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { Space_Grotesk } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: '700' });

const HeroTitle = () => {
    const [first, setFirst] = useState(false);
    const secondWriter = useRef<TypewriterClass>(null);

    useEffect(() => {
        if (first && secondWriter.current) {
            secondWriter.current
                .typeString("M. Kayra")
                .start();
        }
    }, [first]);

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
                        if(!first) {
                            typewriter
                            .pauseFor(500)
                            .typeString('Hi, ').pauseFor(300)
                            .typeString("I'm Kayra").pauseFor(1000)
                            .deleteChars(7).pauseFor(300)
                            .callFunction(() => setFirst(true))
                            .start();
                        }
                    }
                }
            />
            <Typewriter component="div"
                options={{
                delay: 50,
                deleteSpeed: 30,
                cursor: '',
                }}
                onInit={
                    (typewriter) => {
                        secondWriter.current = typewriter;
                    }
                }
            />
        </div>
    );
}

export default HeroTitle;