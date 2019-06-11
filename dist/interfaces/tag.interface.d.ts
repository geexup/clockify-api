import { CKLId } from './id.type';
export interface CKLTagId {
    id: CKLId;
}
export interface CKLTag {
    id: CKLId;
    workspaceId: CKLId;
    name: string;
}
