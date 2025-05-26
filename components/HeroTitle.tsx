import styles from '@/styles/HeroTitle.module.css';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { Space_Grotesk } from 'next/font/google';
import { useEffect, useRef } from 'react';
import appStore from '@/data/store';
import { AnimationState } from '@/data/state';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: '700' });

const HeroTitle = () => {
    const secondWriter = useRef<TypewriterClass>(null);
    const animation = appStore((state) => state.home.animation.title);
    const animationFrame = appStore((state) => state.home.animation.next);

    useEffect(() => {
        if (animation === 'waiting') {
            animationFrame();
        }
    }, []);

    return (
        <div className={[styles.heroTitle, spaceGrotesk.className].join(' ')}>
            <div className={styles.writerFirst}>
                {animation == AnimationState.animated ? <>Hi, I&apos;</> 
                : <Typewriter options={{
                    delay: 50,
                    deleteSpeed: 30,
                    cursor: '',
                    }}
                    onInit={
                        (typewriter) => { typewriter
                            .pauseFor(500)
                            .typeString('Hi, ').pauseFor(300)
                            .typeString("I'm Kayra").pauseFor(700)
                            .deleteChars(7).pauseFor(300)
                            .callFunction(() => {
                                secondWriter.current!
                                    .typeString("M. Kayra")
                                    .pauseFor(200)
                                    .callFunction(() => {
                                        animationFrame();
                                    })
                                    .start();
                            })
                            .start();
                        }
                    }
                />}
            </div>
            <div className={styles.writerSecond + ' ' + (animation == AnimationState.animated ? styles.animated : '')}>
                {animation == AnimationState.animated ? <>M. Kayra</> 
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