const  uuidv4 = require("uuid/v4");
const yaml = require("js-yaml");
const ServiceLoader = require("./serviceLoader");
class FlowManager {

    constructor() {
        this.stateMachine = new Map();
    }

    async start(spec) {
        const executionKey = uuidv4();
        this.stateMachine.set(executionKey, "running");
        console.log(`begin parsing spec for key : ${executionKey} `);
        const ymlSpec = yaml.safeLoad(spec);
        const serviceLoader = new ServiceLoader();
        await Promise.all(Object.keys(ymlSpec.services).map(service => serviceLoader.loadService(service)));
        console.log(`loaded all services for key : ${executionKey}`);        
        return executionKey;
    }
}
module.exports = FlowManager;