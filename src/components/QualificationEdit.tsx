import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { Qualification } from '../types/Qualification';

interface QualificationEditProps {
  qualification?: Qualification;
  onSave: (qualification: Qualification) => void;
  onCancel: () => void;
}

export const QualificationEdit: React.FC<QualificationEditProps> = ({ qualification, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Qualification>(qualification || {
    id: '',
    category: '開発系',
    subcategory: 'IT',
    name: '',
    points: 1,
    currentCount: 0
  });

  const handleInputChange = (field: keyof Qualification, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedQualification = {
      ...formData,
      id: formData.id || Date.now().toString()
    };
    onSave(updatedQualification);
  };

  const categories = [
    '開発系', 'インフラ系', '開発・インフラ', 'ゲーム系', 'クラウド系', 
    '言語系', '管理系', 'セキュリティ', 'その他'
  ];

  const subcategories = {
    '開発系': ['JAVA', 'PHP', 'Python', 'Ruby', 'IT', 'フロント', 'テスト', '組み込み'],
    'インフラ系': ['LINUX', 'ネットワーク', 'RedHat'],
    '開発・インフラ': ['DB', 'その他'],
    'ゲーム系': ['Unity'],
    'クラウド系': ['Microsoft', 'VMware', 'SalesForce', 'AWS', 'Azure', 'GCP'],
    '言語系': ['英語'],
    '管理系': ['PM'],
    'セキュリティ': ['セキュリティ'],
    'その他': ['その他', '人事']
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          {qualification ? '資格情報編集' : '新規資格登録'}
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            保存
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">資格情報</h3>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold text-slate-800 mb-6">基本情報</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">カテゴリ *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">サブカテゴリ *</label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {(subcategories[formData.category as keyof typeof subcategories] || []).map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">資格名 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ポイント *</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.points}
                    onChange={(e) => handleInputChange('points', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">現在取得数</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.currentCount}
                    onChange={(e) => handleInputChange('currentCount', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};