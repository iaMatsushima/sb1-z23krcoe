import React, { useState } from 'react';
import { Plus, X, Building2, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Company, ContractInfo, CompanyMember } from '../types/Company';
import { mockBusinessCategories } from '../data/mockSettings';

interface CompanyEditProps {
  company?: Company;
  onSave: (company: Company) => void;
  onCancel: () => void;
}

export const CompanyEdit: React.FC<CompanyEditProps> = ({ company, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Company>(company || {
    id: '',
    companyCode: '',
    companyName: '',
    businessCategory: '',
    transactionType: '取引先',
    contracts: [],
    members: [],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (field: keyof Company, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addContract = () => {
    const newContract: ContractInfo = {
      id: Date.now().toString(),
      type: 'SES',
      startDate: '',
      endDate: '',
      autoRenewal: false
    };
    setFormData(prev => ({ ...prev, contracts: [...prev.contracts, newContract] }));
  };

  const updateContract = (index: number, field: keyof ContractInfo, value: string | boolean) => {
    const newContracts = [...formData.contracts];
    newContracts[index] = { ...newContracts[index], [field]: value };
    setFormData(prev => ({ ...prev, contracts: newContracts }));
  };

  const removeContract = (index: number) => {
    const newContracts = formData.contracts.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, contracts: newContracts }));
  };

  const addMember = () => {
    const newMember: CompanyMember = {
      id: Date.now().toString(),
      memberCode: '',
      name: '',
      workStatus: '稼働中'
    };
    setFormData(prev => ({ ...prev, members: [...prev.members, newMember] }));
  };

  const updateMember = (index: number, field: keyof CompanyMember, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  const removeMember = (index: number) => {
    const newMembers = formData.members.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCompany = {
      ...formData,
      id: formData.id || Date.now().toString(),
      updatedAt: new Date().toISOString().split('T')[0]
    };
    onSave(updatedCompany);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          {company ? '企業情報編集' : '新規企業登録'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">企業コード *</label>
              <input
                type="text"
                value={formData.companyCode}
                onChange={(e) => handleInputChange('companyCode', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">企業名 *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">事業分類</label>
              <input
                type="text"
                value={formData.businessCategory}
                onChange={(e) => handleInputChange('businessCategory', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例: IT・システム開発"
                list="business-categories"
              />
              <datalist id="business-categories">
                {mockBusinessCategories.map(category => (
                  <option key={category.id} value={category.name} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">取引種別</label>
              <select
                value={formData.transactionType}
                onChange={(e) => handleInputChange('transactionType', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="取引先">取引先</option>
                <option value="協力会社">協力会社</option>
                <option value="パートナー">パートナー</option>
                <option value="その他">その他</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-slate-800">契約情報</h4>
            <button
              type="button"
              onClick={addContract}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              契約追加
            </button>
          </div>
          <div className="space-y-4">
            {formData.contracts.map((contract, index) => (
              <div key={contract.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-medium text-slate-800">契約 #{index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeContract(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">契約種別</label>
                    <select
                      value={contract.type}
                      onChange={(e) => updateContract(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="SES">SES</option>
                      <option value="派遣">派遣</option>
                      <option value="受託">受託</option>
                      <option value="ゲーム事業">ゲーム事業</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">開始日</label>
                    <input
                      type="date"
                      value={contract.startDate}
                      onChange={(e) => updateContract(index, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">終了日</label>
                    <input
                      type="date"
                      value={contract.endDate}
                      onChange={(e) => updateContract(index, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">自動更新</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`autoRenewal-${index}`}
                          checked={contract.autoRenewal}
                          onChange={() => updateContract(index, 'autoRenewal', true)}
                          className="text-blue-600"
                        />
                        <span className="text-sm">あり</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`autoRenewal-${index}`}
                          checked={!contract.autoRenewal}
                          onChange={() => updateContract(index, 'autoRenewal', false)}
                          className="text-blue-600"
                        />
                        <span className="text-sm">なし</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {formData.contracts.length === 0 && (
              <p className="text-slate-500 text-center py-4">契約情報を追加してください</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-slate-800">要員情報</h4>
            <button
              type="button"
              onClick={addMember}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              要員追加
            </button>
          </div>
          <div className="space-y-4">
            {formData.members.map((member, index) => (
              <div key={member.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-medium text-slate-800">要員 #{index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">要員コード</label>
                    <input
                      type="text"
                      value={member.memberCode}
                      onChange={(e) => updateMember(index, 'memberCode', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">氏名</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">稼働状況</label>
                    <select
                      value={member.workStatus}
                      onChange={(e) => updateMember(index, 'workStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="稼働中">稼働中</option>
                      <option value="待機中">待機中</option>
                      <option value="休職中">休職中</option>
                      <option value="退職">退職</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            {formData.members.length === 0 && (
              <p className="text-slate-500 text-center py-4">要員情報を追加してください</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};