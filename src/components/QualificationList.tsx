import React, { useState } from 'react';
import { Search, Plus, Download, Edit, Eye, Award, TrendingUp, BarChart3, ArrowLeft } from 'lucide-react';
import { Qualification, QualificationStats } from '../types/Qualification';

interface QualificationListProps {
  qualifications: Qualification[];
  qualificationStats: QualificationStats[];
  onQualificationEdit: (qualification: Qualification) => void;
  onAddQualification: () => void;
  onBack: () => void;
}

export const QualificationList: React.FC<QualificationListProps> = ({
  qualifications,
  qualificationStats,
  onQualificationEdit,
  onAddQualification,
  onBack
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredQualifications = qualifications.filter(qualification => {
    const matchesSearch = qualification.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qualification.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qualification.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || qualification.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // 統計計算
  const currentStats = qualificationStats[qualificationStats.length - 1];
  const previousYearStats = qualificationStats[qualificationStats.length - 13];
  const yearOverYearGrowth = previousYearStats 
    ? ((currentStats.totalCount - previousYearStats.totalCount) / previousYearStats.totalCount * 100).toFixed(1)
    : '0';

  const maxCount = Math.max(...qualificationStats.map(s => s.totalCount));

  // カテゴリ一覧を取得
  const categories = Array.from(new Set(qualifications.map(q => q.category)));

  // エクスポート機能
  const handleExport = () => {
    const csvContent = [
      ['カテゴリ', 'サブカテゴリ', '資格名', 'ポイント', '現在取得数'].join(','),
      ...filteredQualifications.map(q => [
        q.category,
        q.subcategory,
        q.name,
        q.points,
        q.currentCount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `資格一覧_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-slate-800">資格一覧</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            戻る
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="資格を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">全てのカテゴリ</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button 
            onClick={onAddQualification}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規登録
          </button>
          <button 
            onClick={handleExport}
            className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            エクスポート
          </button>
        </div>
      </div>

      {/* 統計サマリー */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">総資格取得数</p>
              <p className="text-2xl font-bold text-slate-800">{currentStats?.totalCount || 0}件</p>
            </div>
            <Award className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">総ポイント</p>
              <p className="text-2xl font-bold text-slate-800">{currentStats?.totalPoints || 0}pt</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">前年比</p>
              <p className={`text-2xl font-bold ${parseFloat(yearOverYearGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {parseFloat(yearOverYearGrowth) >= 0 ? '+' : ''}{yearOverYearGrowth}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* 1年間の推移グラフ */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-800">資格取得数 1年間の推移</h3>
        </div>
        
        <div className="relative h-64 bg-slate-50 rounded-lg p-4">
          <div className="flex items-end justify-between h-full">
            {qualificationStats.slice(-12).map((stat, index) => {
              const height = (stat.totalCount / maxCount) * 180;
              const month = new Date(stat.month).toLocaleDateString('ja-JP', { month: 'short' });
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col items-center justify-end h-48 mb-2">
                    <div 
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${height}px` }}
                      title={`${stat.totalCount}件 (${stat.totalPoints}pt)`}
                    ></div>
                    <div className="text-xs text-slate-600 mt-1 font-medium">{stat.totalCount}</div>
                  </div>
                  <div className="text-xs text-slate-500 text-center">{month}</div>
                </div>
              );
            })}
          </div>
          
          {/* Y軸の目盛り */}
          <div className="absolute left-0 top-4 bottom-8 flex flex-col justify-between text-xs text-slate-400">
            <span>{maxCount}</span>
            <span>{Math.floor(maxCount * 0.75)}</span>
            <span>{Math.floor(maxCount * 0.5)}</span>
            <span>{Math.floor(maxCount * 0.25)}</span>
            <span>0</span>
          </div>
        </div>
      </div>

      {/* 資格一覧テーブル */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">カテゴリ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">サブカテゴリ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">資格名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ポイント</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">現在取得数</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredQualifications.map((qualification) => (
                <tr key={qualification.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {qualification.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-700">
                      {qualification.subcategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Award className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-slate-900">{qualification.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {qualification.points}pt
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {qualification.currentCount}件
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onQualificationEdit(qualification)}
                        className="text-slate-600 hover:text-slate-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredQualifications.length === 0 && (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">該当する資格がありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};