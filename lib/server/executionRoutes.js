function publishExecutionRoutes(flowManager) {
    const executionRoutes = new Set();
    executionRoutes.add({
        path: "/execute",
        method: "post",
        handler: async (req, res) => {
            try {
                const buffer = new Buffer(req.body);
                const executionId = await flowManager.start(buffer.toString());
                res.send(executionId);
            } catch (error) {
                res.send(error);
            }
        }
    });
    return executionRoutes;
}
module.exports = publishExecutionRoutes;
