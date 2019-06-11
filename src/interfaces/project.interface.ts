import { CKLMembership, CKLHourlyRate } from './membership.interface';
import { CKLId } from './id.type';
import { CKLEstimate } from './estimate.interface';

export interface CKLProjectId {
  id: CKLId;
}

export interface CKLProject {
  archived: boolean;
  billable: boolean;
  clientId: CKLId;
  clientName: string;
  color: string;
  duration: string;
  estimate: CKLEstimate;
  hourlyRate: CKLHourlyRate;
  id: CKLId;
  memberships: Array<CKLMembership>,
  name: string;
  public: boolean;
  workspaceId: CKLId;
}
