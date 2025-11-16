// HandSwitcher.js

// @input SceneObject hello
// @input SceneObject love

var showingLove = false;

function showHello() {
    script.hello.enabled = true;
    script.love.enabled = false;
    showingLove = false;
}

function showLove() {
    script.hello.enabled = false;
    script.love.enabled = true;
    showingLove = true;
}

// Start with hello
var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(function () {
    showHello();
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