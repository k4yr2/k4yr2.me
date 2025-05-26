import { AnimationState } from "@/data/state";
import appStore from "@/data/store";
import Typewriter from 'typewriter-effect';

const HeroTagline = () => {
    const animation = appStore((state) => state.home.animation.tagline);
    const animationFrame = appStore((state) => state.home.animation.frame);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', marginTop: '20px' }}>
            {animation == AnimationState.animated ? <>Once an anonymous builder, Now a student with real-world experience</> 
            : animation == AnimationState.animating ? <Typewriter options={{
                delay: 25,
                }}
                onInit={
                    (typewriter) => { typewriter
                        .pauseFor(500)
                        .typeString('Once an anonymous builder, ').pauseFor(400)
                        .typeString('Now a student').pauseFor(200)
                        .typeString(' with real-world experience').pauseFor(200)
                        .callFunction(() => {
                            animationFrame(true);
                        })
                        .start();
                    }
                }
            /> : null}
        </div>
    );
}

export default HeroTagline;