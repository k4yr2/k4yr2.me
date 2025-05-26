import { AnimationState } from "@/data/state";

const nextAnimation = (states : AnimationState[]) : boolean => {
    for (let i = 0; i < states.length; i++) {
        switch (states[i]) {
            case AnimationState.waiting:
                states[i] = AnimationState.animating;
                return true;
            case AnimationState.animating:
                states[i] = AnimationState.animated;
                return true;
            case AnimationState.animated:
                continue;
        }
    }

    return false;
}

export default nextAnimation;