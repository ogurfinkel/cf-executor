 function buildRoutes(injectedRoutes) {
    var routes = new Set();
    injectedRoutes.forEach(routeSet => {
        routeSet.forEach(route => routes.add(route));
    });
    console.log(`routesBuilder: built #${routes.size} routes`);
    return routes;
}

exports.buildRoutes = buildRoutes;