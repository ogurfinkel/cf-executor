const handlerBase = require("./handlerBase");
const ContainerManagerFactory = require("../containerManagerFactory");

class ImageBuilder extends handlerBase {
    constructor(imageBuilderConfig) {
        super(imageBuilderConfig);        
        console.log(`ImageBuilder ctor`);
        
    }
    async executeStep(executionKey, id, defs) {
        try {
            console.log(`** ImageBuilder started execution at ${Date.now().toString()} with metadata : ${JSON.stringify(this.config)} for executionKey ; ${executionKey}`); 
            const containerManager =  ContainerManagerFactory.getContainerManager("docker"); //TODO: Get this from flow manager
            // await containerManager.buildImage({context: this.config.working_directory, src: [this.config.dockerfile]}, this.config.image_name);          
           const log =  await containerManager.buildImage({context: this.config.working_directory}, this.config.image_name);   
           const reducedLog = log.reduce((acc, value) =>  acc+= value.stream, "");
           console.log(`ImageBuilder log for key : ${executionKey} completed with log : ${reducedLog}`);
           return  {log: reducedLog};

        } catch (error) {
            console.log(`ImageBuilder failed execution at ${Date.now().toString()}`);
            throw error;
        }

    }
}
module.exports = ImageBuilder;