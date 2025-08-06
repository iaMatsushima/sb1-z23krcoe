import React, { useState } from 'react';
import { Calendar, Users, UserX, Clock, Building2, Pen as Yen, FileText, Mail, Phone, AlertTriangle, Plus, Edit, Eye } from 'lucide-react';
import { ProjectAssignment, StandbyMember, LeaveMember } from '../types/Project';

interface ProjectManagementProps {
  assignments: ProjectAssignment[];
  standbyMembers: StandbyMember[];
  leaveMembers: LeaveMember[];
  onAddProject: () => void;
  onProjectEdit: (project: ProjectAssignment) => void;
}

export const ProjectManagement: React.FC<ProjectManagementProps> = ({
  assignments,
  standbyMembers,
  leaveMembers
  onAddProject,
  onProjectEdit
}) => {
  const [selectedMonth, setSelectedMonth] = useState('2024-12');
  const [activeTab, setActiveTab] = useState<'assignments' | 'standby' | 'leave'>('assignments');

  // 選択された月でフィルタリング
  const filteredAssignments = assignments.filter(assignment => {
    const [startDate] = assignment.period.split(' ~ ');
    const assignmentMonth = startDate.substring(0, 7);
    return assignmentMonth <= selectedMonth;
  });

  const sesUpperAssignments = filteredAssignments.filter(a => a.category === 'SES・上位');
  const sesBpAssignments = filteredAssignments.filter(a => a.category === 'SES・BP');
  const contractBpAssignments = filteredAssignments.filter(a => a.category === '請負・BP');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const AssignmentTable = ({ title, assignments }: { title: string; assignments: ProjectAssignment[] }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
        <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">会社名</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">カテゴリ</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">技術者名</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">期間</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">単価</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">人月</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">案件名</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">超過単価</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">控除単価</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">時間幅</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">時間単位</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">備考</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">契約形態</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">派遣抵触日</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">支払いサイト</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">勤務表入手経路</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.companyName}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    assignment.category === 'SES・上位' 
                      ? 'bg-blue-100 text-blue-800' 
                      : assignment.category === 'SES・BP'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {assignment.category}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{assignment.engineerName}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.period}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{formatCurrency(assignment.unitPrice)}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.personMonth}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.projectName}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{formatCurrency(assignment.overtimeRate)}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{formatCurrency(assignment.deductionRate)}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.timeRange}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.timeUnit}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.remarks}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.contractType}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.dispatchConflictDate}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.paymentSite}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{assignment.timesheetSource}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onProjectEdit(assignment)}
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
        {assignments.length === 0 && (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">該当する案件がありません</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-slate-800">案件情報管理</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={onAddProject}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規案件登録
          </button>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2024-01">2024年1月</option>
              <option value="2024-02">2024年2月</option>
              <option value="2024-03">2024年3月</option>
              <option value="2024-04">2024年4月</option>
              <option value="2024-05">2024年5月</option>
              <option value="2024-06">2024年6月</option>
              <option value="2024-07">2024年7月</option>
              <option value="2024-08">2024年8月</option>
              <option value="2024-09">2024年9月</option>
              <option value="2024-10">2024年10月</option>
              <option value="2024-11">2024年11月</option>
              <option value="2024-12">2024年12月</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('assignments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'assignments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Building2 className="h-4 w-4 inline mr-2" />
              案件配属
            </button>
            <button
              onClick={() => setActiveTab('standby')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'standby'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Clock className="h-4 w-4 inline mr-2" />
              待機メンバー
            </button>
            <button
              onClick={() => setActiveTab('leave')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'leave'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <UserX className="h-4 w-4 inline mr-2" />
              休職者
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">SES・上位</p>
                      <p className="text-2xl font-bold text-blue-800">{sesUpperAssignments.length}件</p>
                    </div>
                    <Building2 className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">SES・BP</p>
                      <p className="text-2xl font-bold text-green-800">{sesBpAssignments.length}件</p>
                    </div>
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600">請負・BP</p>
                      <p className="text-2xl font-bold text-purple-800">{contractBpAssignments.length}件</p>
                    </div>
                    <FileText className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600">総売上予想</p>
                      <p className="text-2xl font-bold text-orange-800">
                        {formatCurrency(filteredAssignments.reduce((sum, a) => sum + a.unitPrice * a.personMonth, 0))}
                      </p>
                    </div>
                    <Yen className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
              </div>

              <AssignmentTable title="SES・上位" assignments={sesUpperAssignments} />
              <AssignmentTable title="SES・BP" assignments={sesBpAssignments} />
              <AssignmentTable title="請負・BP" assignments={contractBpAssignments} />
            </div>
          )}

          {activeTab === 'standby' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-yellow-50 px-6 py-3 border-b border-slate-200">
                <h4 className="text-lg font-semibold text-slate-800">待機メンバー</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">カテゴリ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">技術者名</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">人月</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">待機開始日</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {standbyMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {member.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{member.engineerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{member.personMonth}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{member.standbyStartDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {standbyMembers.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">待機中のメンバーはいません</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'leave' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-red-50 px-6 py-3 border-b border-slate-200">
                <h4 className="text-lg font-semibold text-slate-800">休職者</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">技術者名</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">休職種別</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">開始日</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">終了予定日</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">理由</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {leaveMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{member.engineerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            member.leaveType === '産休' ? 'bg-pink-100 text-pink-800' :
                            member.leaveType === '育休' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {member.leaveType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{member.leaveStartDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{member.leaveEndDate || '未定'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{member.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {leaveMembers.length === 0 && (
                  <div className="text-center py-8">
                    <UserX className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">休職中のメンバーはいません</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};