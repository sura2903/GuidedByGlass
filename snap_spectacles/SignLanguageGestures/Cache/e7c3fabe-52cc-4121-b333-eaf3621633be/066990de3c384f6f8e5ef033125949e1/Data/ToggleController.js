// ToggleController.js

// @input Component.ScriptComponent handSwitcher

var isLove = false;

function setHello() {
    if (!script.handSwitcher || !script.handSwitcher.api) {
        print("ToggleController: no HandSwitcher");
        return;
    }
    script.handSwitcher.api.showHello();
    isLove = false;
}

function setLove() {
    if (!script.handSwitcher || !script.handSwitcher.api) {
        print("ToggleController: no HandSwitcher");
        return;
    }
    script.handSwitcher.api.showLove();
    isLove = true;
}

function toggle() {
    if (isLove) {
        setHello();
    } else {
        setLove();
    }
    print("ToggleController: toggled, isLove = " + isLove);
}

// expose for button
script.api.toggle   = toggle;
script.api.setHello = setHello;
script.api.setLove  = setLove;

// tap anywhere on screen to toggle
var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(toggle);