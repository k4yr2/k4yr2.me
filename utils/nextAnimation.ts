import { AnimationRecord, AnimationState } from "@/data/state";

const nextAnimation = (record : AnimationRecord) : boolean => {
    for(const [key, state] of Object.entries(record)) {
        switch (state) {
            case AnimationState.waiting:
                record[key] = AnimationState.animating;
                return true;
            case AnimationState.animating:
                record[key] = AnimationState.animated;
                return true;
        }
    }

    return false;
}

export default nextAnimation;