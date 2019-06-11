export declare type CKLEstimateType = 'AUTO' | 'MANUAL';
export interface CKLEstimate {
    estimate: string;
    type: CKLEstimateType;
}
export interface CKLEstimateRequest {
    estimate: number;
    type: string;
}
