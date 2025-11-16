// ToggleButton.js

// @input Component.ScriptComponent toggleController

var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function () {
    if (!script.toggleController || !script.toggleController.api) {
        print("ToggleButton: toggleController missing or has no api");
        return;
    }
    script.toggleController.api.toggle();
    print("ToggleButton: tapped");
});