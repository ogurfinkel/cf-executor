const handlerBase = require("./handlerBase");

class TestExecutor extends handlerBase {

    constructor(testExecutorConfig) {
        super();        
        console.log(`TestExecutor ctor`);
        this.config = testExecutorConfig;
        
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