export declare class CKLError extends Error {
    code: number;
    status: string;
    constructor(code: number, status?: string);
}
