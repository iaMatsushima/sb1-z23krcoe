export interface ContractInfo {
  id: string;
  type: 'SES' | '派遣' | '受託' | 'ゲーム事業';
  startDate: string;
  endDate: string;
  autoRenewal: boolean;
}

export interface CompanyMember {
  id: string;
  memberCode: string;
  name: string;
  workStatus: '稼働中' | '待機中' | '休職中' | '退職';
}

export interface Company {
  id: string;
  companyCode: string;
  companyName: string;
  businessCategory: string;
  transactionType: '取引先' | '協力会社' | 'パートナー' | 'その他';
  contracts: ContractInfo[];
  members: CompanyMember[];
  createdAt: string;
  updatedAt: string;
}