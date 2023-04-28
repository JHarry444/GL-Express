module.exports = {
    checkMethods: (methods) => function ({ method }, res, next) {
        if (methods.includes(method)) return next();
        else return next({ status: 405, msg: `Incorrect method: ${method}` });
    },
    checkContent: (types) => function (req, res, next) {
        const type = req.get('content-type');
        if (types.includes(type)) return next();
        else return next({ status: 415, msg: `Unsupported content type: ${type}` });
    }
}