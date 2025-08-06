import { BusinessCategory, Department } from '../types/Settings';

export const mockBusinessCategories: BusinessCategory[] = [
  {
    id: '1',
    name: 'IT・システム開発',
    description: 'システム開発、アプリケーション開発',
    createdAt: '2023-01-01'
  },
  {
    id: '2',
    name: 'Webサービス開発',
    description: 'Webアプリケーション、ECサイト開発',
    createdAt: '2023-01-01'
  },
  {
    id: '3',
    name: 'ゲーム開発',
    description: 'モバイルゲーム、コンシューマーゲーム開発',
    createdAt: '2023-01-01'
  },
  {
    id: '4',
    name: 'インフラ構築',
    description: 'サーバー構築、ネットワーク設計',
    createdAt: '2023-01-01'
  },
  {
    id: '5',
    name: 'データ分析',
    description: 'ビッグデータ解析、AI・機械学習',
    createdAt: '2023-01-01'
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: '管理部',
    description: '人事、総務、経理',
    createdAt: '2023-01-01'
  },
  {
    id: '2',
    name: '営業部',
    description: '新規開拓、既存顧客対応',
    createdAt: '2023-01-01'
  },
  {
    id: '3',
    name: '技術部',
    description: 'システム開発、技術支援',
    createdAt: '2023-01-01'
  },
  {
    id: '4',
    name: '企画部',
    description: '事業企画、マーケティング',
    createdAt: '2023-01-01'
  },
  {
    id: '5',
    name: '品質管理部',
    description: '品質保証、テスト',
    createdAt: '2023-01-01'
  }
];