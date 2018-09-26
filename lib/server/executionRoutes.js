function publishExecutionRoutes(flowManager) {
    const executionRoutes = new Set();
    executionRoutes.add({
        path: "/execute",
        method: "post",
        handler: async (req, res) => {
            try {
                const executionId = await flowManager.start(req.params.spec);
                res.send(executionId);
            } catch (error) {
                res.send(error);
            }
        }
    });
    return executionRoutes;
}
module.exports = publishExecutionRoutes;
