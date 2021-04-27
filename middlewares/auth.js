const jwtOperations = require("../helpers/checkToken");

module.exports = function auth(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res
            .status(401)
            .json({ message: "Authorization token is required" });
    }
    try {
        var decoded = jwtOperations.checkToken(authorization)
    } catch (error) {
        return res.status(401).json({ error: error,  message: "Invalid token" });
    }

    req.decoded = decoded;
    next();
};
