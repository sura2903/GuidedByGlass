// HandSwitcher.js

// @input SceneObject hello   // your HELLO / neutral hand object
// @input SceneObject love    // your "I like you" / LOVE hand object

var showingLove = false;

function ready() {
    if (!script.hello || !script.love) {
        print("⚠ HandSwitcher: hello or love is NOT assigned!");
        return false;
    }
    return true;
}

function showHello() {
    if (!ready()) { return; }
    script.hello.enabled = true;
    script.love.enabled = false;
    showingLove = false;
    print("HandSwitcher: SHOW HELLO");
}

function showLove() {
    if (!ready()) { return; }
    script.hello.enabled = false;
    script.love.enabled = true;
    showingLove = true;
    print("HandSwitcher: SHOW LOVE");
}

// Expose simple API
script.api.showHello = showHello;
script.api.showLove  = showLove;
script.api.toggle = function () {
    if (showingLove) {
        showHello();
    } else {
        showLove();
    }
};
script.api.isLoveActive = function () {
    return showingLove;
};

// Start on hello when lens turns on
var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(showHello);

// ❌ NO TapEvent here – we keep all toggling in the button to avoid double-toggles