const jwt = require("jsonwebtoken");
const fs = require("file-system");
const path = require("path");

const RSA_KEYS = path.join(path.dirname(__dirname), "helpers");
const privateKey = fs.readFileSync(path.join(RSA_KEYS, 'private.key'));
const publicKey = fs.readFileSync(path.join(RSA_KEYS, 'public.key'));

module.exports = {
    generateToken: data => {
        return jwt.sign(data, privateKey, {
            algorithm: "RS256",
            expiresIn: 360000
        });
    },
    checkToken: token => {
        return jwt.verify(token, publicKey, {
            algorithms: ["RS256"]
        });
    }
};
