import { CKLId } from './id.type';
import { CKLMembership } from './membership.interface';

export type CKLUserStatus = 'ACTIVE' | 'PENDING_EMAIL_VERIFICATION' | 'DELETED';
export type CKLUSerSettingsWeekStart = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
export type CKLUserSettingsDashboardSelection = 'ME' | 'TEAM';
export type CKLUserSettingsDashboardViewType = 'PROJECT' | 'BILLABILITY';

export interface CKLUserSettingsSummaryReportSettings {
  group: string;
  subgroup: string;
}

export interface CLKUserSettings {
  weekStart: CKLUSerSettingsWeekStart,

  timeZone: string;
  timeFormat: string;
  dateFormat: string;
  sendNewsletter: boolean;
  weeklyUpdates: boolean;
  longRunning: boolean;
  isCompactViewOn: boolean;

  dashboardSelection: CKLUserSettingsDashboardSelection;
  dashboardViewType: CKLUserSettingsDashboardViewType;
  dashboardPinToTop: boolean;
  collapseAllProjectLists: boolean;
  groupSimilarEntriesDisabled: boolean;
  timeTrackingManual: boolean;

  projectListCollapse?: number;
  summaryReportSettings: CKLUserSettingsSummaryReportSettings;
}

export interface CLKUser {
  id: CKLId;
  name: string;
  email: string;
  memberships: Array<CKLMembership>;
  profilePicture: string;
  activeWorkspace: CKLId;
  defaultWorkspace: CKLId;
  status: CKLUserStatus;
  settings: CLKUserSettings;
}
