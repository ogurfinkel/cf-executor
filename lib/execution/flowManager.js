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
        console.log(`services : ${ymlSpec.services}`);
        const serviceLoader = new ServiceLoader();
        await Object.keys(ymlSpec.services).map(service => serviceLoader.loadService(service));        
        return executionKey;
    }
}
module.exports = FlowManager;