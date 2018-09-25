var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

//Support BYOS (bring your own server)
async function createServerFromConfig(serverContext) {

    switch (serverContext.flavor) {
        case "express":
            return createExpressServer(serverContext);
            break;
        default:
            throw new Error(`Server ${flavor} is not supported`);

    }
}

async function createExpressServer(serverContext) {
    console.log(`creating express server with #${serverContext.routes.size} routes`);
    var app = express();
    //console.log('external path' + process.env.externalPath);


    //app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.listen(serverContext.port, () => {
        console.log(`express is listing at port  ${serverContext.port}`);
      });
    // app.use(cookieParser());
    // app.use(express.static(process.env.externalPath || path.join(__dirname, 'public')));
    serverContext.routes.forEach(route => {
        switch (route.method) {
            case "get":
                router.get(route.path, route.handler);
                console.log(`express : adding get method with path : ${route.path}`);
                break;
            case "put":
                router.put(route.path, route.handler);
                console.log(`express : adding put method with path : ${route.path}`);
                break;
            default:
                throw new Error(`method ${route.method} is not supported`);
        }
    });
    app.use(`/`, router);

    return app;

}

exports.createServerFromConfig = createServerFromConfig;