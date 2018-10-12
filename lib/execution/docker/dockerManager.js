const ContainerManager = require("../containerManager");
const DockerContainer = require("../docker/dockerContainer");
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
    async createContainer(opts){
        console.log(`DockerManager.createContainer with opts ${JSON.stringify(opts)}`);
        const nativeContainer = await this.docker.createContainer(Object.assign(opts, {AttachStdin: true, AttachStdout: true, AttachStderr: true}));                
        return new DockerContainer(nativeContainer);
    }
   
}
module.exports = DockerManager;