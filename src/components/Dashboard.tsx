import React from 'react';
import { Users, Plus, Award, BarChart3, TrendingUp, GraduationCap, Briefcase, Download } from 'lucide-react';

interface DashboardProps {
  userRole: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  // 1年間の月別データ（モックデータ）
  const monthlyData = [
    { month: '1月', fullTime: 45, contract: 12 },
    { month: '2月', fullTime: 47, contract: 13 },
    { month: '3月', fullTime: 52, contract: 15 },
    { month: '4月', fullTime: 58, contract: 18 },
    { month: '5月', fullTime: 61, contract: 19 },
    { month: '6月', fullTime: 63, contract: 20 },
    { month: '7月', fullTime: 65, contract: 21 },
    { month: '8月', fullTime: 67, contract: 22 },
    { month: '9月', fullTime: 69, contract: 23 },
    { month: '10月', fullTime: 71, contract: 24 },
    { month: '11月', fullTime: 73, contract: 25 },
    { month: '12月', fullTime: 75, contract: 26 }
  ];

  // 正社員の詳細データ
  const fullTimeDetailData = {
    education: {
      graduate: [8, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15],
      university: [25, 26, 28, 32, 34, 35, 36, 37, 38, 39, 40, 45],
      other: [12, 13, 15, 16, 16, 16, 17, 17, 18, 18, 19, 15]
    },
    position: {
      management: [8, 8, 9, 10, 10, 11, 11, 12, 12, 12, 12, 12],
      sales: [18, 19, 21, 24, 26, 27, 28, 28, 29, 30, 31, 28],
      technical: [19, 20, 22, 24, 25, 25, 26, 27, 28, 29, 30, 35]
    },
    joinCount: [2, 3, 8, 12, 5, 3, 4, 3, 4, 3, 3, 4],
    leaveCount: [0, 1, 3, 6, 2, 1, 2, 1, 2, 1, 1, 2],
    totalCount: [45, 47, 52, 58, 61, 63, 65, 67, 69, 71, 73, 75]
  };

  // 契約社員の詳細データ
  const contractDetailData = {
    education: {
      graduate: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
      university: [8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 18],
      other: [3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5]
    },
    position: {
      management: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      sales: [6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 12],
      technical: [5, 5, 6, 8, 8, 8, 8, 9, 9, 10, 10, 12]
    },
    joinCount: [1, 2, 3, 5, 2, 1, 2, 1, 2, 1, 1, 2],
    leaveCount: [1, 1, 1, 2, 1, 0, 1, 0, 1, 0, 0, 1],
    totalCount: [12, 13, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26]
  };

  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  const maxValue = Math.max(...monthlyData.map(d => d.fullTime + d.contract));

  // 資格保有数（モックデータ）
  const totalQualifications = 235;

