// HandSwitcher.js

// @input SceneObject hello
// @input SceneObject love

var showingLove = false;

function ready() {
    if (!script.hello || !script.love) {
        print("⚠ HandSwitcher: hello or love NOT assigned!");
        return false;
    }
    return true;
}

function showHello() {
    if (!ready()) { return; }
    script.hello.enabled = true;
    script.love.enabled = false;
    showingLove = false;
    print("SHOW HELLO");
}

function showLove() {
    if (!ready()) { return; }
    script.hello.enabled = false;
    script.love.enabled = true;
    showingLove = true;
    print("SHOW LOVE");
}

// Expose API so other scripts (button, tap, voice…) can call
script.api.showHello = showHello;
script.api.showLove  = showLove;

script.api.toggle = function () {
    if (showingLove) {
        showHello();
    } else {
        showLove();
    }
};

// Start on hello
var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(showHello);

// (Optional) Tap-to-toggle — **OFF BY DEFAULT**.  
// Uncomment if you want both tap + button toggle.

// var tapEvent = script.createEvent("TapEvent");
// tapEvent.bind(function () {
//     script.api.toggle();
// });