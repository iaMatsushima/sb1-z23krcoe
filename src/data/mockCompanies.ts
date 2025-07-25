import { Company } from '../types/Company';

export const mockCompanies: Company[] = [
  {
    id: '1',
    companyCode: 'C001',
    companyName: '株式会社テックソリューション',
    businessCategory: 'IT・システム開発',
    transactionType: '取引先',
    contracts: [
      {
        id: '1',
        type: 'SES',
        startDate: '2023-04-01',
        endDate: '2024-03-31',
        autoRenewal: true
      },
      {
        id: '2',
        type: '受託',
        startDate: '2023-06-01',
        endDate: '2024-05-31',
        autoRenewal: false
      }
    ],
    members: [
      {
        id: '1',
        memberCode: 'M001',
        name: '高橋 健太',
        workStatus: '稼働中'
      },
      {
        id: '2',
        memberCode: 'M002',
        name: '伊藤 美香',
        workStatus: '稼働中'
      }
    ],
    createdAt: '2023-03-15',
    updatedAt: '2024-01-10'
  },
  {
    id: '2',
    companyCode: 'C002',
    companyName: 'デジタルイノベーション株式会社',
    businessCategory: 'Webサービス開発',
    transactionType: '協力会社',
    contracts: [
      {
        id: '3',
        type: '派遣',
        startDate: '2023-07-01',
        endDate: '2024-06-30',
        autoRenewal: true
      }
    ],
    members: [
      {
        id: '3',
        memberCode: 'M003',
        name: '中村 雄一',
        workStatus: '稼働中'
      },
      {
        id: '4',
        memberCode: 'M004',
        name: '小林 さくら',
        workStatus: '待機中'
      },
      {
        id: '5',
        memberCode: 'M005',
        name: '加藤 大輔',
        workStatus: '稼働中'
      }
    ],
    createdAt: '2023-05-20',
    updatedAt: '2024-01-15'
  },
  {
    id: '3',
    companyCode: 'C003',
    companyName: 'ゲームスタジオアルファ',
    businessCategory: 'ゲーム開発',
    transactionType: 'パートナー',
    contracts: [
      {
        id: '4',
        type: 'ゲーム事業',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        autoRenewal: false
      }
    ],
    members: [
      {
        id: '6',
        memberCode: 'M006',
        name: '森田 拓也',
        workStatus: '稼働中'
      }
    ],
    createdAt: '2022-12-10',
    updatedAt: '2023-12-01'
  }
];