class AppError extends Error {
    constructor(){
        super()
    }
    // A custom method to create an error instance with additional properties
    create(message,statusCode,statusText){
        this.message = message
        this.statusCode = statusCode
        this.statusText = statusText
        return this
    }
}
module.exports = new AppError;