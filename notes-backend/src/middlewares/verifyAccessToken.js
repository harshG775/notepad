import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send("Access token is missing");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send("Invalid token");
        }
        req.user = user; // The user information is now available in req.user
        next();
    });
}
export default verifyToken;