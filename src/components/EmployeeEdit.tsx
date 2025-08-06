import React, { useState } from 'react';
import { Plus, X, Building2, Calendar, CheckCircle, XCircle, User, Trash2 } from 'lucide-react';
import { Employee, Dependent } from '../types/Employee';
import { mockBusinessCategories, mockDepartments } from '../data/mockSettings';
import { mockBusinessCategories, mockDepartments } from '../data/mockSettings';

interface EmployeeEditProps {
  employee?: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export const EmployeeEdit: React.FC<EmployeeEditProps> = ({ employee, onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'dependents'>('basic');
  const [formData, setFormData] = useState<Employee>(employee || {
    id: '',
    kantoItsNumber: '',
    dependentInsuranceCard: '無',
    department: '技術部',
    name: '',
    nameKana: '',
    gender: '男性',
    email: '',
    birthDate: '',
    previousAddress: '',
    postalCode: '',
    address1: '',
    address2: '',
    phone: '',
    age: 0,
    joinDate: new Date().toISOString().split('T')[0],
    leaveDate: '',
    leaveEndOfMonth: '',
    status: '在籍',
    socialInsuranceJoinDate: new Date().toISOString().split('T')[0],
    firstPaidLeaveDate: '',
    employmentType: '正社員',
    fullTimeConversionDate: '',
    yearsOfService: 0,
    monthsOfService: 0,
    role: '',
    employmentInsuranceNumber: '',
    basicPensionNumber: '',
    standardMonthlyRemunerationHealth: 0,
    standardMonthlyRemunerationPension: 0,
    type: '一般',
    roleCategory: '技術職',
    finalEducation: '大学卒',
    qualifications: [],
    nearestStation: '',
    dependents: []
  });

  const handleInputChange = (field: keyof Employee, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQualificationChange = (index: number, value: string) => {
    const newQualifications = [...formData.qualifications];
    newQualifications[index] = value;
    setFormData(prev => ({ ...prev, qualifications: newQualifications }));
  };

  const addQualification = () => {
    setFormData(prev => ({ ...prev, qualifications: [...prev.qualifications, ''] }));
  };

  const removeQualification = (index: number) => {
    const newQualifications = formData.qualifications.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, qualifications: newQualifications }));
  };

  const addDependent = () => {
    const newDependent: Dependent = {
      id: Date.now().toString(),
      name: '',
      nameKana: '',
      relationship: '',
      birthDate: '',
      age: 0,
      livingTogether: '同居',
      insuranceNumber: '',
      joinDate: '',
      leaveDate: '',
      leaveReason: ''
    };
    setFormData(prev => ({ 
      ...prev, 
      dependents: [...(prev.dependents || []), newDependent] 
    }));
  };

  const updateDependent = (index: number, field: keyof Dependent, value: string | number) => {
    const newDependents = [...(formData.dependents || [])];
    newDependents[index] = { ...newDependents[index], [field]: value };
    
    // 生年月日が変更された場合、年齢を自動計算
    if (field === 'birthDate' && value) {
      const birthDate = new Date(value as string);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      newDependents[index].age = age;
    }
    
    setFormData(prev => ({ ...prev, dependents: newDependents }));
  };

