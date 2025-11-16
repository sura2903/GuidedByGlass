// HandAutoLoop.js
// Automatically switches between "hello" and "love" on a timer loop

// @input SceneObject hello   // your HELLO / neutral hand object
// @input SceneObject love    // your "I like you" / LOVE hand object
// @input float holdTime = 3.0 {"label":"Seconds per pose"}

var showingLove = false;

function showHello() {
    script.hello.enabled = true;
    script.love.enabled = false;
    showingLove = false;
    print("HandAutoLoop: HELLO");
}

function showLove() {
    script.hello.enabled = false;
    script.love.enabled = true;
    showingLove = true;
    print("HandAutoLoop: LOVE");
}

function toggle() {
    if (showingLove) {
        showHello();
    } else {
        showLove();
    }
}

// Schedule the next toggle after holdTime seconds
function scheduleNextToggle() {
    var e = script.createEvent("DelayedCallbackEvent");
    e.bind(function () {
        toggle();
        scheduleNextToggle();
    });
    e.reset(script.holdTime); // wait holdTime seconds
}

// Start: show hello, then loop
var onStart = script.createEvent("TurnOnEvent");
onStart.bind(function () {
    if (!script.hello || !script.love) {
        print("HandAutoLoop: ERROR – hello or love is not assigned!");
        return;
    }
    showHello();          // start with HELLO
    scheduleNextToggle(); // then keep switching forever
});