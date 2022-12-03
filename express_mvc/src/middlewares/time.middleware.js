
const timeMiddleware = (config) => {
    return (req, res, next) => {
        next();
    }
}

module.exports = timeMiddleware
