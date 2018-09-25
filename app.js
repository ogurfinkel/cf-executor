const serverFactory = require("./lib/server/serverFactory");
const routesBuilder = require("./lib/server/routesBuilder");

async function createServer(serverContext) {
    const {server} = await serverFactory.createServerFromConfig(serverContext);
    console.log(`Server created`);
}

createServer({flavor: "express", routes: routesBuilder.buildRoutes(), port: 3000});