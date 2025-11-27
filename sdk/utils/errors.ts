
/**
 * If you like to handle errors, this is some kind of way you can do it
 * This is to propagate errors across app and have a robust reusable package for errors
 * 
 */

export class ChatError extends Error {
    code?: string;
    statusCode?: number;

    constructor(
        message: string,
        code?: string,
        statusCode?: number,
    ) {
        super(message);
        this.name = 'ChatError';
        this.code = code;
        this.statusCode = statusCode;
    }
}

export class StreamError extends ChatError {
    constructor(message: string) {
        super(message, 'STREAM_ERROR');
        this.name = 'StreamError';
    }
}