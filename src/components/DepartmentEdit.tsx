import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Department } from '../types/Settings';

interface DepartmentEditProps {
  department?: Department;
  onSave: (department: Department) => void;
  onCancel: () => void;
}

export const DepartmentEdit: React.FC<DepartmentEditProps> = ({ department, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Department>(department || {
    id: '',
    name: '',
    description: '',
    createdAt: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (field: keyof Department, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedDepartment = {
      ...formData,
      id: formData.id || Date.now().toString()
    };
    onSave(updatedDepartment);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">
          {department ? '部署編集' : '新規部署登録'}
        </h3>
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
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-800">部署情報</h4>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">部署名 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">説明</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="部署の説明を入力してください"
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