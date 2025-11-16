"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentWithDebug = void 0;
class ComponentWithDebug extends BaseScriptComponent {
    constructor() {
        super();
        this.editDebugSettings = this.editDebugSettings;
        this.printDebugStatements = this.printDebugStatements;
        this.printWarningStatements = this.printWarningStatements;
    }
    __initialize() {
        super.__initialize();
        this.editDebugSettings = this.editDebugSettings;
        this.printDebugStatements = this.printDebugStatements;
        this.printWarningStatements = this.printWarningStatements;
    }
    printDebug(message) {
        if (this.printDebugStatements) {
            print(this.name + " - " + message);
        }
    }
    printWarning(message) {
        if (this.printWarningStatements) {
            print(this.name + " - WARNING, " + message);
        }
    }
}
exports.ComponentWithDebug = ComponentWithDebug;
//# sourceMappingURL=ComponentWithDebug.js.map