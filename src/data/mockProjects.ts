import { ProjectAssignment, StandbyMember, LeaveMember } from '../types/Project';

export const mockProjectAssignments: ProjectAssignment[] = [
  {
    id: '1',
    companyName: '株式会社テックソリューション',
    category: 'SES・上位',
    engineerName: '田中 太郎',
    period: '2024-01-01 ~ 2024-12-31',
    unitPrice: 800000,
    personMonth: 1.0,
    projectName: 'ECサイト構築プロジェクト',
    overtimeRate: 5000,
    deductionRate: 3000,
    timeRange: '140-180',
    timeUnit: '時間',
    remarks: '要件定義から参画',
    contractType: 'SES契約',
    dispatchConflictDate: '2027-01-01',
    paymentSite: '翌月末',
    timesheetSource: 'メール',
    status: 'active',
    assignedDate: '2024-01-01'
  },
  {
    id: '2',
    companyName: 'デジタルイノベーション株式会社',
    category: 'SES・上位',
    engineerName: '佐藤 花子',
    period: '2024-02-01 ~ 2024-11-30',
    unitPrice: 750000,
    personMonth: 1.0,
    projectName: '基幹システム刷新',
    overtimeRate: 4500,
    deductionRate: 2800,
    timeRange: '140-180',
    timeUnit: '時間',
    remarks: 'PM補佐として参画',
    contractType: 'SES契約',
    dispatchConflictDate: '2027-02-01',
    paymentSite: '翌月末',
    timesheetSource: 'システム',
    status: 'active',
    assignedDate: '2024-02-01'
  },
  {
    id: '3',
    companyName: '協力会社A',
    category: 'SES・BP',
    engineerName: '鈴木 一郎',
    period: '2024-03-01 ~ 2024-09-30',
    unitPrice: 650000,
    personMonth: 1.0,
    projectName: 'モバイルアプリ開発',
    overtimeRate: 4000,
    deductionRate: 2500,
    timeRange: '140-180',
    timeUnit: '時間',
    remarks: 'React Native開発',
    contractType: 'SES契約',
    dispatchConflictDate: '2027-03-01',
    paymentSite: '翌月末',
    timesheetSource: 'FAX',
    status: 'active',
    assignedDate: '2024-03-01'
  },
  {
    id: '4',
    companyName: '協力会社B',
    category: 'SES・BP',
    engineerName: '山田 美咲',
    period: '2024-01-15 ~ 2024-08-15',
    unitPrice: 600000,
    personMonth: 1.0,
    projectName: 'データ分析基盤構築',
    overtimeRate: 3500,
    deductionRate: 2200,
    timeRange: '140-180',
    timeUnit: '時間',
    remarks: 'Python・SQL',
    contractType: 'SES契約',
    dispatchConflictDate: '2027-01-15',
    paymentSite: '翌月末',
    timesheetSource: 'メール',
    status: 'active',
    assignedDate: '2024-01-15'
  }
];

export const mockStandbyMembers: StandbyMember[] = [
  {
    id: '1',
    category: 'Java',
    engineerName: '高橋 健太',
    personMonth: 2.5,
    standbyStartDate: '2024-11-01'
  },
  {
    id: '2',
    category: 'React',
    engineerName: '伊藤 美香',
    personMonth: 1.2,
    standbyStartDate: '2024-12-01'
  },
  {
    id: '3',
    category: 'Python',
    engineerName: '中村 雄一',
    personMonth: 0.8,
    standbyStartDate: '2024-12-15'
  }
];

export const mockLeaveMembers: LeaveMember[] = [
  {
    id: '1',
    engineerName: '小林 さくら',
    leaveType: '産休',
    leaveStartDate: '2024-10-01',
    leaveEndDate: '2025-04-01',
    reason: '出産予定'
  },
  {
    id: '2',
    engineerName: '加藤 大輔',
    leaveType: '休職',
    leaveStartDate: '2024-11-15',
    leaveEndDate: '2025-02-15',
    reason: '療養のため'
  }
];