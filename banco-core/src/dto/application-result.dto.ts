/*!
 * Copyright(c) Rafael Dias
 * MIT Licensed
 */
export class ApplicationResultDTO<T> {
    success: boolean;
    message?: string;
    result?: T;

    constructor(args: {success: boolean, message?: string, result?: T}) {
        this.success = args.success;
        this.message = args.message;
        this.result = args.result;
    }
}