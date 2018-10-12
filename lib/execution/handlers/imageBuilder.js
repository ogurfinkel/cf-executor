const HandlerBase = require("./handlerBase");
const ContainerManagerFactory = require("../containerManagerFactory");

class ImageBuilder extends HandlerBase {
    constructor(imageBuilderConfig) {
        super(imageBuilderConfig);        
        console.log(`ImageBuilder ctor`);
        
    }
    async executeStep(executionKey, id, defs, metadata, cachedData) {
        try {
            console.log(`** ImageBuilder started execution at ${Date.now().toString()} with metadata : ${JSON.stringify(this.config)} for executionKey ; ${executionKey}`); 
            const containerManager =  ContainerManagerFactory.getContainerManager("docker"); //TODO: Get this from flow manager
            // await containerManager.buildImage({context: this.config.working_directory, src: [this.config.dockerfile]}, this.config.image_name);          
           const log =  await containerManager.buildImage({context: this.config.working_directory}, this.config.image_name);   
           const reducedLog = log.reduce((acc, value) =>  acc+= value.stream, "");
           console.log(`ImageBuilder log for key : ${executionKey} completed with log : ${reducedLog}`);
           cachedData.image = {
               log : reducedLog,
               name : this.config.image_name
           }

        } catch (error) {
            console.log(`ImageBuilder failed execution at ${Date.now().toString()} with error ${error}`);
            throw error;
        }

    }
}
module.exports = ImageBuilder;