'use client'

import { useState } from 'react'
import { MapPin, Users, AlertTriangle, CheckCircle2, Loader2, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExpandInput, ExpandOutput } from '@/types'

const mockOutput: ExpandOutput = {
  score: 75,
  dimensionScores: {
    location: 82,
    market: 70,
    investment: 68,
    risk: 72,
  },
  decision: 'conditional',
  strengths: [
    '位于成熟商圈，日均客流 3000+，消费力较强',
    '周边 500m 内无同品类竞争，开业压力小',
    '地铁出口 200m，交通便利昭示性强',
  ],
  risks: [
    '租金偏高，月租 18000 占预估营收 12%',
    '转让费 8 万，增加前期投入成本',
    '周边餐饮竞争激烈，需差异化定位',
  ],
  suggestions: [
    '建议争取 3 个月免租期，降低前期压力',
    '可考虑外卖 + 堂食双轨模式提升营收',
    '开业前做本地化推广，重点打学生和上班族',
  ],
  paybackPeriod: '18-24 个月',
}

export function ExpandPanel() {
  const [input, setInput] = useState<ExpandInput>({
    storeName: '南京新街口店',
    city: '南京',
    district: '鼓楼区',
    locationType: '商圈',
    expectedRent: '18000',
    expectedArea: '50',
    crowdFlow: '日均客流3000+，早晚高峰明显',
    competitors: '500m内无同品类，但周边餐饮竞争激烈',
    budget: '35',
    experience: '有餐饮经验，加盟过同类品牌',
  })
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle')
  const [result, setResult] = useState<ExpandOutput | null>(null)

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
    <div className="h-full flex flex-col lg:flex-row">
      {/* 左侧输入 */}
      <div className="w-full lg:w-1/2 p-6 border-r border-slate-800">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-1">拓展评估</h2>
          <p className="text-sm text-slate-400">评估新店选址可行性，判断是否值得投资</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">门店名称/编号</label>
            <input
              type="text"
              value={input.storeName}
              onChange={(e) => setInput({ ...input, storeName: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              placeholder="南京新街口店"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">城市</label>
              <input
                type="text"
                value={input.city}
                onChange={(e) => setInput({ ...input, city: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="南京"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">区域</label>
              <input
                type="text"
                value={input.district}
                onChange={(e) => setInput({ ...input, district: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="鼓楼区"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">位置类型</label>
              <select
                value={input.locationType}
                onChange={(e) => setInput({ ...input, locationType: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="商圈">商圈</option>
                <option value="社区">社区</option>
                <option value="学校">学校</option>
                <option value="交通枢纽">交通枢纽</option>
                <option value="步行街">步行街</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">预期面积 (㎡)</label>
              <input
                type="number"
                value={input.expectedArea}
                onChange={(e) => setInput({ ...input, expectedArea: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1.5">预期月租金 (元)</label>
            <input
              type="number"
              value={input.expectedRent}
              onChange={(e) => setInput({ ...input, expectedRent: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              placeholder="18000"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1.5">客流情况</label>
            <textarea
              value={input.crowdFlow}
              onChange={(e) => setInput({ ...input, crowdFlow: e.target.value })}
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
              placeholder="日均客流3000+，早晚高峰明显"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1.5">竞争情况</label>
            <textarea
              value={input.competitors}
              onChange={(e) => setInput({ ...input, competitors: e.target.value })}
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
              placeholder="500m内无同品类，但周边餐饮竞争激烈"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">投资预算 (万)</label>
              <input
                type="number"
                value={input.budget}
                onChange={(e) => setInput({ ...input, budget: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="35"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">行业经验</label>
              <select
                value={input.experience}
                onChange={(e) => setInput({ ...input, experience: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="有餐饮经验，加盟过同类品牌">有经验+同类加盟</option>
                <option value="有餐饮经验，无同类品牌">有经验无同类</option>
                <option value="无餐饮经验，有投资意向">无经验有资金</option>
                <option value="新手初次创业">初次创业</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {status === 'idle' ? (
            <Button onClick={handleAnalyze} className="bg-orange-500 hover:bg-orange-600 text-white">
              开始评估
            </Button>
          ) : status === 'analyzing' ? (
            <Button disabled className="bg-orange-500/50 text-white">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              评估中...
            </Button>
          ) : (
            <Button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 text-white">
              重新评估
            </Button>
          )}
        </div>
      </div>

      {/* 右侧结果 */}
      <div className="w-full lg:w-1/2 p-6 bg-slate-900/50">
        {status === 'idle' ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">填写左侧数据<br />点击"开始评估"获取选址建议</p>
            </div>
          </div>
        ) : status === 'analyzing' ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <Loader2 className="w-12 h-12 text-orange-500 mx-auto mb-3 animate-spin" />
              <p className="text-slate-400">AI 正在评估选址可行性...</p>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-6">
            {/* 综合评分 */}
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="#1e293b" strokeWidth="8" fill="none" />
                  <circle 
                    cx="56" cy="56" r="48" 
                    stroke={result.decision === 'recommend' ? '#22c55e' : result.decision === 'conditional' ? '#f59e0b' : '#ef4444'} 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray={`${result.score * 3.02} 302`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{result.score}</span>
                </div>
              </div>
              <div>
                <div className={`text-lg font-semibold ${
                  result.decision === 'recommend' ? 'text-green-400' :
                  result.decision === 'conditional' ? 'text-yellow-400' :
                  result.decision === 'caution' ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {result.decision === 'recommend' ? '✓ 推荐开店' :
                   result.decision === 'conditional' ? '⚠ 条件推荐' :
                   result.decision === 'caution' ? '⚠ 谨慎考虑' : '✗ 不建议'}
                </div>
                <p className="text-sm text-slate-400 mt-1">预估回本周期：{result.paybackPeriod}</p>
              </div>
            </div>

            {/* 维度评分 */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '选址', score: result.dimensionScores.location },
                { label: '市场', score: result.dimensionScores.market },
                { label: '投资', score: result.dimensionScores.investment },
                { label: '风险', score: result.dimensionScores.risk },
              ].map((dim) => (
                <div key={dim.label} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">{dim.label}</span>
                    <span className="text-sm font-medium text-white">{dim.score}</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 优势 */}
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                优势点
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* 风险 */}
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                风险点
              </h3>
              <ul className="space-y-2">
                {result.risks.map((r, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* 建议 */}
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                行动建议
              </h3>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">{i + 1}.</span>
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
