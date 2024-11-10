// Middleware to handle errors in asynchronous route handlers
// Wraps an async function and catches any errors, passing them to the next middleware (error handler)
module.exports = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch((err) => {
            next(err);  // Passes any error caught to the next middleware for centralized error handling
        });
    };
};