  // エクスポート機能
  const exportFullTimeStats = () => {
    const csvContent = [
      ['項目', ...months].join(','),
      ['学歴', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['大学院卒', ...fullTimeDetailData.education.graduate].join(','),
      ['大学卒', ...fullTimeDetailData.education.university].join(','),
      ['大卒以外', ...fullTimeDetailData.education.other].join(','),
      ['合計', ...fullTimeDetailData.totalCount].join(','),
      ['', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['職種', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['管理職', ...fullTimeDetailData.position.management].join(','),
      ['営業職', ...fullTimeDetailData.position.sales].join(','),
      ['技術職', ...fullTimeDetailData.position.technical].join(','),
      ['合計', ...fullTimeDetailData.totalCount].join(','),
      ['', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['入社数', ...fullTimeDetailData.joinCount].join(','),
      ['退社数', ...fullTimeDetailData.leaveCount].join(','),
      ['在籍数', ...fullTimeDetailData.totalCount].join(',')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `正社員詳細統計_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportContractStats = () => {
    const csvContent = [
      ['項目', ...months].join(','),
      ['学歴', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['大学院卒', ...contractDetailData.education.graduate].join(','),
      ['大学卒', ...contractDetailData.education.university].join(','),
      ['大卒以外', ...contractDetailData.education.other].join(','),
      ['合計', ...contractDetailData.totalCount].join(','),
      ['', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['職種', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['管理職', ...contractDetailData.position.management].join(','),
      ['営業職', ...contractDetailData.position.sales].join(','),
      ['技術職', ...contractDetailData.position.technical].join(','),
      ['合計', ...contractDetailData.totalCount].join(','),
      ['', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['入社数', ...contractDetailData.joinCount].join(','),
      ['退社数', ...contractDetailData.leaveCount].join(','),
      ['在籍数', ...contractDetailData.totalCount].join(',')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `契約社員詳細統計_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">総社員数</p>
              <p className="text-2xl font-bold text-slate-800">101名</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">今月の新入社員</p>
              <p className="text-2xl font-bold text-slate-800">6名</p>
            </div>
            <Plus className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">資格保有数</p>
              <p className="text-2xl font-bold text-slate-800">{totalQualifications}件</p>
            </div>
            <Award className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">平均年齢</p>
              <p className="text-2xl font-bold text-slate-800">31.2歳</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>
      
      {/* 1年間の推移グラフ */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-800">雇用形態別 1年間の推移</h3>
        </div>
        
        {/* 月別推移グラフ */}
        <div className="relative h-64 bg-slate-50 rounded-lg p-4">
          <div className="flex items-end justify-between h-full">
            {monthlyData.map((data, index) => {
              const total = data.fullTime + data.contract;
              const fullTimeHeight = (data.fullTime / maxValue) * 180;
              const contractHeight = (data.contract / maxValue) * 180;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col items-center justify-end h-48 mb-2">
                    <div className="flex flex-col items-center justify-end">
                      <div 
                        className="w-8 bg-green-500 rounded-t"
                        style={{ height: `${contractHeight}px` }}
                        title={`契約社員: ${data.contract}名`}
                      ></div>
                      <div 
                        className="w-8 bg-blue-500"
                        style={{ height: `${fullTimeHeight}px` }}
                        title={`正社員: ${data.fullTime}名`}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-600 mt-1 font-medium">{total}</div>
                  </div>
                  <div className="text-xs text-slate-500 text-center">{data.month}</div>
                </div>
              );
            })}
          </div>
          
          {/* Y軸の目盛り */}
          <div className="absolute left-0 top-4 bottom-8 flex flex-col justify-between text-xs text-slate-400">
            <span>{maxValue}</span>
            <span>{Math.floor(maxValue * 0.75)}</span>
            <span>{Math.floor(maxValue * 0.5)}</span>
            <span>{Math.floor(maxValue * 0.25)}</span>
            <span>0</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-slate-600">正社員</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-slate-600">契約社員</span>
          </div>
        </div>
      </div>

      {/* 正社員詳細統計 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">正社員 詳細統計</h3>
          </div>
          <button
            onClick={exportFullTimeStats}
            className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm"
          >
            <Download className="h-4 w-4" />
            エクスポート
          </button>
        </div>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">項目</th>
                {months.map(month => (
                  <th key={month} className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">{month}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr className="bg-blue-50">
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">学歴</td>
                {months.map((_, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-600">-</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">大学院卒</td>
                {fullTimeDetailData.education.graduate.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">大学卒</td>
                {fullTimeDetailData.education.university.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">大卒以外</td>
                {fullTimeDetailData.education.other.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr className="bg-slate-100">
                <td className="px-4 py-3 text-sm font-medium text-slate-900 pl-8">合計</td>
                {fullTimeDetailData.totalCount.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm font-medium text-slate-900">{count}</td>
                ))}
              </tr>
              
              <tr className="bg-blue-50">
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">職種</td>
                {months.map((_, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-600">-</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">管理職</td>
                {fullTimeDetailData.position.management.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">営業職</td>
                {fullTimeDetailData.position.sales.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">技術職</td>
                {fullTimeDetailData.position.technical.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr className="bg-slate-100">
                <td className="px-4 py-3 text-sm font-medium text-slate-900 pl-8">合計</td>
                {fullTimeDetailData.totalCount.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm font-medium text-slate-900">{count}</td>
                ))}
              </tr>
              
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">入社数</td>
                {fullTimeDetailData.joinCount.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-green-700 font-medium">+{count}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">退社数</td>
                {fullTimeDetailData.leaveCount.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-red-700 font-medium">-{count}</td>
                ))}
              </tr>
              <tr className="bg-blue-100">
                <td className="px-4 py-3 text-sm font-bold text-slate-900">在籍数</td>
                {fullTimeDetailData.totalCount.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm font-bold text-slate-900">{count}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* 正社員詳細グラフ */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="text-md font-medium text-slate-700 mb-4 text-center">正社員 月別推移グラフ</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 学歴別グラフ */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-slate-600 mb-3 text-center">学歴別推移</h5>
              <div className="relative h-48">
                <div className="flex items-end justify-between h-full">
                  {months.map((month, index) => {
                    const graduate = fullTimeDetailData.education.graduate[index];
                    const university = fullTimeDetailData.education.university[index];
                    const other = fullTimeDetailData.education.other[index];
                    const total = graduate + university + other;
                    const maxEducation = Math.max(...fullTimeDetailData.totalCount);
                    
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="flex flex-col items-center justify-end h-36 mb-1">
                          <div className="flex flex-col items-center justify-end">
                            <div 
                              className="w-6 bg-purple-400 rounded-t"
                              style={{ height: `${(other / maxEducation) * 120}px` }}
                              title={`大卒以外: ${other}名`}
                            ></div>
                            <div 
                              className="w-6 bg-blue-400"
                              style={{ height: `${(university / maxEducation) * 120}px` }}
                              title={`大学卒: ${university}名`}
                            ></div>
                            <div 
                              className="w-6 bg-indigo-600"
                              style={{ height: `${(graduate / maxEducation) * 120}px` }}
                              title={`大学院卒: ${graduate}名`}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-600 mt-1">{total}</div>
                        </div>
                        <div className="text-xs text-slate-500 text-center transform -rotate-45 origin-center">{month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-indigo-600 rounded"></div>
                  <span>大学院卒</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-400 rounded"></div>
                  <span>大学卒</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-purple-400 rounded"></div>
                  <span>大卒以外</span>
                </div>
              </div>
            </div>
            
            {/* 職種別グラフ */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-slate-600 mb-3 text-center">職種別推移</h5>
              <div className="relative h-48">
                <div className="flex items-end justify-between h-full">
                  {months.map((month, index) => {
                    const management = fullTimeDetailData.position.management[index];
                    const sales = fullTimeDetailData.position.sales[index];
                    const technical = fullTimeDetailData.position.technical[index];
                    const total = management + sales + technical;
                    const maxPosition = Math.max(...fullTimeDetailData.totalCount);
                    
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="flex flex-col items-center justify-end h-36 mb-1">
                          <div className="flex flex-col items-center justify-end">
                            <div 
                              className="w-6 bg-green-400 rounded-t"
                              style={{ height: `${(technical / maxPosition) * 120}px` }}
                              title={`技術職: ${technical}名`}
                            ></div>
                            <div 
                              className="w-6 bg-yellow-400"
                              style={{ height: `${(sales / maxPosition) * 120}px` }}
                              title={`営業職: ${sales}名`}
                            ></div>
                            <div 
                              className="w-6 bg-red-400"
                              style={{ height: `${(management / maxPosition) * 120}px` }}
                              title={`管理職: ${management}名`}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-600 mt-1">{total}</div>
                        </div>
                        <div className="text-xs text-slate-500 text-center transform -rotate-45 origin-center">{month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span>管理職</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span>営業職</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span>技術職</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 契約社員詳細統計 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-slate-800">契約社員 詳細統計</h3>
          </div>
          <button
            onClick={exportContractStats}
            className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm"
          >
            <Download className="h-4 w-4" />
            エクスポート
          </button>
        </div>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">項目</th>
                {months.map(month => (
                  <th key={month} className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">{month}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr className="bg-green-50">
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">学歴</td>
                {months.map((_, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-600">-</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">大学院卒</td>
                {contractDetailData.education.graduate.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">大学卒</td>
                {contractDetailData.education.university.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">大卒以外</td>
                {contractDetailData.education.other.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr className="bg-slate-100">
                <td className="px-4 py-3 text-sm font-medium text-slate-900 pl-8">合計</td>
                {contractDetailData.totalCount.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm font-medium text-slate-900">{count}</td>
                ))}
              </tr>
              
              <tr className="bg-green-50">
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">職種</td>
                {months.map((_, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-600">-</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">管理職</td>
                {contractDetailData.position.management.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">営業職</td>
                {contractDetailData.position.sales.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-700 pl-8">技術職</td>
                {contractDetailData.position.technical.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-slate-900">{count}</td>
                ))}
              </tr>
              <tr className="bg-slate-100">
                <td className="px-4 py-3 text-sm font-medium text-slate-900 pl-8">合計</td>
                {contractDetailData.totalCount.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm font-medium text-slate-900">{count}</td>
                ))}
              </tr>
              
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">入社数</td>
                {contractDetailData.joinCount.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-green-700 font-medium">+{count}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">退社数</td>
                {contractDetailData.leaveCount.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm text-red-700 font-medium">-{count}</td>
                ))}
              </tr>
              <tr className="bg-green-100">
                <td className="px-4 py-3 text-sm font-bold text-slate-900">在籍数</td>
                {contractDetailData.totalCount.map((count, index) => (
                  <td key={index} className="px-3 py-3 text-center text-sm font-bold text-slate-900">{count}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* 契約社員詳細グラフ */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="text-md font-medium text-slate-700 mb-4 text-center">契約社員 月別推移グラフ</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 学歴別グラフ */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-slate-600 mb-3 text-center">学歴別推移</h5>
              <div className="relative h-48">
                <div className="flex items-end justify-between h-full">
                  {months.map((month, index) => {
                    const graduate = contractDetailData.education.graduate[index];
                    const university = contractDetailData.education.university[index];
                    const other = contractDetailData.education.other[index];
                    const total = graduate + university + other;
                    const maxEducation = Math.max(...contractDetailData.totalCount);
                    
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="flex flex-col items-center justify-end h-36 mb-1">
                          <div className="flex flex-col items-center justify-end">
                            <div 
                              className="w-6 bg-purple-300 rounded-t"
                              style={{ height: `${(other / maxEducation) * 120}px` }}
                              title={`大卒以外: ${other}名`}
                            ></div>
                            <div 
                              className="w-6 bg-green-300"
                              style={{ height: `${(university / maxEducation) * 120}px` }}
                              title={`大学卒: ${university}名`}
                            ></div>
                            <div 
                              className="w-6 bg-emerald-600"
                              style={{ height: `${(graduate / maxEducation) * 120}px` }}
                              title={`大学院卒: ${graduate}名`}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-600 mt-1">{total}</div>
                        </div>
                        <div className="text-xs text-slate-500 text-center transform -rotate-45 origin-center">{month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-emerald-600 rounded"></div>
                  <span>大学院卒</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-300 rounded"></div>
                  <span>大学卒</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-purple-300 rounded"></div>
                  <span>大卒以外</span>
                </div>
              </div>
            </div>
            
            {/* 職種別グラフ */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-slate-600 mb-3 text-center">職種別推移</h5>
              <div className="relative h-48">
                <div className="flex items-end justify-between h-full">
                  {months.map((month, index) => {
                    const management = contractDetailData.position.management[index];
                    const sales = contractDetailData.position.sales[index];
                    const technical = contractDetailData.position.technical[index];
                    const total = management + sales + technical;
                    const maxPosition = Math.max(...contractDetailData.totalCount);
                    
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="flex flex-col items-center justify-end h-36 mb-1">
                          <div className="flex flex-col items-center justify-end">
                            <div 
                              className="w-6 bg-teal-400 rounded-t"
                              style={{ height: `${(technical / maxPosition) * 120}px` }}
                              title={`技術職: ${technical}名`}
                            ></div>
                            <div 
                              className="w-6 bg-amber-400"
                              style={{ height: `${(sales / maxPosition) * 120}px` }}
                              title={`営業職: ${sales}名`}
                            ></div>
                            <div 
                              className="w-6 bg-rose-400"
                              style={{ height: `${(management / maxPosition) * 120}px` }}
                              title={`管理職: ${management}名`}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-600 mt-1">{total}</div>
                        </div>
                        <div className="text-xs text-slate-500 text-center transform -rotate-45 origin-center">{month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-rose-400 rounded"></div>
                  <span>管理職</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-amber-400 rounded"></div>
                  <span>営業職</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-teal-400 rounded"></div>
                  <span>技術職</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};