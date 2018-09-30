const uuidv4 = require("uuid/v4");
const yaml = require("js-yaml");
const fs = require("fs");
const ServiceLoader = require("./serviceLoader");
const imgBuilder = require("./handlers/imageBuilder");
const sleep = require('util').promisify(setTimeout);
const EventEmitter = require('events');

class FlowManager {

    constructor() {
        this.stateMachine = new Map();
        this.handlersJson = {};
        this.emitter = new EventEmitter();

    }
    async init() {
        //TODO : Promisify
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
        console.log(`begin parsing spec for key : ${executionKey} `);
        const ymlSpec = yaml.safeLoad(spec);
        const handlers = await this.buildRootSteps(ymlSpec);
        if (handlers.length > 0 ) {
            this.stateMachine.set(executionKey, {
                state: "waiting",
                counter: 0,
                handlers: handlers
            });
            setTimeout(this.execute.bind(this), 200, executionKey);// Delay the execution in order to release caller ASAP
            
        }   
        return executionKey;
    }

    async execute(executionKey) {
        //Get steps from state - in a real world scenario - use redis to cache state machine
        console.log(`executing of ${executionKey}`);
        let state = this.stateMachine.get(executionKey);
        state.state = "running";
        state.counter++;
        const currentStep = state.handlers.shift();
        const stepSucceeded = await currentStep.instance.execute(executionKey, state.counter, currentStep.defs, currentStep.metadata);
        if (stepSucceeded) {
            if (state.handlers.length > 0) {
                return await this.execute(executionKey);
            }
            //Remove from state machine and emit event 
            this.stateMachine.delete(executionKey);
            this.emitter.emit("executionSucceeded", executionKey);
        }else {
            this.stateMachine.delete(executionKey);
            this.emitter.emit("executionFailed", executionKey);
        }

        // state.handlers.forEach(handler => {
        //     handler.onSuccess(this.onSucceededStep);
        //     handler.onFailure(this.onFailedStep);
        //     handler.execute();
        // });
    }

    //Event listeners :

    onExecutionSucceeded(eventHandler) {
        this.emitter.on("executionSucceeded", eventHandler);
    }

    onExecutionFailed(eventHandler) {
        this.emitter.on("executionFailed", eventHandler);
    }


    //Event handlers :
    onSucceededStep(executionKey, id) {

    }
    onFailedStep(executionKey, id) {

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