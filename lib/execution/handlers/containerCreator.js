const HandlerBase = require("./handlerBase");
const ContainerManagerFactory = require("../containerManagerFactory");

class ContainerCreator extends HandlerBase {

    constructor(config) {
        super(config);
        console.log("ContainerCreator ctor");
    }

    async executeStep(executionKey, id, defs, metadata, cachedData) {
        try {
            console.log(`** ContainerCreator started execution at ${Date.now().toString()} with metadata : ${JSON.stringify(this.config)}`);
            const containerManager =  ContainerManagerFactory.getContainerManager("docker"); //TODO: Get this from flow manager            
            const container = await containerManager.createContainer(
                {name: executionKey, 
                 ImageName: cachedData.image.name,
                 Cmd: ['CMD npm start']
                }
                );
            cachedData.container= {
                id : container.id
            };
            await container.start();

        } catch (error) {
            console.log(`ContainerCreator failed execution at ${Date.now().toString()} with error ${error}`);
            
        }

    }

}

module.exports = ContainerCreator;