export interface Dependent {
  id: string;
  name: string;
  nameKana: string;
  relationship: string;
  birthDate: string;
  age: number;
  livingTogether: '同居' | '別居';
  insuranceNumber: string;
  joinDate: string;
  leaveDate?: string;
  leaveReason?: string;
}

export interface Employee {
  id: string;
  kantoItsNumber: string;
  dependentInsuranceCard: '有' | '無';
  department: string;
  name: string;
  nameKana: string;
  gender: '男性' | '女性' | 'その他';
  email: string;
  birthDate: string;
  previousAddress: string;
  postalCode: string;
  address1: string;
  address2: string;
  phone: string;
  age: number;
  joinDate: string;
  leaveDate?: string;
  leaveEndOfMonth?: string;
  status: string;
  socialInsuranceJoinDate: string;
  firstPaidLeaveDate: string;
  employmentType: '正社員' | '契約社員';
  fullTimeConversionDate?: string;
  yearsOfService: number;
  monthsOfService: number;
  role: string;
  employmentInsuranceNumber: string;
  basicPensionNumber: string;
  standardMonthlyRemunerationHealth: number;
  standardMonthlyRemunerationPension: number;
  type: string;
  roleCategory: string;
  finalEducation: string;
  qualifications: string[];
  nearestStation: string;
  dependents: Dependent[];
}