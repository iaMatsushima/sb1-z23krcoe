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
  name: string;
  email: string;
  department: string;
  role: string;
  phone: string;
  joinDate: string;
  status: string;
  imageUrl?: string;
  age: number;
  qualifications: string[];
  address: string;
  nearestStation: string;
  employmentType: '正社員' | '契約社員';
  education: '大学院卒' | '大学卒' | '大卒以外';
  jobCategory: '管理職' | '営業職' | '技術職';
  dependents: Dependent[];
}