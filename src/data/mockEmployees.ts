import { Employee } from '../types/Employee';

export const mockEmployees: Employee[] = [
  {
    id: '001',
    name: '田中 太郎',
    email: 'tanaka.taro@company.com',
    department: '管理部',
    role: '部長',
    phone: '090-1234-5678',
    joinDate: '2020-04-01',
    status: '在籍',
    age: 35,
    qualifications: ['情報処理技術者', '簿記2級'],
    address: '東京都新宿区',
    nearestStation: '新宿駅',
    employmentType: '正社員',
    education: '大学卒',
    jobCategory: '管理職',
    dependents: [
      {
        id: '1',
        name: '田中 花子',
        nameKana: 'タナカ ハナコ',
        relationship: '配偶者',
        birthDate: '1990-05-15',
        age: 33,
        livingTogether: '同居',
        insuranceNumber: '001-01',
        joinDate: '2020-04-01',
        leaveDate: '',
        leaveReason: ''
      },
      {
        id: '2',
        name: '田中 一郎',
        nameKana: 'タナカ イチロウ',
        relationship: '子',
        birthDate: '2015-08-20',
        age: 8,
        livingTogether: '同居',
        insuranceNumber: '001-02',
        joinDate: '2015-08-20',
        leaveDate: '',
        leaveReason: ''
      }
    ]
  },
  {
    id: '002',
    name: '佐藤 花子',
    email: 'sato.hanako@company.com',
    department: '営業部',
    role: '主任',
    phone: '090-2345-6789',
    joinDate: '2019-10-15',
    status: '在籍',
    age: 28,
    qualifications: ['営業士', 'TOEIC800'],
    address: '東京都渋谷区',
    nearestStation: '渋谷駅',
    employmentType: '正社員',
    education: '大学卒',
    jobCategory: '営業職',
    dependents: []
  },
  {
    id: '003',
    name: '鈴木 一郎',
    email: 'suzuki.ichiro@company.com',
    department: '技術部',
    role: 'リーダー',
    phone: '090-3456-7890',
    joinDate: '2018-07-01',
    status: '在籍',
    age: 32,
    qualifications: ['AWS認定', '基本情報技術者'],
    address: '東京都港区',
    nearestStation: '品川駅',
    employmentType: '正社員',
    education: '大学院卒',
    jobCategory: '技術職',
    dependents: [
      {
        id: '3',
        name: '鈴木 美咲',
        nameKana: 'スズキ ミサキ',
        relationship: '配偶者',
        birthDate: '1992-03-10',
        age: 31,
        livingTogether: '同居',
        insuranceNumber: '003-01',
        joinDate: '2018-07-01',
        leaveDate: '',
        leaveReason: ''
      }
    ]
  },
  {
    id: '004',
    name: '山田 美咲',
    email: 'yamada.misaki@company.com',
    department: '技術部',
    role: 'エンジニア',
    phone: '090-4567-8901',
    joinDate: '2021-01-20',
    status: '在籍',
    age: 26,
    qualifications: ['Java認定', '応用情報技術者'],
    address: '東京都中央区',
    nearestStation: '銀座駅',
    employmentType: '契約社員',
    education: '大学卒',
    jobCategory: '技術職',
    dependents: []
  }
];