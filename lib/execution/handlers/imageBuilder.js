const handlerBase = require("./handlerBase");

class ImageBuilder extends handlerBase {
    constructor(imageBuilderConfig) {
        super(imageBuilderConfig);        
        console.log(`ImageBuilder ctor`);
        
    }
    async executeStep(executionKey, id, defs) {
        try {
            console.log(`** ImageBuilder started execution at ${Date.now().toString()} with metadata : ${JSON.stringify(this.config)}`);            

        } catch (error) {
            console.log(`ImageBuilder failed execution at ${Date.now().toString()}`);
            
        }

    }
}
module.exports = ImageBuilder;