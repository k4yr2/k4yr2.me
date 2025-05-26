import styles from '@/styles/HeroTitle.module.css';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { Space_Grotesk } from 'next/font/google';
import { useEffect, useRef } from 'react';
import appStore from '@/data/store';
import { AnimationState } from '@/data/state';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: '700' });

const HeroTitle = () => {
    const firstWriter = useRef<TypewriterClass>(null);
    const secondWriter = useRef<TypewriterClass>(null);
    const animation_hi = appStore((state) => state.home.animation.title_hi);
    const animation_back = appStore((state) => state.home.animation.title_back);
    const animation_name = appStore((state) => state.home.animation.title_name);
    const animation_calendar = appStore((state) => state.home.animation.calendar);

    const animationFrame = appStore((state) => state.home.animation.frame);

    useEffect(() => {
        switch (animation_hi) {
            case AnimationState.waiting:
                animationFrame();
                break;
            case AnimationState.animating:
                firstWriter.current!.pauseFor(500)
                    .typeString('Hi, ').pauseFor(300)
                    .typeString("I'm Kayra")
                    .callFunction(() => {
                        firstWriter.current!.stop();
                        animationFrame(true);
                    })
                    .start();
                break;
        }
    }, [animation_hi, animationFrame]);

    useEffect(() => {
        switch (animation_back) {
            case AnimationState.animating:
                firstWriter.current!
                    .deleteChars(7)
                    .pauseFor(300)
                    .callFunction(() => {
                        firstWriter.current!.stop();
                        animationFrame(true);
                    })
                .start();
                break;
        }
    }, [animation_back, animationFrame]);

    useEffect(() => {
        switch (animation_name) {
            case AnimationState.animating:
                secondWriter.current!
                    .typeString("M. Kayra")
                    .pauseFor(200)
                    .callFunction(() => {
                        secondWriter.current!.stop();
                        animationFrame(true);
                    })
                .start();
                break;
        }
    }, [animation_name, animationFrame]);

    return (
        <div className={[styles.heroTitle, spaceGrotesk.className].join(' ')}>
            <div className={styles.writerFirst}>
                {animation_name == AnimationState.animated ? <>Hi, I&apos;</> 
                : <Typewriter options={{
                    delay: 50,
                    deleteSpeed: 30,
                    cursor: '',
                    }}
                    onInit={
                        (typewriter) => { 
                            firstWriter.current = typewriter;
                        }
                    }
                />}
            </div>
            <div className={styles.writerSecond + ' ' + (animation_calendar != AnimationState.waiting ? styles.animated : '')}>
                {animation_name == AnimationState.animated ? <>M. Kayra</> 
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