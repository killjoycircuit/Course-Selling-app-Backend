const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config");
function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_SECRET)
    if (decoded) {
        req.userId = decoded._id;
        res.data = decoded;
        next();
    }
    else {
        res.status(403).json({
            message: "YOu are not Signed in",
            decoded
        })
    }
}
module.exports = {
    userMiddleware: userMiddleware
}