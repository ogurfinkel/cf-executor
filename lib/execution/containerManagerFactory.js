const DockerManager = require("../execution/docker/dockerManager");
class ContainerManagerFactory {

    static getContainerManager(opts) {
        switch(opts) {
            case "docker": {
                if (!this._dockerManager) {
                    this._dockerManager = new DockerManager();
                }
                return this._dockerManager;
            }
            default: {
                throw new Error(`${opts} is not supported container manager`);
            }
        }
    }
}
module.exports = ContainerManagerFactory;