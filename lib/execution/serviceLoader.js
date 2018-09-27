class ServiceLoader {
    constructor() {}
    
    async loadService(context) {
        console.log(`loading service with context: ${context.image}`);
    }
}
module.exports = ServiceLoader;