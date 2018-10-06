const HandlerBase = require("./handlerBase");

class TestExecutor extends HandlerBase {

    constructor(testExecutorConfig) {
        super(testExecutorConfig);        
        console.log(`TestExecutor ctor`);
        
    }
    async executeStep(executionKey, id, defs) {
        try {
            console.log(`** TestExecutor started execution at ${Date.now().toString()} with metadata : ${JSON.stringify(this.config)}`);                        

        } catch (error) {
            console.log(`TestExecutor failed execution at ${Date.now().toString()}`);
            
        }

    }
}

module.exports = TestExecutor;