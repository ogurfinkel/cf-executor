const EventEmitter = require('events');

class handlerBase {

    constructor(config) {
        this.emitter = new EventEmitter();
        this.config = config;
    }

    async execute(executionKey, id, defs, metadata) {
        try {
            await this.executeStep(executionKey, id, defs, metadata);
            this.emitter.emit("success", executionKey, id);
            return this.config.on_success ? this.config.on_success : true;
        } catch (error) {
            this.emitter.emit("failure", executionKey, id);
            return this.config.on_failure ? this.config.on_failure : false;
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