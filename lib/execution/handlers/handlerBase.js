const EventEmitter = require('events');

class handlerBase {

    constructor() {
        this.emitter = new EventEmitter();
    }

    async execute(executionKey, id, defs, metadata) {
        try {
            await this.executeStep(executionKey, id, defs, metadata);
            this.emitter.emit("success", executionKey, id);
            return true;
        } catch (error) {
            this.emitter.emit("failure", executionKey, id);
            return false;
        }

    }

    async executeStep(executionKey, id, defs, metadata) {}

    onSuccess(eventHandler) {
        this.emitter.on("success", eventHandler);


    }
    onFailure(eventHandler) {
        this.emitter.on("failure", eventHandler);
    }


}

module.exports = handlerBase;