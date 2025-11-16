// HandSwitcher.js

// @input SceneObject hello
// @input SceneObject love

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
}

function showLove() {
    if (!ready()) { return; }
    script.hello.enabled = false;
    script.love.enabled = true;
    showingLove = true;
}

// Wait until the lens is on before we touch enabled flags
var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(function () {
    showHello(); // start with hello
});

// Tap anywhere in the lens to toggle
var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function () {
    if (showingLove) {
        showHello();
    } else {
        showLove();
    }
});