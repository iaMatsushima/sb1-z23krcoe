import React, { useState } from 'react';
import { Users, BarChart3, Settings, LogOut, Search, Plus, Download, Edit, Eye, Building, Mail, Phone, Calendar, User, Shield, Award, MapPin, Building2 } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { CompanyList } from './components/CompanyList';
import { CompanyDetail } from './components/CompanyDetail';
import { CompanyEdit } from './components/CompanyEdit';
import { ProjectManagement } from './components/ProjectManagement';
import { EmployeeList } from './components/EmployeeList';
import { EmployeeDetail } from './components/EmployeeDetail';
import { EmployeeEdit } from './components/EmployeeEdit';
import { Company } from './types/Company';
import { Employee } from './types/Employee';
import { mockCompanies } from './data/mockCompanies';
import { mockEmployees } from './data/mockEmployees';
import { mockProjectAssignments, mockStandbyMembers, mockLeaveMembers } from './data/mockProjects';

type UserRole = 'admin' | 'sales' | 'tech_leader' | 'tech_general';

const LoginScreen = ({ onLogin }: { onLogin: (role: UserRole) => void }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="max-w-md w-full">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Building className="h-12 w-12 text-slate-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800">社員管理システム</h1>
          <p className="text-slate-600 mt-2">ログインしてください</p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">メールアドレス</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@company.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">パスワード</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="button"
            onClick={() => onLogin('admin')}
            className="w-full bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700 transition-colors"
          >
            ログイン
          </button>
          
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">または</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => onLogin('admin')}
              className="mt-4 w-full bg-white border border-slate-300 text-slate-700 py-2 px-4 rounded-md hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Googleでログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'companies' | 'projects' | 'detail' | 'edit' | 'company-detail' | 'company-edit'>('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    setSelectedEmployee(null);
    setSelectedCompany(null);
  };

  const handleEmployeeDetail = (employee: Employee) => {
    setSelectedEmployee(employee);
    setActiveTab('detail');
  };

  const handleEmployeeEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setActiveTab('edit');
  };

  const handleEmployeeSave = (updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    setSelectedEmployee(updatedEmployee);
    setActiveTab('detail');
  };

  const handleEditCancel = () => {
    setActiveTab('detail');
  };

  const handleCompanyDetail = (company: Company) => {
    setSelectedCompany(company);
    setActiveTab('company-detail');
  };

  const handleCompanyEdit = (company: Company) => {
    setSelectedCompany(company);
    setActiveTab('company-edit');
  };

  const handleAddCompany = () => {
    setSelectedCompany(null);
    setActiveTab('company-edit');
  };

  const handleCompanySave = (company: Company) => {
    if (selectedCompany) {
      setCompanies(prev => prev.map(c => c.id === company.id ? company : c));
    } else {
      setCompanies(prev => [...prev, company]);
    }
    setSelectedCompany(company);
    setActiveTab('company-detail');
  };

  const handleCompanyEditCancel = () => {
    if (selectedCompany) {
      setActiveTab('company-detail');
    } else {
      setActiveTab('companies');
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-slate-700" />
              <span className="ml-2 text-xl font-semibold text-slate-800">社員管理システム</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                ダッシュボード
              </button>
              <button
                onClick={() => setActiveTab('employees')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'employees'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                社員一覧
              </button>
              <button
                onClick={() => setActiveTab('companies')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'companies' || activeTab === 'company-detail' || activeTab === 'company-edit'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="h-4 w-4 inline mr-2" />
                取引先企業
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'projects'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                案件情報
              </button>
              <button
                onClick={handleLogout}
                className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <LogOut className="h-4 w-4 inline mr-2" />
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard userRole={userRole} />}
        {activeTab === 'employees' && <EmployeeList employees={employees} onEmployeeDetail={handleEmployeeDetail} onEmployeeEdit={handleEmployeeEdit} />}
        {activeTab === 'companies' && (
          <CompanyList 
            companies={companies} 
            onCompanyDetail={handleCompanyDetail} 
            onCompanyEdit={handleCompanyEdit}
            onAddCompany={handleAddCompany}
          />
        )}
        {activeTab === 'projects' && (
          <ProjectManagement 
            assignments={mockProjectAssignments}
            standbyMembers={mockStandbyMembers}
            leaveMembers={mockLeaveMembers}
          />
        )}
        {activeTab === 'detail' && selectedEmployee && <EmployeeDetail employee={selectedEmployee} onEdit={handleEmployeeEdit} />}
        {activeTab === 'edit' && selectedEmployee && (
          <EmployeeEdit 
            employee={selectedEmployee} 
            onSave={handleEmployeeSave} 
            onCancel={handleEditCancel} 
          />
        )}
        {activeTab === 'company-detail' && selectedCompany && (
          <CompanyDetail 
            company={selectedCompany} 
            onEdit={handleCompanyEdit} 
          />
        )}
        {activeTab === 'company-edit' && (
          <CompanyEdit 
            company={selectedCompany || undefined}
            onSave={handleCompanySave} 
            onCancel={handleCompanyEditCancel} 
          />
        )}
      </main>
    </div>
  );
};

export default App;