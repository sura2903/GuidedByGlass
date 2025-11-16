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

// Expose API (in case you ever want a button again)
script.api.showHello = showHello;
script.api.showLove  = showLove;
script.api.toggle = function () {
    if (showingLove) {
        showHello();
    } else {
        showLove();
    }
};

// Start on HELLO
var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(showHello);

// TAP ANYWHERE → TOGGLE
var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function () {
    script.api.toggle();
});