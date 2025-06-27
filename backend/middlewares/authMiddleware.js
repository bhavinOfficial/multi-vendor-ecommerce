const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return res.status(401).json({
            error: "Please login first!"
        });
    } else {
        try {
            const decodedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);
            req.role = decodedToken?.role;
            req.id = decodedToken?.id;
            next();
        } catch (error) {
            return res.status(400).json({
                error: "Token is expired or invalid! Please login again."
            });
        }
    }
};
