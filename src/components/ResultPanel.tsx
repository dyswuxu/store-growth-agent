'use client'

import { motion } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { ModuleType, TaskStatus } from '@/types'
import { recruitmentExamples, locationExamples, operationExamples, reviewExamples } from '@/lib/mockData'

interface ResultPanelProps {
  activeModule: ModuleType
  currentExample: number
  status: TaskStatus
  onGenerate: () => void
}

export function ResultPanel({ activeModule, currentExample, status, onGenerate }: ResultPanelProps) {
  const getExample = () => {
    switch (activeModule) {
      case 'recruitment':
        return recruitmentExamples[currentExample]
      case 'location':
        return locationExamples[currentExample]
      case 'operation':
        return operationExamples[currentExample]
      case 'review':
        return reviewExamples[currentExample]
    }
  }

  const example = getExample()

  const renderContent = () => {
    if (status === 'pending') {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-gray-400" />
          </div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">待分析</h4>
          <p className="text-xs text-gray-500 mb-6 max-w-xs">点击下方按钮，AI 将基于输入信息生成分析结果</p>
          <button
            onClick={onGenerate}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            生成结果
          </button>
        </div>
      )
    }

    if (status === 'analyzing') {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-10 h-10 text-blue-600 mb-4" />
          </motion.div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">分析中...</h4>
          <p className="text-xs text-gray-500">AI 正在处理数据，请稍候</p>
        </div>
      )
    }

    const output = example.output as any

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeModule === 'recruitment' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-gray-900">{output.score}</div>
                <div className="text-xs text-gray-500">
                  <div>综合评分</div>
                  <div>满分100</div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                output.recommendFollowUp ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {output.recommendFollowUp ? '建议重点跟进' : '暂不跟进'}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ResultCard label="跟进优先级" value={
                <span className={`font-semibold ${
                  output.priority === 'high' ? 'text-red-600' : output.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {output.priority === 'high' ? '高优先级' : output.priority === 'medium' ? '中优先级' : '低优先级'}
                </span>
              } />
              <ResultCard label="风险等级" value={`${output.riskPoints.length} 个风险点`} />
            </div>
            <ResultCard label="风险点" value={
              <ul className="space-y-1">
                {output.riskPoints.map((risk, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {risk}
                  </li>
                ))}
              </ul>
            } />
            <ResultCard label="沟通话术建议" value={
              <p className="text-sm text-gray-700 leading-relaxed">{output.talkPoints}</p>
            } />
            <ResultCard label="下一步建议" value={
              <p className="text-sm text-gray-700">{output.nextStep}</p>
            } />
          </div>
        )}

        {activeModule === 'location' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-gray-900">{output.score}</div>
                <div className="text-xs text-gray-500">
                  <div>选址评分</div>
                  <div>满分100</div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                output.riskLevel === 'low' ? 'bg-green-100 text-green-700' :
                output.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>
                {output.riskLevel === 'low' ? '低风险' : output.riskLevel === 'medium' ? '中风险' : '高风险'}
              </div>
            </div>
            <ResultCard label="复勘建议" value={
              <span className={`font-medium ${output.recommendSurvey ? 'text-green-600' : 'text-gray-600'}`}>
                {output.recommendSurvey ? '建议进入复勘' : '不建议进入复勘'}
              </span>
            } />
            <ResultCard label="关键风险提示" value={
              <ul className="space-y-1">
                {output.riskWarnings.map((warning, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    {warning}
                  </li>
                ))}
              </ul>
            } />
            <ResultCard label="初步建议动作" value={
              <ul className="space-y-1">
                {output.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            } />
          </div>
        )}

        {activeModule === 'operation' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  output.status === 'good' ? 'bg-green-100' :
                  output.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {output.status === 'good' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> :
                   output.status === 'warning' ? <AlertCircle className="w-5 h-5 text-yellow-600" /> :
                   <XCircle className="w-5 h-5 text-red-600" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {output.status === 'good' ? '承接正常' : output.status === 'warning' ? '需要关注' : '需要介入'}
                  </div>
                  <div className="text-xs text-gray-500">当前承接状态</div>
                </div>
              </div>
            </div>
            <ResultCard label="问题诊断" value={
              <p className="text-sm text-gray-700 leading-relaxed">{output.diagnosis}</p>
            } />
            <ResultCard label="主要短板" value={
              <ul className="space-y-1">
                {output.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            } />
            <ResultCard label="优先改善动作" value={
              <ul className="space-y-1">
                {output.improvementActions.map((a, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            } />
            <div className={`p-4 rounded-lg ${output.needHumanIntervention ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex items-center gap-2">
                {output.needHumanIntervention ? (
                  <XCircle className="w-4 h-4 text-red-600" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                )}
                <span className={`text-sm font-medium ${output.needHumanIntervention ? 'text-red-700' : 'text-green-700'}`}>
                  {output.needHumanIntervention ? '需要人工介入' : '暂不需要人工介入'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeModule === 'review' && (
          <div className="space-y-5">
            <ResultCard label="复盘摘要" value={
              <p className="text-sm text-gray-700 leading-relaxed">{output.summary}</p>
            } />
            <ResultCard label="本月亮点" value={
              <ul className="space-y-1">
                {output.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            } />
            <ResultCard label="主要问题" value={
              <ul className="space-y-1">
                {output.problems.map((p, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            } />
            <ResultCard label="下月行动项" value={
              <ul className="space-y-1">
                {output.nextActions.map((a, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-blue-500 font-medium">{i + 1}.</span>
                    {a}
                  </li>
                ))}
              </ul>
            } />
            <ResultCard label="可复制经验" value={
              <ul className="space-y-1">
                {output.replicableExperiences.map((e, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>
            } />
          </div>
        )}

        {(status === 'generated' || status === 'exportable') && (
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
              导出报告
            </button>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">AI 分析结果</span>
          {status === 'generated' && (
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">已生成</span>
          )}
        </div>
      </div>
      <div className="p-5">
        {renderContent()}
      </div>
    </div>
  )
}

function ResultCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-xs text-gray-500 mb-2">{label}</div>
      <div>{value}</div>
    </div>
  )
}