// HandSwitcher.js

// @input SceneObject hello   // HELLO / neutral hand
// @input SceneObject love    // "I like you" hand

function showHello() {
    script.hello.enabled = true;
    script.love.enabled = false;
    print("HandSwitcher: showHello");
}

function showLove() {
    script.hello.enabled = false;
    script.love.enabled = true;
    print("HandSwitcher: showLove");
}

// Expose to other scripts
script.api.showHello = showHello;
script.api.showLove = showLove;

// Start on hello
var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(showHello);