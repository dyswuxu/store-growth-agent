'use client'

import { motion } from 'framer-motion'
import { Clock, Database, FileText, Activity, CheckCircle } from 'lucide-react'
import { ModuleType } from '@/types'

interface KnowledgePanelProps {
  activeModule: ModuleType
  status: 'pending' | 'analyzing' | 'generated' | 'exportable'
}

const knowledgeItems = {
  recruitment: [
    { source: '正新鸡排加盟政策 v3.2', type: '政策文件' },
    { source: '优质客户画像模型', type: '数据模型' },
    { source: '历史跟进记录 2024-2025', type: '历史数据' },
  ],
  location: [
    { source: '商圈评估标准手册', type: '评估标准' },
    { source: '全国门店选址数据库', type: '数据模型' },
    { source: '竞品分布热力图', type: '数据分析' },
  ],
  operation: [
    { source: '新店开业SOP流程', type: '流程文档' },
    { source: '门店承接评估模型', type: '数据模型' },
    { source: '各阶段问题案例库', type: '历史案例' },
  ],
  review: [
    { source: '月度复盘模板 v2.1', type: '复盘模板' },
    { source: '门店经营KPI体系', type: '评估标准' },
    { source: '优秀门店经验库', type: '经验沉淀' },
  ],
}

const dataSources = [
  { name: 'CRM 加盟商管理系统', status: '已连接' },
  { name: '选址评估数据库', status: '已连接' },
  { name: '门店运营数据中台', status: '已连接' },
  { name: '财务报表系统', status: '已连接' },
]

const recentActivities = [
  { time: '10:32', action: '招商判断分析完成', module: '招商助手' },
  { time: '10:28', action: '选址初筛报告生成', module: '选址助手' },
  { time: '10:15', action: '新店运营评估完成', module: '运营助手' },
  { time: '09:45', action: '月度复盘报告导出', module: '复盘助手' },
]

export function KnowledgePanel({ activeModule, status }: KnowledgePanelProps) {
  const currentKnowledge = knowledgeItems[activeModule]

  const statusText = {
    pending: '待分析',
    analyzing: '分析中',
    generated: '已生成',
    exportable: '可导出',
  }

  const statusColor = {
    pending: 'bg-gray-100 text-gray-600',
    analyzing: 'bg-blue-100 text-blue-700',
    generated: 'bg-green-100 text-green-700',
    exportable: 'bg-green-100 text-green-700',
  }

  return (
    <aside className="w-72 bg-white border-l border-gray-200 flex-shrink-0 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* 任务状态 */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">当前任务状态</h3>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[status]}`}>
              {statusText[status]}
            </span>
            {status === 'analyzing' && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xs text-gray-500"
              >
                AI 处理中...
              </motion.div>
            )}
          </div>
        </div>

        {/* 最近处理记录 */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">最近处理记录</h3>
          <div className="space-y-2">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-2.5 py-2 border-b border-gray-100 last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-700">{activity.action}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{activity.time} · {activity.module}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 知识库引用 */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">知识库引用</h3>
          <div className="space-y-2">
            {currentKnowledge.map((item, index) => (
              <div key={index} className="flex items-center gap-2 py-1.5">
                <FileText className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-700 truncate">{item.source}</div>
                  <div className="text-xs text-gray-400">{item.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 数据来源 */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">数据来源</h3>
          <div className="space-y-1.5">
            {dataSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between py-1.5 px-2 bg-gray-50 rounded">
                <span className="text-xs text-gray-700">{source.name}</span>
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  {source.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 操作日志 */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">操作日志</h3>
          <div className="space-y-2">
            <LogItem time="10:32:15" action="页面加载完成" />
            <LogItem time="10:32:18" action="选择模块：招商判断助手" />
            <LogItem time="10:32:20" action="加载示例数据" />
            <LogItem time="10:32:25" action="点击生成结果" />
          </div>
        </div>
      </div>
    </aside>
  )
}

function LogItem({ time, action }: { time: string; action: string }) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <span className="text-gray-400 flex-shrink-0">{time}</span>
      <span className="text-gray-600">{action}</span>
    </div>
  )
}