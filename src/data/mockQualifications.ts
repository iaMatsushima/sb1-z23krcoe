import { Qualification, QualificationStats } from '../types/Qualification';

export const mockQualifications: Qualification[] = [
  // 開発系 - JAVA
  { id: '1', category: '開発系', subcategory: 'JAVA', name: 'SUN JAVA認定資格', points: 1, currentCount: 3 },
  { id: '2', category: '開発系', subcategory: 'JAVA', name: 'JAVA BRONZE', points: 1, currentCount: 5 },
  { id: '3', category: '開発系', subcategory: 'JAVA', name: 'JAVA SILVER', points: 2, currentCount: 8 },
  { id: '4', category: '開発系', subcategory: 'JAVA', name: 'JAVA GOLD', points: 5, currentCount: 2 },
  
  // 開発系 - PHP
  { id: '5', category: '開発系', subcategory: 'PHP', name: 'PHP技術者認定試験ウィザード', points: 3, currentCount: 1 },
  { id: '6', category: '開発系', subcategory: 'PHP', name: 'PHP5技術者認定初級', points: 1, currentCount: 4 },
  { id: '7', category: '開発系', subcategory: 'PHP', name: 'PHP5技術者認定上級', points: 2, currentCount: 2 },
  
  // 開発系 - Python
  { id: '8', category: '開発系', subcategory: 'Python', name: 'Python 3 エンジニア認定基礎試験', points: 1, currentCount: 6 },
  { id: '9', category: '開発系', subcategory: 'Python', name: 'G検定', points: 1, currentCount: 3 },
  { id: '10', category: '開発系', subcategory: 'Python', name: 'E検定', points: 2, currentCount: 1 },
  
  // 開発系 - Ruby
  { id: '11', category: '開発系', subcategory: 'Ruby', name: 'Ruby Silver', points: 1, currentCount: 4 },
  { id: '12', category: '開発系', subcategory: 'Ruby', name: 'Ruby Gold', points: 2, currentCount: 2 },
  { id: '13', category: '開発系', subcategory: 'Ruby', name: 'Rails技術者認定 Silver', points: 1, currentCount: 3 },
  { id: '14', category: '開発系', subcategory: 'Ruby', name: 'Rails技術者認定 Gold', points: 2, currentCount: 1 },
  
  // ゲーム系 - Unity
  { id: '15', category: 'ゲーム系', subcategory: 'Unity', name: 'Unity認定資格', points: 1, currentCount: 2 },
  
  // インフラ系 - LINUX
  { id: '16', category: 'インフラ系', subcategory: 'LINUX', name: 'LPIC1', points: 1, currentCount: 7 },
  { id: '17', category: 'インフラ系', subcategory: 'LINUX', name: 'LPIC2', points: 2, currentCount: 4 },
  { id: '18', category: 'インフラ系', subcategory: 'LINUX', name: 'LPIC3', points: 3, currentCount: 2 },
  { id: '19', category: 'インフラ系', subcategory: 'LINUX', name: 'LPIC3 Speciality', points: 5, currentCount: 1 },
  
  // インフラ系 - ネットワーク
  { id: '20', category: 'インフラ系', subcategory: 'ネットワーク', name: 'ネットワークスペシャリスト', points: 3, currentCount: 3 },
  { id: '21', category: 'インフラ系', subcategory: 'ネットワーク', name: 'CCNA', points: 1, currentCount: 5 },
  { id: '22', category: 'インフラ系', subcategory: 'ネットワーク', name: 'CCNP', points: 2, currentCount: 2 },
  { id: '23', category: 'インフラ系', subcategory: 'ネットワーク', name: 'CCIE', points: 5, currentCount: 1 },
  
  // 開発・インフラ - DB
  { id: '24', category: '開発・インフラ', subcategory: 'DB', name: 'データベーススペシャリスト', points: 3, currentCount: 4 },
  { id: '25', category: '開発・インフラ', subcategory: 'DB', name: 'ORACLE MASTER BRONZE', points: 1, currentCount: 6 },
  { id: '26', category: '開発・インフラ', subcategory: 'DB', name: 'ORACLE MASTER SILVER', points: 2, currentCount: 3 },
  { id: '27', category: '開発・インフラ', subcategory: 'DB', name: 'ORACLE MASTER GOLD', points: 5, currentCount: 1 },
  { id: '28', category: '開発・インフラ', subcategory: 'DB', name: 'ORACLE MASTER PLATINUM', points: 10, currentCount: 0 },
  { id: '29', category: '開発・インフラ', subcategory: 'DB', name: 'OSS-DB技術者 Silver', points: 1, currentCount: 3 },
  { id: '30', category: '開発・インフラ', subcategory: 'DB', name: 'OSS-DB技術者 Gold', points: 2, currentCount: 1 },
  
  // 開発・インフラ - その他
  { id: '31', category: '開発・インフラ', subcategory: 'その他', name: 'ITIL', points: 1, currentCount: 2 },
  
  // 開発系 - IT
  { id: '32', category: '開発系', subcategory: 'IT', name: '基本情報技術者', points: 1, currentCount: 12 },
  { id: '33', category: '開発系', subcategory: 'IT', name: '応用情報技術者', points: 2, currentCount: 8 },
  { id: '34', category: '開発系', subcategory: 'IT', name: 'システム監査技術者試験', points: 4, currentCount: 1 },
  { id: '35', category: '開発系', subcategory: 'IT', name: 'エンベデッドシステムスペシャリスト', points: 3, currentCount: 2 },
  { id: '36', category: '開発系', subcategory: 'IT', name: 'ITストラテジスト', points: 4, currentCount: 1 },
  { id: '37', category: '開発系', subcategory: 'IT', name: 'システムアーキテクト', points: 3, currentCount: 2 },
  
  // 言語系 - 英語
  { id: '38', category: '言語系', subcategory: '英語', name: 'TOEIC 800', points: 1, currentCount: 8 },
  { id: '39', category: '言語系', subcategory: '英語', name: 'TOEIC 850', points: 2, currentCount: 5 },
  { id: '40', category: '言語系', subcategory: '英語', name: 'TOEIC 900以上', points: 3, currentCount: 2 },
  { id: '41', category: '言語系', subcategory: '英語', name: '英検1級', points: 3, currentCount: 1 },
  { id: '42', category: '言語系', subcategory: '英語', name: 'IELTS 6.5', points: 1, currentCount: 2 },
  { id: '43', category: '言語系', subcategory: '英語', name: 'IELTS 7.0', points: 2, currentCount: 1 },
  { id: '44', category: '言語系', subcategory: '英語', name: 'IELTS 7.5', points: 3, currentCount: 1 },
  
  // 管理系 - PM
  { id: '45', category: '管理系', subcategory: 'PM', name: 'プロジェクトマネージャ', points: 3, currentCount: 3 },
  { id: '46', category: '管理系', subcategory: 'PM', name: 'PMP', points: 5, currentCount: 2 },
  { id: '47', category: '管理系', subcategory: 'PM', name: 'PLM', points: 10, currentCount: 0 },
  
  // Microsoft系
  { id: '48', category: 'クラウド系', subcategory: 'Microsoft', name: 'MTA', points: 1, currentCount: 3 },
  { id: '49', category: 'クラウド系', subcategory: 'Microsoft', name: 'MCSA', points: 2, currentCount: 2 },
  { id: '50', category: 'クラウド系', subcategory: 'Microsoft', name: 'MCSD', points: 3, currentCount: 1 },
  { id: '51', category: 'クラウド系', subcategory: 'Microsoft', name: 'MCSE', points: 4, currentCount: 1 },
  { id: '52', category: 'クラウド系', subcategory: 'Microsoft', name: 'MCSM', points: 5, currentCount: 0 },
  
  // VMware系
  { id: '53', category: 'クラウド系', subcategory: 'VMware', name: 'VCA', points: 1, currentCount: 2 },
  { id: '54', category: 'クラウド系', subcategory: 'VMware', name: 'VCP', points: 2, currentCount: 1 },
  { id: '55', category: 'クラウド系', subcategory: 'VMware', name: 'VCIX', points: 3, currentCount: 0 },
  { id: '56', category: 'クラウド系', subcategory: 'VMware', name: 'VCDX', points: 4, currentCount: 0 },
  
  // RedHat系
  { id: '57', category: 'インフラ系', subcategory: 'RedHat', name: 'RHCSA', points: 1, currentCount: 3 },
  { id: '58', category: 'インフラ系', subcategory: 'RedHat', name: 'RHCE', points: 2, currentCount: 1 },
  
  // フロントエンド系
  { id: '59', category: '開発系', subcategory: 'フロント', name: 'HTMLプロフェッショナル', points: 1, currentCount: 4 },
  { id: '60', category: '開発系', subcategory: 'フロント', name: 'WEBデザイナー検定', points: 1, currentCount: 2 },
  { id: '61', category: '開発系', subcategory: 'フロント', name: 'ウェブデザイン技能検定', points: 1, currentCount: 3 },
  
  // SalesForce系
  { id: '62', category: 'クラウド系', subcategory: 'SalesForce', name: 'SalesForce 基本', points: 2, currentCount: 2 },
  { id: '63', category: 'クラウド系', subcategory: 'SalesForce', name: 'SalesForce 上級', points: 3, currentCount: 1 },
  
  // テスト系
  { id: '64', category: '開発系', subcategory: 'テスト', name: 'JSTQB', points: 1, currentCount: 3 },
  
  // AWS系
  { id: '65', category: 'クラウド系', subcategory: 'AWS', name: 'AWS認定ソリューションアーキテクト アソシエイトレベル', points: 1, currentCount: 6 },
  { id: '66', category: 'クラウド系', subcategory: 'AWS', name: 'AWS認定デベロッパー アソシエイトレベル', points: 1, currentCount: 4 },
  { id: '67', category: 'クラウド系', subcategory: 'AWS', name: 'AWS認定SysOpsアドミニストレータ アソシエイトレベル', points: 1, currentCount: 3 },
  { id: '68', category: 'クラウド系', subcategory: 'AWS', name: 'AWS認定ソリューションアーキテクト プロフェッショナルレベル', points: 2, currentCount: 2 },
  { id: '69', category: 'クラウド系', subcategory: 'AWS', name: 'AWS認定DevOpsエンジニア プロフェッショナルレベル', points: 2, currentCount: 1 },
  
  // 組み込み系
  { id: '70', category: '開発系', subcategory: '組み込み', name: 'OCRES（OMG認定組込み技術者資格試験）', points: 1, currentCount: 1 },
  { id: '71', category: '開発系', subcategory: '組み込み', name: 'ETEC', points: 2, currentCount: 1 },
  
  // セキュリティ系
  { id: '72', category: 'セキュリティ', subcategory: 'セキュリティ', name: '情報処理安全確保支援士', points: 4, currentCount: 2 },
  { id: '73', category: 'セキュリティ', subcategory: 'セキュリティ', name: 'NISM', points: 2, currentCount: 1 },
  { id: '74', category: 'セキュリティ', subcategory: 'セキュリティ', name: '情報セキュリティマネジメント', points: 2, currentCount: 3 },
  { id: '75', category: 'セキュリティ', subcategory: 'セキュリティ', name: '個人情報保護士認定試験', points: 1, currentCount: 2 },
  
  // その他
  { id: '76', category: 'その他', subcategory: 'その他', name: '世界遺産検定', points: 0, currentCount: 1 },
  { id: '77', category: 'その他', subcategory: '人事', name: '社会保険労務士', points: 5, currentCount: 1 },
  { id: '78', category: 'その他', subcategory: 'その他', name: 'FP3級', points: 1, currentCount: 3 },
  { id: '79', category: 'その他', subcategory: 'その他', name: 'FP2級', points: 2, currentCount: 2 },
  { id: '80', category: 'その他', subcategory: 'その他', name: 'FP1級', points: 3, currentCount: 0 },
  { id: '81', category: 'その他', subcategory: 'その他', name: '中小企業診断士', points: 5, currentCount: 1 },
  { id: '82', category: 'その他', subcategory: 'その他', name: 'メンタルヘルスマネジメント検定 2級', points: 1, currentCount: 2 },
  
  // クラウド系（追加）
  { id: '83', category: 'クラウド系', subcategory: 'Azure', name: 'Azure認定資格', points: 1, currentCount: 2 },
  { id: '84', category: 'クラウド系', subcategory: 'GCP', name: 'GCP認定資格', points: 1, currentCount: 1 }
];

