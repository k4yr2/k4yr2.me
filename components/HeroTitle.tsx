import styles from '@/styles/HeroTitle.module.css';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { Space_Grotesk } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import k4yr2Store from '@/data/store';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: '700' });

const HeroTitle = () => {
    const [first, setFirst] = useState(false);
    const secondWriter = useRef<TypewriterClass>(null);
    const isAnimated = k4yr2Store((state) => state.isAnimated);
    const setAnimated = k4yr2Store((state) => state.setAnimated);

    useEffect(() => {
        if (first && secondWriter.current) {
            secondWriter.current
                .typeString("M. Kayra")
                .pauseFor(300)
                .callFunction(() => {
                    setAnimated();
                })
                .start();
        }
    }, [first, setAnimated]);

    return (
        <div className={[styles.heroTitle, spaceGrotesk.className].join(' ')}>
            <div className={styles.writerFirst}>
                {isAnimated ? <>Hi, I&apos;</> 
                : <Typewriter options={{
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
                />}
            </div>
            <div className={styles.writerSecond + ' ' + (isAnimated ? styles.animated : '')}>
                {isAnimated ? <>M. Kayra</> 
                : <Typewriter options={{
                    delay: 50,
                    deleteSpeed: 30,
                    cursor: '',
                    }}
                    onInit={
                        (typewriter) => {
                            secondWriter.current = typewriter;
                        }
                    }
                />}
            </div>
        </div>
    );
}

export default HeroTitle;