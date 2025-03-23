export class ApiError extends Error {
    public errors: Record<string, string>;

    constructor(message: string, errors: Record<string, string> = {}) {
        super(message);
        this.name = "ApiError";
        this.errors = errors;
    }
}
