module.exports = class HttpException extends Error {
    constructor(statusCode,message){
        super(message);
        this.name = "HTTPException";
        this.message = message;
        this.statusCode = statusCode;
    }
}