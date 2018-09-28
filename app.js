const serverFactory = require("./lib/server/serverFactory");
const routesBuilder = require("./lib/server/routesBuilder");
const publishAdminRoutes = require("./lib/server/adminRoutes");
const publishExecutionRoutes = require("./lib/server/executionRoutes");
const FlowManager = require("./lib/execution/flowManager");

async function createServer(serverContext) {
    const {
        server
    } = await serverFactory.createServerFromConfig(serverContext);
    console.log(`Server created`);
}

createServer({
    flavor: "express",
    routes: routesBuilder.buildRoutes([publishAdminRoutes(), publishExecutionRoutes(new FlowManager())]),
    port: 8080  
});