'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Loader2, Star, HelpCircle, Droplet, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StoreHealthInput, StoreHealthOutput } from '@/types'

const mockOutput: StoreHealthOutput = {
  overallScore: 68,
  quadrant: 'questionMarks',
  dimensions: {
    sales: 72,
    product: 65,
    customer: 70,
    cost: 62,
  },
  healthStatus: 'attention',
  issues: [
    '爆品过于集中，新品动销率低',
    '午高峰产能不足，流失约 15% 订单',
    '复购率偏低，老客占比仅 25%',
  ],
  strengths: [
    '客单价高于同类门店平均水平',
    '门店位置客流充沛，变现基础好',
    '损耗控制良好，在合理范围内',
  ],
  actions: [
    '本周重点：推出工作日午餐套餐提升午高峰产能',
    '本月重点：设计新品尝鲜活动，提升新品动销',
    '下月重点：启动会员体系，提升复购率至 35%',
  ],
  productSuggestions: {
    promote: ['爆打柠檬茶', '美式薯条', '鸡排单人餐'],
    optimize: ['香辣鸡腿堡', '可乐中杯'],
    remove: ['已停售的旧品A', '周转天数>30天的半成品'],
  },
}

export function DashboardPanel() {
  const [input, setInput] = useState<StoreHealthInput>({
    storeName: '徐州泉山万达店',
    salesData: {
      monthlySales: ['145000', '152000', '138000', '161000', '155000', '148000'],
      peakHourSales: '320',
      offHourSales: '85',
    },
    productData: {
      topProducts: ['正新鸡排', '爆打柠檬茶', '美式薯条'],
      lowMarginProducts: ['可乐大杯', '鸡翅中'],
      staleProducts: ['旧品A'],
    },
    customerData: {
      dailyTraffic: '580',
      repeatRate: '25',
      avgOrderValue: '28.5',
    },
    costData: {
      grossMargin: '52',
      rentPerSqm: '200',
      laborRatio: '15',
    },
  })
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle')
  const [result, setResult] = useState<StoreHealthOutput | null>(null)

  const handleAnalyze = async () => {
    setStatus('analyzing')
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
    <div className="h-full overflow-y-auto">
      {status === 'idle' ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <div className="w-20 h-20 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-10 h-10 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">门店健康体检</h2>
            <p className="text-slate-400 mb-8">
              输入门店的核心经营数据，AI 为你做一次全面的健康度体检，
              识别问题点，给出行动建议。
            </p>
            <Button onClick={handleAnalyze} className="bg-orange-500 hover:bg-orange-600 text-white px-8">
              开始体检
            </Button>
          </div>
        </div>
      ) : status === 'analyzing' ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-spin" />
            <p className="text-slate-400">AI 正在为门店做全面体检...</p>
          </div>
        </div>
      ) : result ? (
        <div className="p-6 space-y-6">
          {/* 头部状态 */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">{input.storeName} · 健康体检报告</h2>
              <p className="text-sm text-slate-400 mt-1">
                体检时间：{new Date().toLocaleDateString('zh-CN')} · 
                数据区间：近 6 个月
              </p>
            </div>
            <Button onClick={handleReset} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              重新体检
            </Button>
          </div>

          {/* 综合评分 */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 col-span-1">
              <div className="text-4xl font-bold text-white mb-1">{result.overallScore}</div>
              <div className="text-sm text-slate-400">综合健康度</div>
              <div className={`mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                result.healthStatus === 'healthy' ? 'bg-green-500/20 text-green-400' :
                result.healthStatus === 'attention' ? 'bg-yellow-500/20 text-yellow-400' :
                result.healthStatus === 'warning' ? 'bg-orange-500/20 text-orange-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {result.healthStatus === 'healthy' ? '健康' :
                 result.healthStatus === 'attention' ? '需关注' :
                 result.healthStatus === 'warning' ? '预警' : '危急'}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 col-span-3">
              <div className="text-sm text-slate-400 mb-3">四象限定位</div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-2 ${
                    result.quadrant === 'stars' ? 'bg-green-500/20' :
                    result.quadrant === 'cashCows' ? 'bg-blue-500/20' :
                    result.quadrant === 'questionMarks' ? 'bg-yellow-500/20' :
                    'bg-red-500/20'
                  }`}>
                    {result.quadrant === 'stars' ? <Star className="w-8 h-8 text-green-400" /> :
                     result.quadrant === 'cashCows' ? <TrendingUp className="w-8 h-8 text-blue-400" /> :
                     result.quadrant === 'questionMarks' ? <HelpCircle className="w-8 h-8 text-yellow-400" /> :
                     <Trash2 className="w-8 h-8 text-red-400" />}
                  </div>
                  <div className="text-sm text-white font-medium">
                    {result.quadrant === 'stars' ? '明星门店' :
                     result.quadrant === 'cashCows' ? '现金牛' :
                     result.quadrant === 'questionMarks' ? '问题门店' : '瘦狗门店'}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-400">
                    {result.quadrant === 'stars' ? '高销量+高毛利，增长潜力大，适合加大投入' :
                     result.quadrant === 'cashCows' ? '销量稳定，是门店利润的主要来源，需保持' :
                     result.quadrant === 'questionMarks' ? '有潜力但未完全发挥，需要诊断问题、重点突破' :
                     '销量和毛利都偏低，需要决定是改造还是调整'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 维度评分 */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: '销售能力', score: result.dimensions.sales, icon: TrendingUp },
              { label: '产品结构', score: result.dimensions.product, icon: Star },
              { label: '客户运营', score: result.dimensions.customer, icon: BarChart3 },
              { label: '成本控制', score: result.dimensions.cost, icon: CheckCircle2 },
            ].map((dim) => (
              <div key={dim.label} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">{dim.label}</span>
                  <dim.icon className="w-4 h-4 text-slate-500" />
                </div>
                <div className="text-2xl font-bold text-white">{dim.score}</div>
                <div className="h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      dim.score >= 70 ? 'bg-green-500' : dim.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 问题与优势 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                识别的问题
              </h3>
              <ul className="space-y-3">
                {result.issues.map((issue, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                优势亮点
              </h3>
              <ul className="space-y-3">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 行动建议 */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              行动计划
            </h3>
            <div className="space-y-3">
              {result.actions.map((action, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-300">{action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 产品建议 */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-400" />
              产品结构调整建议
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm font-medium text-green-400 mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 建议主推
                </div>
                <ul className="space-y-1">
                  {result.productSuggestions.promote.map((p, i) => (
                    <li key={i} className="text-sm text-slate-400">{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-medium text-yellow-400 mb-2 flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5" /> 建议优化
                </div>
                <ul className="space-y-1">
                  {result.productSuggestions.optimize.map((p, i) => (
                    <li key={i} className="text-sm text-slate-400">{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-medium text-red-400 mb-2 flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> 建议下架
                </div>
                <ul className="space-y-1">
                  {result.productSuggestions.remove.map((p, i) => (
                    <li key={i} className="text-sm text-slate-400">{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
