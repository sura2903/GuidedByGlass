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
showHello();

// Tap anywhere in the lens to toggle
var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function () {
    if (showingLove) {
        showHello();
    } else {
        showLove();
    }
});