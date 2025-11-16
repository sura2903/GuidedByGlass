// ToggleButton.js

// @input Component.ScriptComponent handSwitcher

var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function () {
    if (!script.handSwitcher || !script.handSwitcher.api) {
        print("ToggleButton: handSwitcher not assigned or has no api");
        return;
    }

    if (script.handSwitcher.api.isLoveActive()) {
        script.handSwitcher.api.showHello();
        print("ToggleButton → HELLO");
    } else {
        script.handSwitcher.api.showLove();
        print("ToggleButton → LOVE");
    }
});