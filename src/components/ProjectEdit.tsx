import React, { useState } from 'react';
import { Building2, Calendar, User, FileText, Yen, Clock } from 'lucide-react';
import { ProjectAssignment } from '../types/Project';

interface ProjectEditProps {
  project?: ProjectAssignment;
  onSave: (project: ProjectAssignment) => void;
  onCancel: () => void;
}

export const ProjectEdit: React.FC<ProjectEditProps> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState<ProjectAssignment>(project || {
    id: '',
    companyName: '',
    category: 'SES・上位',
    engineerName: '',
    period: '',
    unitPrice: 0,
    personMonth: 1.0,
    projectName: '',
    overtimeRate: 0,
    deductionRate: 0,
    timeRange: '140-180',
    timeUnit: '時間',
    remarks: '',
    contractType: 'SES契約',
    dispatchConflictDate: '',
    paymentSite: '翌月末',
    timesheetSource: 'メール',
    status: 'active',
    assignedDate: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (field: keyof ProjectAssignment, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // カテゴリが変更された場合、関連フィールドを自動設定
    if (field === 'category') {
      if (value === '請負・BP') {
        setFormData(prev => ({
          ...prev,
          overtimeRate: 0,
          deductionRate: 0,
          timeRange: '成果物納期',
          timeUnit: '成果物',
          contractType: '請負契約',
          dispatchConflictDate: '',
          paymentSite: '検収後翌月末',
          timesheetSource: '不要'
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          timeRange: '140-180',
          timeUnit: '時間',
          contractType: 'SES契約',
          paymentSite: '翌月末',
          timesheetSource: 'メール'
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProject = {
      ...formData,
      id: formData.id || Date.now().toString()
    };
    onSave(updatedProject);
  };

  const isContractType = formData.category === '請負・BP';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          {project ? '案件情報編集' : '新規案件登録'}
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
          <h4 className="text-lg font-semibold text-slate-800 mb-6">基本情報</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">会社名 *</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">カテゴリ *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="SES・上位">SES・上位</option>
                <option value="SES・BP">SES・BP</option>
                <option value="請負・BP">請負・BP</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">技術者名 *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.engineerName}
                  onChange={(e) => handleInputChange('engineerName', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">案件名 *</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">期間 *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => handleInputChange('period', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2024-01-01 ~ 2024-12-31"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">配属日</label>
              <input
                type="date"
                value={formData.assignedDate}
                onChange={(e) => handleInputChange('assignedDate', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-slate-800 mb-6">契約・料金情報</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">単価 *</label>
              <div className="relative">
                <Yen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => handleInputChange('unitPrice', parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">人月</label>
              <input
                type="number"
                step="0.1"
                value={formData.personMonth}
                onChange={(e) => handleInputChange('personMonth', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">契約形態</label>
              <input
                type="text"
                value={formData.contractType}
                onChange={(e) => handleInputChange('contractType', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isContractType}
              />
            </div>
            
            {!isContractType && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">超過単価</label>
                  <div className="relative">
                    <Yen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="number"
                      value={formData.overtimeRate}
                      onChange={(e) => handleInputChange('overtimeRate', parseInt(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">控除単価</label>
                  <div className="relative">
                    <Yen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="number"
                      value={formData.deductionRate}
                      onChange={(e) => handleInputChange('deductionRate', parseInt(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">派遣抵触日</label>
                  <input
                    type="date"
                    value={formData.dispatchConflictDate}
                    onChange={(e) => handleInputChange('dispatchConflictDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">時間幅</label>
              <input
                type="text"
                value={formData.timeRange}
                onChange={(e) => handleInputChange('timeRange', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isContractType}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">時間単位</label>
              <input
                type="text"
                value={formData.timeUnit}
                onChange={(e) => handleInputChange('timeUnit', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isContractType}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">支払いサイト</label>
              <input
                type="text"
                value={formData.paymentSite}
                onChange={(e) => handleInputChange('paymentSite', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={isContractType}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">勤務表入手経路</label>
              <select
                value={formData.timesheetSource}
                onChange={(e) => handleInputChange('timesheetSource', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isContractType}
              >
                <option value="メール">メール</option>
                <option value="システム">システム</option>
                <option value="FAX">FAX</option>
                <option value="不要">不要</option>
              </select>
            </div>
            
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-slate-700 mb-2">備考</label>
              <textarea
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="備考を入力してください"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};