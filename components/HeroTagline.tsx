import { AnimationState } from "@/data/state";
import appStore from "@/data/store";
import { useEffect, useRef } from "react";
import Typewriter, { TypewriterClass } from 'typewriter-effect';

const HeroTagline = () => {
    const writer = useRef<TypewriterClass>(null);
    const animation_once = appStore((state) => state.home.animation.tagline_once);
    const animation_now = appStore((state) => state.home.animation.tagline_now);
    const animationFrame = appStore((state) => state.home.animation.frame);

    useEffect(() => {
        switch (animation_once) {
            case AnimationState.animating:
                writer.current!.pauseFor(500)
                    .typeString('Once an anonymous builder, ').pauseFor(400)
                    .callFunction(() => {
                        writer.current!.stop();
                        animationFrame(true);
                    })
                    .start();
                break;
        }
    }, [animation_once, animationFrame]);

    useEffect(() => {
        switch (animation_now) {
            case AnimationState.animating:
                writer.current!.pauseFor(200)
                    .typeString('Now a student').pauseFor(360)
                    .typeString(' with real-world experiences').pauseFor(800)
                    .callFunction(() => {
                        writer.current!.stop();
                        animationFrame(true);
                    })
                    .start();
                break;
        }
    }, [animation_now, animationFrame]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', marginTop: '20px' }}>
            {animation_now == AnimationState.animated ? <>Once an anonymous builder, Now a student with real-world experiences</> 
            : <Typewriter options={{
                delay: 25,
                }}
                
                onInit={
                    (typewriter) => {
                        writer.current = typewriter;
                    }
                }
            />}
        </div>
    );
}

export default HeroTagline;