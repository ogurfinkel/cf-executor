const uuidv4 = require("uuid/v4");
const yaml = require("js-yaml");
const fs = require("fs");
const ServiceLoader = require("./serviceLoader");
const imgBuilder = require("./handlers/imageBuilder");
class FlowManager {

    constructor() {
        this.stateMachine = new Map();
        this.handlersJson = {};

    }
    async init() {
        const buffer = await new Promise((resolve, reject) => {
            fs.readFile("./lib/execution/handlers/handlers.json", (err, data) => {
                if (err) {
                    console.error("error reading handlers file", err);
                    reject(err);
                } else {
                    console.log("read handlers file");
                    resolve(data);
                }
            })
        });
        this.handlersJson = JSON.parse(buffer.toString());
    }

    async start(spec) {
        const executionKey = uuidv4();
        this.stateMachine.set(executionKey, "running");
        console.log(`begin parsing spec for key : ${executionKey} `);
        const ymlSpec = yaml.safeLoad(spec);
        const handlers = await this.buildRootSteps(ymlSpec);
        //TODO:Push into stack and start execute
        if (handlers.length > 0) {
            await handlers[0].instance.execute(handlers[0].defs);
        }

        //Read flow and process steps
        //Object.keys(ymlSpec.steps).map(step => )
        //const serviceLoader = new ServiceLoader();
        //await Promise.all(Object.keys(ymlSpec.services).map(service => serviceLoader.loadService(ymlSpec.services[service])));
        //console.log(`loaded all services for key : ${executionKey}`);        
        return executionKey;
    }


    async buildRootSteps(ymlSpec) {
        return new Promise((resolve, reject) => {
            const handlers = Object.keys(ymlSpec.steps).map((name) => {

                try {
                    const handlerDef = this.handlersJson[name];
                    console.log(`Instantiating : ${name}`);
                    const handlerInstanceCtor = require(handlerDef.handler);
                    const instance = new handlerInstanceCtor(ymlSpec.steps[name]);

                    console.log(`handler ${name} instantiated successfully`);
                    return Object.assign({}, {
                        "name": name,
                        "defs": handlerDef,
                        "instance": instance
                    });
                } catch (error) {
                    //TODO : in this phase need to throw an exception
                    //reject(error);
                    console.log(`handler ${name} failed to instantiate !!`);
                }

            });
            resolve(handlers);
        });

    }
}
module.exports = FlowManager;