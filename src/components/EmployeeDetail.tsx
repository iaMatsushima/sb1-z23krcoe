import React, { useState } from 'react';
import { Edit, Building2, FileText, Users, Calendar, CheckCircle, XCircle, User, Mail, Phone, Shield, Award, MapPin, UserPlus, Trash2, ArrowLeft } from 'lucide-react';
import { Employee } from '../types/Employee';

interface EmployeeDetailProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onBack: () => void;
}

export const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onEdit, onBack }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'dependents'>('basic');

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">社員詳細情報</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            戻る
          </button>
          <button 
            onClick={() => onEdit(employee)}
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
              <div className="h-24 w-24 rounded-full bg-slate-300 flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{employee.name}</h3>
              <p className="text-slate-600">{employee.department} - {employee.role}</p>
              <div className="flex flex-col gap-2 mt-2">
                <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {employee.status}
                </span>
                <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {employee.employmentType}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-slate-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('basic')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'basic'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  基本情報
                </button>
                <button
                  onClick={() => setActiveTab('dependents')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'dependents'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  被扶養者情報
                </button>
              </nav>
            </div>

            {activeTab === 'basic' && (
              <div className="p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-6">基本情報</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">社員番号</label>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.id}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">関東ITS番号</label>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.kantoItsNumber}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">被扶養者保険証有無</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      employee.dependentInsuranceCard === '有' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.dependentInsuranceCard}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">フリガナ</label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.nameKana}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">性別</label>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {employee.gender}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">生年月日</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.birthDate}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">年齢</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.age}歳</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">郵便番号</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.postalCode}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">住所1</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.address1}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">住所2</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.address2}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">雇用形態</label>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {employee.employmentType}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">最終学歴</label>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {employee.finalEducation}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">役職カテゴリ</label>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                      {employee.roleCategory}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">勤続年数</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.yearsOfService}年{employee.monthsOfService}ヶ月</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">社会保険加入日</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.socialInsuranceJoinDate}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">雇用保険被保険者番号</label>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.employmentInsuranceNumber}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">基礎年金番号</label>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.basicPensionNumber}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">メールアドレス</label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.email}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">電話番号</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.phone}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">最寄り駅</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.nearestStation}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">入社日</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-900">{employee.joinDate}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">保有資格</label>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-slate-400" />
                      <div className="flex flex-wrap gap-1">
                        {employee.qualifications.map((qual, index) => (
                          <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                            {qual}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dependents' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-slate-800">被扶養者情報</h4>
                </div>
                
                {employee.dependents && employee.dependents.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">氏名</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">フリガナ</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">続柄</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">年齢</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">同居・別居</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">保険証枝番</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">加入日</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {employee.dependents.map((dependent) => (
                          <tr key={dependent.id} className="hover:bg-slate-50">
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                              {dependent.name}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                              {dependent.nameKana}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                              {dependent.relationship}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                              {calculateAge(dependent.birthDate)}歳
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                dependent.livingTogether === '同居' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {dependent.livingTogether}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                              {dependent.insuranceNumber}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                              {dependent.joinDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">被扶養者情報が登録されていません</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};