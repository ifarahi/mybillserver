const jwtOperations = require("../helpers/checkToken");

module.exports = function auth(req, res, next) {
    const authorization = req.header("Authorization");
    if (authorization) {
        var token = authorization.split(" ")[1];
    }
    else
        return res
            .status(401)
            .json(messageError("Authorization token is required"));

    try {
        var decoded = jwtOperations.checkToken(token)
    } catch (error) {
        return res.status(401).json(messageError("Invalid token"));
    }

    req.decoded = decoded;
    next();
};
