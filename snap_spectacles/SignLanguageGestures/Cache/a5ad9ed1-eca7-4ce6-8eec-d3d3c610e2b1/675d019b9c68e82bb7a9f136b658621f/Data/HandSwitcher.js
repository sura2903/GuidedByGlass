// HandSwitcher.js

// @input SceneObject hello   // this will be your "hand" object
// @input SceneObject love    // this will be your "love" object

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

// 🔹 Expose these so other scripts can call them
script.api.showHello = showHello;
script.api.showLove  = showLove;
script.api.isLoveActive = function () {
    return showingLove;
};

// Start on hello when lens turns on
var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(function () {
    showHello();
});

// (Optional) Tap toggle – you can keep or delete this
var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function () {
    if (showingLove) {
        showHello();
    } else {
        showLove();
    }
});