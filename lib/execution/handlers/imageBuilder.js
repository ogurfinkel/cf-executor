const handlerBase = require("./handlerBase");
const ContainerManagerFactory = require("../containerManagerFactory");

class ImageBuilder extends handlerBase {
    constructor(imageBuilderConfig) {
        super(imageBuilderConfig);        
        console.log(`ImageBuilder ctor`);
        
    }
    async executeStep(executionKey, id, defs) {
        try {
            console.log(`** ImageBuilder started execution at ${Date.now().toString()} with metadata : ${JSON.stringify(this.config)}`); 
            const containerManager =  ContainerManagerFactory.getContainerManager("docker"); //TODO: Get this from flow manager
            await containerManager.buildImage({context: this.config.working_directory, src: [this.config.dockerfile]}, this.config.image_name);          

        } catch (error) {
            console.log(`ImageBuilder failed execution at ${Date.now().toString()}`);
            
        }

    }
}
module.exports = ImageBuilder;