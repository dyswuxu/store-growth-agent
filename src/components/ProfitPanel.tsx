'use client'

import { useState } from 'react'
import { TrendingUp, AlertTriangle, CheckCircle2, Loader2, History, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProfitInput, ProfitOutput } from '@/types'

export function ProfitPanel() {
  const [input, setInput] = useState<ProfitInput>({
    storeName: '',
    monthlyRevenue: '',
    grossMargin: '',
    rent: '',
    laborCost: '',
    otherCost: '',
    location: '商圈',
    storeArea: '',
    openMonths: '',
  })
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle')
  const [result, setResult] = useState<ProfitOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState<any[]>([])

  const handleAnalyze = async () => {
    if (!input.storeName || !input.monthlyRevenue) {
      setError('请填写门店名称和月营业额')
      return
    }
    setError(null)
    setStatus('analyzing')

    try {
      const res = await fetch('/api/profit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
      const json = await res.json()
      if (json.success) {
        setResult(json.data)
        setStatus('done')
      } else {
        setError(json.error || '分析失败')
        setStatus('idle')
      }
    } catch (e: any) {
      setError(e.message || '网络错误')
      setStatus('idle')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setResult(null)
    setError(null)
  }

  const handleExport = () => {
    if (!result) return
    fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'profit', data: { storeName: input.storeName, ...result } })
    }).then(res => res.text()).then(html => {
      const win = window.open('', '_blank')
      if (win) {
        win.document.write(html)
        win.document.close()
        setTimeout(() => win.print(), 500)
      }
    })
  }

  const loadHistory = async () => {
    const res = await fetch('/api/history?type=analysis&moduleType=profit')
    const json = await res.json()
    if (json.success) setHistory(json.data)
    setShowHistory(true)
  }

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* 左侧输入 */}
      <div className="w-full lg:w-1/2 p-6 border-r border-slate-800 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">盈利诊断</h2>
            <p className="text-sm text-slate-400">输入门店经营数据，AI 分析盈利状况</p>
          </div>
          <button onClick={loadHistory} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <History className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">门店名称 *</label>
            <input type="text" value={input.storeName} onChange={e => setInput({...input, storeName: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" placeholder="输入门店名称" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">月营业额 (元) *</label>
              <input type="number" value={input.monthlyRevenue} onChange={e => setInput({...input, monthlyRevenue: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" placeholder="150000" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">毛利率 (%)</label>
              <input type="number" value={input.grossMargin} onChange={e => setInput({...input, grossMargin: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" placeholder="50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">月租金 (元)</label>
              <input type="number" value={input.rent} onChange={e => setInput({...input, rent: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" placeholder="12000" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">人工成本 (元)</label>
              <input type="number" value={input.laborCost} onChange={e => setInput({...input, laborCost: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" placeholder="22500" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">其他成本 (元)</label>
            <input type="number" value={input.otherCost} onChange={e => setInput({...input, otherCost: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" placeholder="11500" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">位置类型</label>
              <select value={input.location} onChange={e => setInput({...input, location: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500">
                <option value="商圈">商圈</option><option value="社区">社区</option><option value="学校">学校</option>
                <option value="交通枢纽">交通枢纽</option><option value="外卖为主">外卖为主</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">面积 (㎡)</label>
              <input type="number" value={input.storeArea} onChange={e => setInput({...input, storeArea: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" placeholder="60" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">开业月数</label>
              <input type="number" value={input.openMonths} onChange={e => setInput({...input, openMonths: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" placeholder="14" />
            </div>
          </div>
        </div>

        {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}

        <div className="mt-6 flex gap-3">
          {status === 'idle' && <Button onClick={handleAnalyze} className="bg-orange-500 hover:bg-orange-600 text-white">开始分析</Button>}
          {status === 'analyzing' && <Button disabled className="bg-orange-500/50 text-white"><Loader2 className="w-4 h-4 mr-2 animate-spin" />分析中...</Button>}
          {status === 'done' && <Button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 text-white">重新分析</Button>}
          {status === 'done' && <Button onClick={handleExport} className="bg-slate-700 hover:bg-slate-600 text-white gap-2"><Download className="w-4 h-4" />导出PDF</Button>}
        </div>

        {/* 历史记录 */}
        {showHistory && (
          <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-300">历史记录</h3>
              <button onClick={() => setShowHistory(false)} className="text-slate-500 hover:text-slate-300">×</button>
            </div>
            {history.length === 0 ? <p className="text-sm text-slate-500">暂无记录</p> : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {history.map(h => (
                  <button key={h.id} onClick={() => { setInput({...input, ...JSON.parse(h.input_data)}); setResult(JSON.parse(h.output_data)); setStatus('done'); setShowHistory(false); }}
                    className="w-full text-left p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-sm">
                    <div className="text-slate-300">{h.store_name}</div>
                    <div className="text-xs text-slate-500">{new Date(h.created_at).toLocaleString('zh-CN')}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 右侧结果 */}
      <div className="w-full lg:w-1/2 p-6 bg-slate-900/50 overflow-y-auto">
        {status === 'idle' && (
          <div className="h-full flex items-center justify-center text-center">
            <div><TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-400">填写数据后点击分析</p></div>
          </div>
        )}
        {status === 'analyzing' && (
          <div className="h-full flex items-center justify-center text-center">
            <div><Loader2 className="w-12 h-12 text-orange-500 mx-auto mb-3 animate-spin" /><p className="text-slate-400">AI 分析中...</p></div>
          </div>
        )}
        {status === 'done' && result && (
          <div className="space-y-6">
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
            <div className={`rounded-xl p-4 border ${result.status === 'healthy' ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
              <div className="flex items-center gap-2 mb-2">
                {result.status === 'healthy' ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                <span className={`font-medium ${result.status === 'healthy' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {result.status === 'healthy' ? '盈利状况良好' : '存在改善空间'}
                </span>
              </div>
              <p className="text-sm text-slate-300">净利润 <span className="text-white font-semibold">{result.netProfit.toLocaleString()}元</span>，净利率 {result.netProfitRate}%</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500" />识别的问题</h3>
              <ul className="space-y-2">{result.issues.map((issue, i) => <li key={i} className="text-sm text-slate-400 flex items-start gap-2"><span className="text-yellow-500 mt-0.5">•</span>{issue}</li>)}</ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-orange-500" />改善建议</h3>
              <ul className="space-y-2">{result.suggestions.map((s, i) => <li key={i} className="text-sm text-slate-300 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />{s}</li>)}</ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
