 function buildRoutes() {
    var routes = new Set();
    routes.add({path: "/ping", method: "get", handler: (req, res) => {
        res.send("pong");
    }});
    console.log(`routesBuilder: built #${routes.size} routes`);
    return routes;
}

exports.buildRoutes = buildRoutes;