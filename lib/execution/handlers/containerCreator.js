const HandlerBase = require("./handlerBase");

class ContainerCreator extends HandlerBase {

    constructor(config) {
        super(config);
        console.log("ContainerCreator ctor");
    }

    async executeStep(executionKey, id, defs) {
        try {
            console.log(`** ContainerCreator started execution at ${Date.now().toString()} with metadata : ${JSON.stringify(this.config)}`);            

        } catch (error) {
            console.log(`ContainerCreator failed execution at ${Date.now().toString()}`);
            
        }

    }

}

module.exports = ContainerCreator;