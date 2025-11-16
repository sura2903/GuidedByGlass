if (script.onAwake) {
    script.onAwake();
    return;
}
function checkUndefined(property, showIfData) {
    for (var i = 0; i < showIfData.length; i++) {
        if (showIfData[i][0] && script[showIfData[i][0]] != showIfData[i][1]) {
            return;
        }
    }
    if (script[property] == undefined) {
        throw new Error("Input " + property + " was not provided for the object " + script.getSceneObject().name);
    }
}
// @input bool editDebugSettings
// @ui {"widget":"group_start", "label":"Debug Statements", "showIf":"editDebugSettings"}
// @input bool printDebugStatements = "false" {"label":"Print Info"}
// @input bool printWarningStatements = "true" {"label":"Print Warnings"}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @input bool interactable
// @ui {"widget":"separator"}
// @input bool setupTransform
// @input bool fitBackground {"showIf":"setupTransform", "showIfValue":false}
// @ui {"widget":"group_start", "label":"Button Transform", "showIf":"setupTransform"}
// @input vec2 center
// @input float scale = 1 {"widget":"combobox", "values":[{"label":"Extra Small", "value":0.5}, {"label":"Small", "value":0.75}, {"label":"Medium", "value":1}, {"label":"Large", "value":1.25}, {"label":"Custom", "value":0}]}
// @input float customScale = 1 {"showIf":"scale", "showIfValue":0}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @input int content {"widget":"combobox", "values":[{"label":"Only Label", "value":0}, {"label":"Only Icon", "value":1}, {"label":"Label with Icon", "value":2}]}
// @input string labelInOnlyLabel {"label":"Label", "showIf":"content", "showIfValue":0}
// @input Asset.Texture iconInOnlyIcon {"label":"Icon", "showIf":"content", "showIfValue":1}
// @input string labelInLabelWithIcon {"label":"Label", "showIf":"content", "showIfValue":2}
// @input Asset.Texture iconInLabelWithIcon {"label":"Icon", "showIf":"content", "showIfValue":2}
// @input int iconAlignment {"widget":"combobox", "values":[{"label":"Right", "value":0}, {"label":"Left", "value":1}], "showIf":"content", "showIfValue":2}
// @ui {"widget":"separator"}
// @input int buttonColor {"widget":"combobox", "values":[{"label":"Default", "value":0}, {"label":"Disabled", "value":1}, {"label":"Primary", "value":2}, {"label":"Secondary", "value":3}, {"label":"Custom", "value":4}]}
// @ui {"widget":"group_start", "label":"Custom Color", "showIf":"buttonColor", "showIfValue":4}
// @input vec4 labelColorInLabelOnly {"label":"Label Color", "widget":"color", "showIf":"content", "showIfValue":0}
// @input vec4 labelColorInLabelWithIcon = "{1.0, 1.0, 1.0, 1.0}" {"label":"Label Color", "widget":"color", "showIf":"content", "showIfValue":2}
// @input vec4 backgroundColor = "{0.0, 0.0, 0.0, 1.0}" {"widget":"color"}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @input int _renderOrder {"hint":"This Render Order will be applied to the background. A +1 will be used for text/icons."}
// @ui {"widget":"separator"}
// @input bool eventCallbacks
// @ui {"widget":"group_start", "label":"Event Callbacks", "showIf":"eventCallbacks"}
// @input int callbackType = "0" {"widget":"combobox", "values":[{"label":"None", "value":0}, {"label":"Behavior Script", "value":1}, {"label":"Behavior Custom", "value":2}, {"label":"Custom Function", "value":3}]}
// @input Component.ScriptComponent[] onPressDownBehaviors {"showIf":"callbackType", "showIfValue":1}
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":1}
// @input Component.ScriptComponent[] onPressUpBehaviors {"showIf":"callbackType", "showIfValue":1}
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":1}
// @input Component.ScriptComponent[] onPressBehaviors {"showIf":"callbackType", "showIfValue":1}
// @input string[] onPressDownCustomTriggers {"showIf":"callbackType", "showIfValue":2}
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":2}
// @input string[] onPressUpCustomTriggers {"showIf":"callbackType", "showIfValue":2}
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":2}
// @input string[] onPressCustomTriggers {"showIf":"callbackType", "showIfValue":2}
// @input Component.ScriptComponent customFunctionScript {"showIf":"callbackType", "showIfValue":3}
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":3}
// @input string[] onPressDownFunctions {"showIf":"callbackType", "showIfValue":3}
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":3}
// @input string[] onPressUpFunctions {"showIf":"callbackType", "showIfValue":3}
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":3}
// @input string[] onPressFunctions {"showIf":"callbackType", "showIfValue":3}
// @ui {"widget":"group_end"}
// @input Asset.ObjectPrefab textPrefab
// @input Asset.ObjectPrefab iconPrefab
// @input Asset.ObjectPrefab backgroundPrefab
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../Modules/Src/Packages/Button.lsc/Button");
Object.setPrototypeOf(script, Module.Button.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("editDebugSettings", []);
    checkUndefined("printDebugStatements", [["editDebugSettings",true]]);
    checkUndefined("printWarningStatements", [["editDebugSettings",true]]);
    checkUndefined("interactable", []);
    checkUndefined("setupTransform", []);
    checkUndefined("fitBackground", [["setupTransform",false]]);
    checkUndefined("center", [["setupTransform",true]]);
    checkUndefined("scale", [["setupTransform",true]]);
    checkUndefined("customScale", [["setupTransform",true],["scale",0]]);
    checkUndefined("content", []);
    checkUndefined("labelInOnlyLabel", [["content",0]]);
    checkUndefined("iconInOnlyIcon", [["content",1]]);
    checkUndefined("labelInLabelWithIcon", [["content",2]]);
    checkUndefined("iconInLabelWithIcon", [["content",2]]);
    checkUndefined("iconAlignment", [["content",2]]);
    checkUndefined("buttonColor", []);
    checkUndefined("labelColorInLabelOnly", [["buttonColor",4],["content",0]]);
    checkUndefined("labelColorInLabelWithIcon", [["buttonColor",4],["content",2]]);
    checkUndefined("backgroundColor", [["buttonColor",4]]);
    checkUndefined("_renderOrder", []);
    checkUndefined("eventCallbacks", []);
    checkUndefined("callbackType", [["eventCallbacks",true]]);
    checkUndefined("onPressDownBehaviors", [["eventCallbacks",true],["callbackType",1]]);
    checkUndefined("onPressUpBehaviors", [["eventCallbacks",true],["callbackType",1]]);
    checkUndefined("onPressBehaviors", [["eventCallbacks",true],["callbackType",1]]);
    checkUndefined("onPressDownCustomTriggers", [["eventCallbacks",true],["callbackType",2]]);
    checkUndefined("onPressUpCustomTriggers", [["eventCallbacks",true],["callbackType",2]]);
    checkUndefined("onPressCustomTriggers", [["eventCallbacks",true],["callbackType",2]]);
    checkUndefined("onPressDownFunctions", [["eventCallbacks",true],["callbackType",3]]);
    checkUndefined("onPressUpFunctions", [["eventCallbacks",true],["callbackType",3]]);
    checkUndefined("onPressFunctions", [["eventCallbacks",true],["callbackType",3]]);
    checkUndefined("textPrefab", []);
    checkUndefined("iconPrefab", []);
    checkUndefined("backgroundPrefab", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
