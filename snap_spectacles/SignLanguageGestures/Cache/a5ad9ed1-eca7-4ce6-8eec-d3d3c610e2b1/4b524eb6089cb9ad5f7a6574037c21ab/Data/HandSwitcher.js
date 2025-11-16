// HandSwitcher.js

// @input SceneObject hand     // HELLO hand
// @input SceneObject love     // "I like you" hand

var showingLove = false;

function ready() {
    if (!script.hand || !script.love) {
        print("⚠ HandSwitcher: hand or love is not assigned");
        return false;
    }
    return true;
}

function showHello() {
    if (!ready()) { return; }
    script.hand.enabled = true;
    script.love.enabled = false;
    showingLove = false;
}

function showLove() {
    if (!ready()) { return; }
    script.hand.enabled = false;
    script.love.enabled = true;
    showingLove = true;
}

// expose to other scripts
script.api.showHello = showHello;
script.api.showLove  = showLove;

var turnOn = script.createEvent("TurnOnEvent");
turnOn.bind(function () {
    showHello();
});