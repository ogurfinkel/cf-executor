const Container = require("../container");

class DockerContainer extends Container {

    constructor (container) {
        this.container = container;
    }

    async start(container) {
        return await this.container.start();
    }

}
module.exports = DockerContainer;