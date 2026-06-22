'use client'

import { motion } from 'framer-motion'
import { ModuleType, TaskStatus } from '@/types'
import { recruitmentExamples, locationExamples, operationExamples, reviewExamples } from '@/lib/mockData'

interface TaskPanelProps {
  activeModule: ModuleType
  currentExample: number
  status: TaskStatus
  onExampleChange: (index: number) => void
}

const moduleConfig = {
  recruitment: {
    title: '招商判断助手',
    subtitle: '判断线索质量并给出跟进优先级',
    examples: recruitmentExamples,
  },
  location: {
    title: '选址初筛助手',
    subtitle: '基于商圈与竞品情况评估点位风险',
    examples: locationExamples,
  },
  operation: {
    title: '新店运营承接助手',
    subtitle: '识别新店开业阶段的关键问题',
    examples: operationExamples,
  },
  review: {
    title: '月度复盘助手',
    subtitle: '自动提炼月度经营问题与行动项',
    examples: reviewExamples,
  },
}

export function TaskPanel({ activeModule, currentExample, status, onExampleChange }: TaskPanelProps) {
  const config = moduleConfig[activeModule]
  const example = config.examples[currentExample] as any

  const renderFields = () => {
    switch (activeModule) {
      case 'recruitment':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="线索名称" value={example.input.name} />
            <Field label="所在城市" value={example.input.city} />
            <Field label="加盟意向强度" value={example.input.intention === 'high' ? '高' : example.input.intention === 'medium' ? '中' : '低'} />
            <Field label="预算能力" value={example.input.budget} />
            <Field label="开店经验" value={example.input.experience} span />
            <Field label="合作匹配度" value={`${example.input.matchScore}分`} />
          </div>
        )
      case 'location':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="城市" value={example.input.city} />
            <Field label="商圈" value={example.input.district} />
            <Field label="租金" value={example.input.rent} />
            <Field label="面积" value={example.input.area} />
            <Field label="竞品数量" value={`${example.input.competitors}家`} />
            <Field label="客群匹配度" value={`${example.input.crowdMatch}分`} />
            <Field label="交通条件" value={example.input.trafficCondition} span />
          </div>
        )
      case 'operation':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="门店名称" value={example.input.storeName} />
            <Field label="开业时间" value={example.input.openDate} />
            <Field label="开业前准备" value={example.input.prepStatus} span />
            <Field label="开业第7天" value={example.input.day7Performance} />
            <Field label="开业第30天" value={example.input.day30Performance} />
            <Field label="开业第60天" value={example.input.day60Performance} />
            <Field label="问题类型" value={example.input.issueType} span />
          </div>
        )
      case 'review':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="门店/区域" value={example.input.storeName} />
            <Field label="月份" value={example.input.month} />
            <Field label="销售表现" value={example.input.salesPerformance} span />
            <Field label="客流表现" value={example.input.customerFlow} />
            <Field label="成本表现" value={example.input.costPerformance} span />
            <Field label="异常事件" value={example.input.abnormalEvents} span />
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{config.title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{config.subtitle}</p>
          </div>
          <div className="flex gap-1">
            {config.examples.map((_, index) => (
              <button
                key={index}
                onClick={() => onExampleChange(index)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  currentExample === index
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                示例 {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {config.examples[currentExample].name}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">输入信息</span>
        </div>
        <motion.div
          key={`${activeModule}-${currentExample}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderFields()}
        </motion.div>
      </div>
    </div>
  )
}

function Field({ label, value, span = false }: { label: string; value: string; span?: boolean }) {
  return (
    <div className={span ? 'col-span-2' : ''}>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <div className="text-sm text-gray-900 bg-gray-50 rounded-lg px-3 py-2">{value}</div>
    </div>
  )
}