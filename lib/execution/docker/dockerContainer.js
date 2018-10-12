const Container = require("../container");

//Decorator for docker
class DockerContainer extends Container {

    constructor (container) {
        super();    
        this.container = container;
    }

    async start() {
        return await this.container.start();
    }

}
module.exports = DockerContainer;