export class NotFoundError extends Error {
    constructor(message, og_err) {
        super(message);
        this.status = 404;
        this.code = 'NOT_FOUND';
        this.og_err = og_err;
    }
}
export class ValidationError extends Error {
    constructor(message, og_err) {
        super(message);
        this.status = 400;
        this.code = 'VALIDATION_ERROR';
        this.og_err = og_err;
    }
}
export class ConflictError extends Error {
    constructor(message, og_err) {
        super(message);
        this.status = 409;
        this.code = 'CONFLICT_ERROR';
        this.og_err = og_err;
    }
}
export class ServerError extends Error {
    constructor(message, og_err) {
        super(message);
        this.status = 500;
        this.code = 'SERVER_ERROR';
        this.og_err = og_err;
    }
}
