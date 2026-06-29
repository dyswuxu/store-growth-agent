'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProfitInput, ProfitOutput } from '@/types'

const mockOutput: ProfitOutput = {
  netProfit: 28500,
  netProfitRate: 19.0,
  status: 'warning',
  breakdown: {
    revenue: 150000,
    grossProfit: 75000,
    rent: 12000,
    labor: 22500,
    other: 11500,
    netProfit: 28500,
  },
  issues: [
    '人工成本占比 15% 偏高，同类门店平均 12%',
    '其他成本占比 7.7%，包含较高损耗',
    '工作日午高峰时段产能不足，流失约 15% 订单',
  ],
  suggestions: [
    '优化排班，高峰期增加小时工，降低固定人工成本',
    '引入预制菜方案降低后厨人力需求',
    '针对午高峰推出快速套餐，提升翻台率',
  ],
  comparableScore: 72,
}

export function ProfitPanel() {
  const [input, setInput] = useState<ProfitInput>({
    storeName: '徐州泉山万达店',
    monthlyRevenue: '150000',
    grossMargin: '50',
    rent: '12000',
    laborCost: '22500',
    otherCost: '11500',
    location: '商圈',
    storeArea: '60',
    openMonths: '14',
  })
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle')
  const [result, setResult] = useState<ProfitOutput | null>(null)

  const handleAnalyze = async () => {
    setStatus('analyzing')
    // 模拟 AI 分析
    setTimeout(() => {
      setResult(mockOutput)
      setStatus('done')
    }, 1500)
  }

  const handleReset = () => {
    setStatus('idle')
    setResult(null)
  }

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* 左侧输入 */}
      <div className="w-full lg:w-1/2 p-6 border-r border-slate-800">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-1">盈利诊断</h2>
          <p className="text-sm text-slate-400">输入门店经营数据，AI 分析盈利状况与改善方向</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">门店名称</label>
            <input
              type="text"
              value={input.storeName}
              onChange={(e) => setInput({ ...input, storeName: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              placeholder="输入门店名称"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">月营业额 (元)</label>
              <input
                type="number"
                value={input.monthlyRevenue}
                onChange={(e) => setInput({ ...input, monthlyRevenue: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="150000"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">毛利率 (%)</label>
              <input
                type="number"
                value={input.grossMargin}
                onChange={(e) => setInput({ ...input, grossMargin: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">月租金 (元)</label>
              <input
                type="number"
                value={input.rent}
                onChange={(e) => setInput({ ...input, rent: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="12000"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">人工成本 (元)</label>
              <input
                type="number"
                value={input.laborCost}
                onChange={(e) => setInput({ ...input, laborCost: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="22500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1.5">其他成本 (元)</label>
            <input
              type="number"
              value={input.otherCost}
              onChange={(e) => setInput({ ...input, otherCost: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              placeholder="11500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">位置类型</label>
              <select
                value={input.location}
                onChange={(e) => setInput({ ...input, location: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="商圈">商圈</option>
                <option value="社区">社区</option>
                <option value="学校">学校</option>
                <option value="交通枢纽">交通枢纽</option>
                <option value="外卖为主">外卖为主</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">面积 (㎡)</label>
              <input
                type="number"
                value={input.storeArea}
                onChange={(e) => setInput({ ...input, storeArea: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">开业月数</label>
              <input
                type="number"
                value={input.openMonths}
                onChange={(e) => setInput({ ...input, openMonths: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="14"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {status === 'idle' ? (
            <Button onClick={handleAnalyze} className="bg-orange-500 hover:bg-orange-600 text-white">
              开始分析
            </Button>
          ) : status === 'analyzing' ? (
            <Button disabled className="bg-orange-500/50 text-white">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              分析中...
            </Button>
          ) : (
            <Button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 text-white">
              重新分析
            </Button>
          )}
        </div>
      </div>

      {/* 右侧结果 */}
      <div className="w-full lg:w-1/2 p-6 bg-slate-900/50">
        {status === 'idle' ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">填写左侧数据<br />点击"开始分析"获取诊断结果</p>
            </div>
          </div>
        ) : status === 'analyzing' ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <Loader2 className="w-12 h-12 text-orange-500 mx-auto mb-3 animate-spin" />
              <p className="text-slate-400">AI 正在分析门店盈利状况...</p>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-6">
            {/* 概览卡片 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl font-bold text-white">{result.breakdown.revenue.toLocaleString()}</div>
                <div className="text-sm text-slate-400">月营业额</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl font-bold text-green-400">{result.netProfitRate}%</div>
                <div className="text-sm text-slate-400">净利率</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl font-bold text-white">{result.comparableScore}</div>
                <div className="text-sm text-slate-400">同类排名</div>
              </div>
            </div>

            {/* 状态标识 */}
            <div className={`rounded-xl p-4 border ${
              result.status === 'healthy' ? 'bg-green-500/10 border-green-500/30' :
              result.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
              'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {result.status === 'healthy' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                )}
                <span className={`font-medium ${
                  result.status === 'healthy' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {result.status === 'healthy' ? '盈利状况良好' : '存在改善空间'}
                </span>
              </div>
              <p className="text-sm text-slate-300">
                净利润 <span className="text-white font-semibold">{result.netProfit.toLocaleString()}元</span>，
                净利率 {result.netProfitRate}%，击败了 {result.comparableScore}% 的同类门店
              </p>
            </div>

            {/* 成本结构 */}
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3">成本结构</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">毛利 (50%)</span>
                  <span className="text-green-400">+{result.breakdown.grossProfit.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">租金</span>
                  <span className="text-red-400">-{result.breakdown.rent.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">人工</span>
                  <span className="text-red-400">-{result.breakdown.labor.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">其他</span>
                  <span className="text-red-400">-{result.breakdown.other.toLocaleString()}</span>
                </div>
                <div className="h-px bg-slate-700 my-2" />
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-white">净利润</span>
                  <span className="text-orange-400">{result.breakdown.netProfit.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 问题点 */}
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                识别的问题
              </h3>
              <ul className="space-y-2">
                {result.issues.map((issue, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            {/* 建议 */}
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                改善建议
              </h3>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
