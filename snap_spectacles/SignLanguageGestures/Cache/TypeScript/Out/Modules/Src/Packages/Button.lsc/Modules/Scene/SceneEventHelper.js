"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneEventHelper = void 0;
class SceneEventHelper {
    constructor(script) {
        this.script = script;
    }
    delayCb(cb, delay) {
        const delayEv = this.script.createEvent("DelayedCallbackEvent");
        delayEv.bind(() => {
            cb();
            this.script.removeEvent(delayEv);
        });
        delayEv.reset(delay);
    }
    touchEventOutsideExceptionAreas(cbObTap, exceptionAreas) {
        const touchEvent = this.script.createEvent("TouchStartEvent");
        touchEvent.bind((data) => {
            if (!exceptionAreas.some(area => area.containsScreenPoint(data.getTouchPosition()))) {
                cbObTap && cbObTap();
            }
        });
        return touchEvent;
    }
}
exports.SceneEventHelper = SceneEventHelper;
//# sourceMappingURL=SceneEventHelper.js.map