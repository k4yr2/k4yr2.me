import { AnimationRecord, AnimationState } from "@/data/state";

const animationFrame = (record : AnimationRecord, trigger : boolean = false) : boolean => {
    for(const [key, state] of Object.entries(record)) {
        switch (state) {
            case AnimationState.waiting:
                record[key] = AnimationState.animating;
                return true;
            case AnimationState.animating:
                record[key] = AnimationState.animated;
                
                if(trigger) continue;
                else return true;
        }
    }

    return false;
}

export default animationFrame;