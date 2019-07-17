"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ExecutionContext captures the runtime environment of the node. It keeps
 * track of the current frame and iteration for the control flow ops.
 *
 * For example, typical Dynamic RNN model may contain loops, for which
 * TensorFlow will generate graphs with Enter/Exit nodes to control the
 * current execution frame, and NextIteration Nodes for iteration id increment.
 * For model with branch logic, TensorFLow will generate Switch/Merge ops.
 */
var ExecutionContext = /** @class */ (function () {
    function ExecutionContext(weightMap, tensorArrayMap) {
        this.weightMap = weightMap;
        this.tensorArrayMap = tensorArrayMap;
        this.rootContext = { id: 0, frameName: '', iterationId: 0 };
        this.contexts = [this.rootContext];
        this.lastId = 0;
        this.generateCurrentContextIds();
    }
    ExecutionContext.prototype.newFrame = function (id, frameName) {
        return { id: id, frameName: frameName, iterationId: 0 };
    };
    Object.defineProperty(ExecutionContext.prototype, "currentContext", {
        get: function () {
            return this.contexts;
        },
        /**
         * Set the current context
         * @param contexts: ExecutionContextInfo[] the current path of execution
         * frames
         */
        set: function (contexts) {
            if (this.contexts !== contexts) {
                this.contexts = contexts;
                this.generateCurrentContextIds();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExecutionContext.prototype, "currentContextId", {
        /**
         * Returns the current context in string format.
         */
        get: function () {
            return this._currentContextIds[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExecutionContext.prototype, "currentContextIds", {
        /**
         * Returns the current context and all parent contexts in string format.
         * This allow access to the nodes in the current and parent frames.
         */
        get: function () {
            return this._currentContextIds;
        },
        enumerable: true,
        configurable: true
    });
    ExecutionContext.prototype.generateCurrentContextIds = function () {
        var names = [];
        for (var i = 0; i < this.contexts.length - 1; i++) {
            var contexts = this.contexts.slice(0, this.contexts.length - i);
            names.push(this.contextIdforContexts(contexts));
        }
        names.push('');
        this._currentContextIds = names;
    };
    ExecutionContext.prototype.contextIdforContexts = function (contexts) {
        return contexts ?
            contexts
                .map(function (context) { return (context.id === 0 && context.iterationId === 0) ?
                '' :
                context.frameName + "-" + context.iterationId; })
                .join('/') :
            '';
    };
    /**
     * Enter a new frame, a new context is pushed on the current context list.
     * @param frameId new frame id
     */
    ExecutionContext.prototype.enterFrame = function (frameId) {
        if (this.contexts) {
            this.lastId++;
            this.contexts = this.contexts.slice();
            this.contexts.push(this.newFrame(this.lastId, frameId));
            this._currentContextIds.unshift(this.contextIdforContexts(this.contexts));
        }
    };
    /**
     * Exit the current frame, the last context is removed from the current
     * context list.
     */
    ExecutionContext.prototype.exitFrame = function () {
        if (this.contexts && this.contexts.length > 1) {
            this.contexts = this.contexts.slice();
            this.contexts.splice(-1);
            this.currentContextIds.shift();
        }
        else {
            throw new Error('Cannot exit frame, the context is empty');
        }
    };
    /**
     * Enter the next iteration of a loop, the iteration id of last context is
     * increased.
     */
    ExecutionContext.prototype.nextIteration = function () {
        if (this.contexts && this.contexts.length > 0) {
            this.contexts = this.contexts.slice();
            this.lastId++;
            var context = Object.assign({}, this.contexts[this.contexts.length - 1]);
            context.iterationId += 1;
            context.id = this.lastId;
            this.contexts.splice(-1, 1, context);
            this._currentContextIds.splice(0, 1, this.contextIdforContexts(this.contexts));
        }
        else {
            throw new Error('Cannot increase frame iteration, the context is empty');
        }
    };
    ExecutionContext.prototype.getWeight = function (name) {
        return this.weightMap[name];
    };
    ExecutionContext.prototype.addTensorArray = function (tensorArray) {
        this.tensorArrayMap[tensorArray.id] = tensorArray;
    };
    ExecutionContext.prototype.getTensorArray = function (id) {
        return this.tensorArrayMap[id];
    };
    return ExecutionContext;
}());
exports.ExecutionContext = ExecutionContext;
//# sourceMappingURL=execution_context.js.map