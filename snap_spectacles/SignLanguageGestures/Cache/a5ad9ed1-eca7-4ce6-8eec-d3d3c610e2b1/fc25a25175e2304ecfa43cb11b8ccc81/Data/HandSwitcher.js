// HandSwitcher.js

// @input SceneObject hand
// @input SceneObject love

var showingLove = false;

function showHello() {
    script.hand.enabled = true;
    script.love.enabled = false;
    showingLove = false;
}

function showLove() {
    script.hand.enabled = false;
    script.love.enabled = true;
    showingLove = true;
}

// Expose API
script.api.showHello = showHello;
script.api.showLove = showLove;
script.api.isLoveActive = function() {
    return showingLove;
};

// Start with HELLO
var turnOn = script.createEvent("TurnOnEvent");
turnOn.bind(function () {
    showHello();
});