const ContainerManager = require("../containerManager");
const Docker = require('dockerode');
class DockerManager extends ContainerManager {

    constructor() {
        super();
        this.docker = new Docker();

    }
    async buildImage(opts, imageName) {
        console.log(`DockerManager.buildImage building image with opts : ${JSON.stringify(opts)} with image name : ${imageName}`);
        const stream = await this.docker.buildImage(opts, {t: imageName});
        return await new Promise((resolve, reject) => {
            this.docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
          });

    }
    async pull(opts) {

    }

    async run(opt) {
        
    }
}
module.exports = DockerManager;