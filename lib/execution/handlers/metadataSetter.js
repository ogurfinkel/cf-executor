const HandlerBase = require("./handlerBase");

class MetadataSetter extends HandlerBase {
    constructor(config) {
        super(config);
        console.log("MetadataSetter ctor");
    }

    async executeStep(executionKey, id, defs) {
        try {
            console.log(`** MetadataSetter started execution at ${Date.now().toString()} with metadata : ${JSON.stringify(this.config)}`);            

        } catch (error) {
            console.log(`MetadataSetter failed execution at ${Date.now().toString()}`);
            
        }

    }
}
module.exports = MetadataSetter;