// HandSwitcher.js

// @input SceneObject hello   // your "hello / neutral" hand
// @input SceneObject love    // your "I like you" hand

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

// Expose for other scripts (button)
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

// Optional: tap anywhere on screen to toggle
var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function () {
    if (showingLove) {
        showHello();
    } else {
        showLove();
    }
});