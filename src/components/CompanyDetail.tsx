import React from 'react';
import { Edit, Building2, FileText, Users, Calendar, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Company } from '../types/Company';

interface CompanyDetailProps {
  company: Company;
  onEdit: (company: Company) => void;
  onBack: () => void;
}

export const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onEdit, onBack }) => {
  const getContractTypeColor = (type: string) => {
    switch (type) {
      case 'SES': return 'bg-blue-100 text-blue-800';
      case '派遣': return 'bg-green-100 text-green-800';
      case '受託': return 'bg-purple-100 text-purple-800';
      case 'ゲーム事業': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkStatusColor = (status: string) => {
    switch (status) {
      case '稼働中': return 'bg-green-100 text-green-800';
      case '待機中': return 'bg-yellow-100 text-yellow-800';
      case '休職中': return 'bg-orange-100 text-orange-800';
      case '退職': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">企業詳細情報</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            戻る
          </button>
          <button 
            onClick={() => onEdit(company)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            編集
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{company.companyName}</h3>
              <p className="text-slate-600">{company.companyCode}</p>
              <span className="inline-flex px-3 py-1 mt-2 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {company.transactionType}
              </span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-slate-800 mb-6">基本情報</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">企業コード</label>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-900">{company.companyCode}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">事業分類</label>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-900">{company.businessCategory}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">取引種別</label>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {company.transactionType}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">登録日</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-900">{company.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="text-lg font-semibold text-slate-800 mb-6">契約情報</h4>
        <div className="space-y-4">
          {company.contracts.map((contract) => (
            <div key={contract.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getContractTypeColor(contract.type)}`}>
                  {contract.type}基本契約書
                </span>
                <div className="flex items-center gap-2">
                  {contract.autoRenewal ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm text-slate-600">
                    {contract.autoRenewal ? '自動更新あり' : '自動更新なし'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>開始日: {contract.startDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>終了日: {contract.endDate}</span>
                </div>
              </div>
            </div>
          ))}
          {company.contracts.length === 0 && (
            <p className="text-slate-500 text-center py-4">契約情報が登録されていません</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="text-lg font-semibold text-slate-800 mb-6">要員情報</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">要員コード</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">氏名</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">稼働状況</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {company.members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                    {member.memberCode}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                    {member.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getWorkStatusColor(member.workStatus)}`}>
                      {member.workStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {company.members.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">要員情報が登録されていません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};