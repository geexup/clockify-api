import { CKLId } from './id.type';
export declare type CKLMembershipType = string;
export declare type CKLMembershipStatus = 'PENDING' | 'ACTIVE' | 'DECLINED' | 'INACTIVE';
export interface CKLHourlyRate {
    amount: number;
    currency: string;
}
export interface CKLMembership {
    userId: CKLId;
    targetId: CKLId;
    hourlyRate?: CKLHourlyRate;
    membershipType: CKLMembershipType;
    membershipStatus: CKLMembershipStatus;
}
