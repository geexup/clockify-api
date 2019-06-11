import { CKLMembership } from './membership.interface';
import { CKLHourlyRate } from './hourly-rate.interface';
import { CKLId } from './id.type';
export declare type CKLWorkspaceSettingsAdminOnlyPageType = 'PROJECT' | 'TEAM' | 'REPORTS';
export declare type CKLWorkspaceSettingsAutomaticLockDay = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
export declare type CKLWorkspaceSettingsAutomaticLockPeriod = 'DAYS' | 'WEEKS' | 'MONTHS';
export declare type CKLWorkspaceSettingsAutomaticLockType = 'WEEKLY' | 'MONTHLY' | 'OLDER_THAN';
export interface CKLWorkspaceSettingsAutomaticLock {
    dayOfMonth: number;
    olderThanValue: number;
    type: CKLWorkspaceSettingsAutomaticLockType;
    firstDay: CKLWorkspaceSettingsAutomaticLockDay;
    changeDay: CKLWorkspaceSettingsAutomaticLockDay;
    olderThanPeriod: CKLWorkspaceSettingsAutomaticLockPeriod;
}
export interface CKLWorkspaceSettingsRound {
    round: string;
    minutes: string;
}
export interface CKLWorkspaceSettings {
    adminOnlyPages: Array<CKLWorkspaceSettingsAdminOnlyPageType>;
    automaticLock: CKLWorkspaceSettingsAutomaticLock;
    canSeeTimeSheet: boolean;
    defaultBillableProjects: boolean;
    forceDescription: boolean;
    forceProjects: boolean;
    forceTags: boolean;
    forceTasks: boolean;
    lockTimeEntries: string;
    onlyAdminsCreateProject: boolean;
    onlyAdminsCreateTag: boolean;
    onlyAdminsSeeAllTimeEntries: boolean;
    onlyAdminsSeeBillableRates: boolean;
    onlyAdminsSeeDashboard: boolean;
    onlyAdminsSeePublicProjectsEntries: boolean;
    projectFavorites: boolean;
    projectGroupingLabel: string;
    projectPickerSpecialFilter: boolean;
    round: CKLWorkspaceSettingsRound;
    timeRoundingInReports: boolean;
    trackTimeDownToSecond: boolean;
}
export interface CKLWorkspace {
    id: CKLId;
    name: string;
    imageUrl: string;
    hourlyRate: CKLHourlyRate;
    memberships: CKLMembership;
    workspaceSettings: CKLWorkspaceSettings;
}
