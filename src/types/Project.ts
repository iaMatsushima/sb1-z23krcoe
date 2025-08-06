export interface ProjectAssignment {
  id: string;
  companyName: string;
  category: 'SES・上位' | 'SES・BP' | '請負・BP';
  engineerName: string;
  period: string;
  unitPrice: number;
  personMonth: number;
  projectName: string;
  overtimeRate: number;
  deductionRate: number;
  timeRange: string;
  timeUnit: string;
  remarks: string;
  contractType: string;
  dispatchConflictDate: string;
  paymentSite: string;
  timesheetSource: string;
  status: 'active' | 'standby' | 'leave';
  assignedDate: string;
}

export interface StandbyMember {
  id: string;
  category: string;
  engineerName: string;
  personMonth: number;
  standbyStartDate: string;
}

export interface LeaveMember {
  id: string;
  engineerName: string;
  leaveType: '休職' | '産休' | '育休' | 'その他';
  leaveStartDate: string;
  leaveEndDate?: string;
  reason: string;
}