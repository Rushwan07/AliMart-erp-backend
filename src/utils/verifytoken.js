const jwt = require("jsonwebtoken");
const catchAsync = require("./catchAsync");

exports.verifyToken = catchAsync(async (req, res, next) => {
    const testToken = req.headers.token;

    if (!testToken || !testToken.startsWith("bearer")) {
        return res.status(400).json({
            status: "failed",
            message: "You are not logged in",
        });
    }

    let token = testToken.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
});