  const removeDependent = (index: number) => {
    const newDependents = (formData.dependents || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, dependents: newDependents }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEmployee = {
      ...formData,
      id: formData.id || Date.now().toString()
    };
    onSave(updatedEmployee);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          {employee ? '社員情報編集' : '新規社員登録'}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-slate-300 flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-slate-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">氏名</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">部署</label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {mockDepartments.map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">役職</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ステータス</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="在籍">在籍</option>
                      <option value="休職">休職</option>
                      <option value="退職">退職</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-slate-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    type="button"
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
                    type="button"
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
                      <input
                        type="text"
                        value={formData.id}
                        onChange={(e) => handleInputChange('id', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">関東ITS番号</label>
                      <input
                        type="text"
                        value={formData.kantoItsNumber}
                        onChange={(e) => handleInputChange('kantoItsNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">被扶養者保険証有無</label>
                      <select
                        value={formData.dependentInsuranceCard}
                        onChange={(e) => handleInputChange('dependentInsuranceCard', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="有">有</option>
                        <option value="無">無</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">フリガナ</label>
                      <input
                        type="text"
                        value={formData.nameKana}
                        onChange={(e) => handleInputChange('nameKana', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">性別</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="男性">男性</option>
                        <option value="女性">女性</option>
                        <option value="その他">その他</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">生年月日</label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">年齢</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">変更前住所</label>
                      <input
                        type="text"
                        value={formData.previousAddress}
                        onChange={(e) => handleInputChange('previousAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">郵便番号</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">住所1</label>
                      <input
                        type="text"
                        value={formData.address1}
                        onChange={(e) => handleInputChange('address1', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">住所2</label>
                      <input
                        type="text"
                        value={formData.address2}
                        onChange={(e) => handleInputChange('address2', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">入社日</label>
                      <input
                        type="date"
                        value={formData.joinDate}
                        onChange={(e) => handleInputChange('joinDate', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">退職日</label>
                      <input
                        type="date"
                        value={formData.leaveDate || ''}
                        onChange={(e) => handleInputChange('leaveDate', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">退職月の末日</label>
                      <input
                        type="date"
                        value={formData.leaveEndOfMonth || ''}
                        onChange={(e) => handleInputChange('leaveEndOfMonth', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">社会保険加入日</label>
                      <input
                        type="date"
                        value={formData.socialInsuranceJoinDate}
                        onChange={(e) => handleInputChange('socialInsuranceJoinDate', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">初回有休付与日</label>
                      <input
                        type="date"
                        value={formData.firstPaidLeaveDate}
                        onChange={(e) => handleInputChange('firstPaidLeaveDate', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">雇用形態</label>
                      <select
                        value={formData.employmentType}
                        onChange={(e) => handleInputChange('employmentType', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="正社員">正社員</option>
                        <option value="契約社員">契約社員</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">正社員転換日</label>
                      <input
                        type="date"
                        value={formData.fullTimeConversionDate || ''}
                        onChange={(e) => handleInputChange('fullTimeConversionDate', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">勤続年数</label>
                      <input
                        type="number"
                        value={formData.yearsOfService}
                        onChange={(e) => handleInputChange('yearsOfService', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">勤続月数</label>
                      <input
                        type="number"
                        value={formData.monthsOfService}
                        onChange={(e) => handleInputChange('monthsOfService', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">雇用保険被保険者番号</label>
                      <input
                        type="text"
                        value={formData.employmentInsuranceNumber}
                        onChange={(e) => handleInputChange('employmentInsuranceNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">基礎年金番号</label>
                      <input
                        type="text"
                        value={formData.basicPensionNumber}
                        onChange={(e) => handleInputChange('basicPensionNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">標準報酬月額（健保）</label>
                      <input
                        type="number"
                        value={formData.standardMonthlyRemunerationHealth}
                        onChange={(e) => handleInputChange('standardMonthlyRemunerationHealth', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">標準報酬月額（厚年）</label>
                      <input
                        type="number"
                        value={formData.standardMonthlyRemunerationPension}
                        onChange={(e) => handleInputChange('standardMonthlyRemunerationPension', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">種別</label>
                      <input
                        type="text"
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">役職カテゴリ</label>
                      <select
                        value={formData.roleCategory}
                        onChange={(e) => handleInputChange('roleCategory', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="管理職">管理職</option>
                        <option value="営業職">営業職</option>
                        <option value="技術職">技術職</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">最終学歴</label>
                      <select
                        value={formData.finalEducation}
                        onChange={(e) => handleInputChange('finalEducation', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="大学院卒">大学院卒</option>
                        <option value="大学卒">大学卒</option>
                        <option value="大卒以外">大卒以外</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">メールアドレス</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">電話番号</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">最寄り駅</label>
                      <input
                        type="text"
                        value={formData.nearestStation}
                        onChange={(e) => handleInputChange('nearestStation', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">保有資格</label>
                      <div className="space-y-2">
                        {formData.qualifications.map((qualification, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={qualification}
                              onChange={(e) => handleQualificationChange(index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="資格名を入力"
                            />
                            <button
                              type="button"
                              onClick={() => removeQualification(index)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addQualification}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          資格を追加
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'dependents' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-slate-800">被扶養者情報</h4>
                    <button
                      type="button"
                      onClick={addDependent}
                      className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      被扶養者追加
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {(formData.dependents || []).map((dependent, index) => (
                      <div key={dependent.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-medium text-slate-800">被扶養者 #{index + 1}</h5>
                          <button
                            type="button"
                            onClick={() => removeDependent(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">氏名</label>
                            <input
                              type="text"
                              value={dependent.name}
                              onChange={(e) => updateDependent(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">フリガナ</label>
                            <input
                              type="text"
                              value={dependent.nameKana}
                              onChange={(e) => updateDependent(index, 'nameKana', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">続柄</label>
                            <select
                              value={dependent.relationship}
                              onChange={(e) => updateDependent(index, 'relationship', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">選択してください</option>
                              <option value="配偶者">配偶者</option>
                              <option value="子">子</option>
                              <option value="父">父</option>
                              <option value="母">母</option>
                              <option value="その他">その他</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">生年月日</label>
                            <input
                              type="date"
                              value={dependent.birthDate}
                              onChange={(e) => updateDependent(index, 'birthDate', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">同居・別居</label>
                            <select
                              value={dependent.livingTogether}
                              onChange={(e) => updateDependent(index, 'livingTogether', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="同居">同居</option>
                              <option value="別居">別居</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">保険証枝番</label>
                            <input
                              type="text"
                              value={dependent.insuranceNumber}
                              onChange={(e) => updateDependent(index, 'insuranceNumber', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">加入日</label>
                            <input
                              type="date"
                              value={dependent.joinDate}
                              onChange={(e) => updateDependent(index, 'joinDate', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">脱退日</label>
                            <input
                              type="date"
                              value={dependent.leaveDate || ''}
                              onChange={(e) => updateDependent(index, 'leaveDate', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">脱退理由</label>
                            <input
                              type="text"
                              value={dependent.leaveReason || ''}
                              onChange={(e) => updateDependent(index, 'leaveReason', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="脱退理由を入力"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!formData.dependents || formData.dependents.length === 0) && (
                      <p className="text-slate-500 text-center py-4">被扶養者情報を追加してください</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};