export const mockQualificationStats: QualificationStats[] = [
  { month: '2023-01', totalCount: 145, totalPoints: 298 },
  { month: '2023-02', totalCount: 148, totalPoints: 305 },
  { month: '2023-03', totalCount: 152, totalPoints: 315 },
  { month: '2023-04', totalCount: 158, totalPoints: 328 },
  { month: '2023-05', totalCount: 162, totalPoints: 335 },
  { month: '2023-06', totalCount: 165, totalPoints: 342 },
  { month: '2023-07', totalCount: 169, totalPoints: 351 },
  { month: '2023-08', totalCount: 172, totalPoints: 358 },
  { month: '2023-09', totalCount: 176, totalPoints: 367 },
  { month: '2023-10', totalCount: 180, totalPoints: 375 },
  { month: '2023-11', totalCount: 183, totalPoints: 382 },
  { month: '2023-12', totalCount: 187, totalPoints: 390 },
  { month: '2024-01', totalCount: 191, totalPoints: 398 },
  { month: '2024-02', totalCount: 195, totalPoints: 407 },
  { month: '2024-03', totalCount: 199, totalPoints: 415 },
  { month: '2024-04', totalCount: 203, totalPoints: 424 },
  { month: '2024-05', totalCount: 207, totalPoints: 432 },
  { month: '2024-06', totalCount: 211, totalPoints: 441 },
  { month: '2024-07', totalCount: 215, totalPoints: 449 },
  { month: '2024-08', totalCount: 219, totalPoints: 458 },
  { month: '2024-09', totalCount: 223, totalPoints: 466 },
  { month: '2024-10', totalCount: 227, totalPoints: 475 },
  { month: '2024-11', totalCount: 231, totalPoints: 483 },
  { month: '2024-12', totalCount: 235, totalPoints: 492 }
];