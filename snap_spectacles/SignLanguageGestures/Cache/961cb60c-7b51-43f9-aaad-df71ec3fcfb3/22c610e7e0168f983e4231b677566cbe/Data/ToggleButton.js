// ToggleButton.js
// @input Component.ScriptComponent handSwitcher

var tap = script.createEvent("TapEvent");
tap.bind(function () {
    if (!script.handSwitcher || !script.handSwitcher.api) {
        print("ToggleButton: HandSwitcher not linked");
        return;
    }

    // Toggle between poses
    if (script.handSwitcher.api.isLoveActive()) {
        script.handSwitcher.api.showHello();
        print("Switched → HELLO");
    } else {
        script.handSwitcher.api.showLove();
        print("Switched → LOVE");
    }
});