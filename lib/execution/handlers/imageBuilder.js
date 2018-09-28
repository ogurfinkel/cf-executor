const EventEmitter = require('events');
class ImageBuilder {
    constructor(imageBuilderConfig){
        console.log(`ImageBuilder ctor`);
        this.config = imageBuilderConfig;
        this.emitter = new EventEmitter();
    }
    async execute() {
        console.log(`ImageBuilder started execution at ${Date.now().toString()}`);
    }

}
module.exports = ImageBuilder;