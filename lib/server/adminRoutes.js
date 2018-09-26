function publishAdminRoutes() {

    const routes = new Set();
    routes.add({path: "/ping", method: "get", handler: (req, res) => {
        res.send("pong");
    }});
    return routes;

}

module.exports = publishAdminRoutes;