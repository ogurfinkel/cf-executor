const EventEmitter = require('events');

class HandlerBase {

    constructor(config) {
        this.emitter = new EventEmitter();
        this.config = config;
    }

    async execute(executionKey, id, defs, metadata, cachedData) {
        try {
            const result = await this.executeStep(executionKey, id, defs, metadata, cachedData);
            this.emitter.emit("success", executionKey, id);
            return this.config.on_success ? Object.assign(result || {}, {on_success: this.config.on_success }) : result;
        } catch (error) {
            this.emitter.emit("failure", executionKey, id);
            return this.config.on_failure ? Object.assign(result || {}, {on_failure: this.config.on_failure }) : result;
        }

    }

    async executeStep(executionKey, id, defs, metadata, cachedData) {}

    onSuccess(eventHandler) {
        this.emitter.on("success", eventHandler);


    }
    onFailure(eventHandler) {
        this.emitter.on("failure", eventHandler);
    }

    onStepData(eventHandler) {
        this.emitter.on("data", eventHandler);
    }


}

module.exports = HandlerBase;