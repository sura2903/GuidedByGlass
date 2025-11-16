// ToggleController.js

// @input Component.ScriptComponent handSwitcher
// @input SceneObject toggleButton

var uiHandler = script.toggleButton.getComponent("Component.InteractionComponent");

if (!uiHandler) {
    print("⚠ ToggleController: No InteractionComponent found on toggleButton");
} else {
    uiHandler.onTouchStart.add(onButtonPressed);
}

function onButtonPressed() {
    if (!script.handSwitcher || !script.handSwitcher.api) {
        print("⚠ ToggleController: HandSwitcher API not assigned");
        return;
    }
    script.handSwitcher.api.toggle();
    print("BUTTON PRESSED → TOGGLED");
}