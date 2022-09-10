const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error;
        }
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        req.body.id = decodedToken;
        next();
    } catch (err) {
        res.status(401).send("Authorization Error.");
    }
}

module.exports = auth;