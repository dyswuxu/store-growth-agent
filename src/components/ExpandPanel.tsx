'use client'

import { useState } from 'react'
import { MapPin, AlertTriangle, CheckCircle2, Loader2, History, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExpandInput, ExpandOutput } from '@/types'

export function ExpandPanel() {
  const [input, setInput] = useState<ExpandInput>({
    storeName: '',
    city: '',
    district: '',
    locationType: '商圈',
    expectedRent: '',
    expectedArea: '',
    crowdFlow: '',
    competitors: '',
    budget: '',
    experience: '',
  })
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle')
  const [result, setResult] = useState<ExpandOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState<any[]>([])

  const handleAnalyze = async () => {
    if (!input.storeName) { setError('请填写门店名称'); return }
    setError(null)
    setStatus('analyzing')
    try {
      const res = await fetch('/api/expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
      const json = await res.json()
      if (json.success) { setResult(json.data); setStatus('done') }
      else { setError(json.error || '评估失败'); setStatus('idle') }
    } catch (e: any) { setError(e.message || '网络错误'); setStatus('idle') }
  }

  const handleReset = () => { setStatus('idle'); setResult(null); setError(null) }

  const handleExport = () => {
    if (!result) return
    fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'expand', data: { storeName: input.storeName, ...result } })
    }).then(res => res.text()).then(html => {
      const win = window.open('', '_blank')
      if (win) { win.document.write(html); win.document.close(); setTimeout(() => win.print(), 500) }
    })
  }

  const loadHistory = async () => {
    const res = await fetch('/api/history?type=analysis&moduleType=expand')
    const json = await res.json()
    if (json.success) setHistory(json.data)
    setShowHistory(true)
  }

  return (
    <div className="h-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-6 border-r border-slate-800 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div><h2 className="text-lg font-semibold text-white mb-1">拓展评估</h2><p className="text-sm text-slate-400">评估新店选址可行性</p></div>
          <button onClick={loadHistory} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><History className="w-4 h-4" /></button>
        </div>
        <div className="space-y-4">
          <div><label className="block text-sm text-slate-300 mb-1.5">门店名称 *</label>
            <input type="text" value={input.storeName} onChange={e => setInput({...input, storeName: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-slate-300 mb-1.5">城市</label>
              <input type="text" value={input.city} onChange={e => setInput({...input, city: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" /></div>
            <div><label className="block text-sm text-slate-300 mb-1.5">区域</label>
              <input type="text" value={input.district} onChange={e => setInput({...input, district: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-slate-300 mb-1.5">位置类型</label>
              <select value={input.locationType} onChange={e => setInput({...input, locationType: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500">
                <option value="商圈">商圈</option><option value="社区">社区</option><option value="学校">学校</option>
                <option value="交通枢纽">交通枢纽</option><option value="步行街">步行街</option></select></div>
            <div><label className="block text-sm text-slate-300 mb-1.5">预期面积 (㎡)</label>
              <input type="number" value={input.expectedArea} onChange={e => setInput({...input, expectedArea: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" /></div>
          </div>
          <div><label className="block text-sm text-slate-300 mb-1.5">预期月租金 (元)</label>
            <input type="number" value={input.expectedRent} onChange={e => setInput({...input, expectedRent: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" /></div>
          <div><label className="block text-sm text-slate-300 mb-1.5">客流情况</label>
            <textarea value={input.crowdFlow} onChange={e => setInput({...input, crowdFlow: e.target.value})} rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 resize-none" /></div>
          <div><label className="block text-sm text-slate-300 mb-1.5">竞争情况</label>
            <textarea value={input.competitors} onChange={e => setInput({...input, competitors: e.target.value})} rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-slate-300 mb-1.5">投资预算 (万)</label>
              <input type="number" value={input.budget} onChange={e => setInput({...input, budget: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500" /></div>
            <div><label className="block text-sm text-slate-300 mb-1.5">行业经验</label>
              <select value={input.experience} onChange={e => setInput({...input, experience: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500">
                <option value="有餐饮经验，加盟过同类品牌">有经验+同类加盟</option>
                <option value="有餐饮经验，无同类品牌">有经验无同类</option>
                <option value="无餐饮经验，有投资意向">无经验有资金</option>
                <option value="新手初次创业">初次创业</option></select></div>
          </div>
        </div>
        {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}
        <div className="mt-6 flex gap-3">
          {status === 'idle' && <Button onClick={handleAnalyze} className="bg-orange-500 hover:bg-orange-600 text-white">开始评估</Button>}
          {status === 'analyzing' && <Button disabled className="bg-orange-500/50 text-white"><Loader2 className="w-4 h-4 mr-2 animate-spin" />评估中...</Button>}
          {status === 'done' && <Button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 text-white">重新评估</Button>}
          {status === 'done' && <Button onClick={handleExport} className="bg-slate-700 hover:bg-slate-600 text-white gap-2"><Download className="w-4 h-4" />导出PDF</Button>}
        </div>
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
      <div className="w-full lg:w-1/2 p-6 bg-slate-900/50 overflow-y-auto">
        {status === 'idle' && <div className="h-full flex items-center justify-center text-center"><div><MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-400">填写数据后点击评估</p></div></div>}
        {status === 'analyzing' && <div className="h-full flex items-center justify-center text-center"><div><Loader2 className="w-12 h-12 text-orange-500 mx-auto mb-3 animate-spin" /><p className="text-slate-400">AI 评估中...</p></div></div>}
        {status === 'done' && result && (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="#1e293b" strokeWidth="8" fill="none" />
                  <circle cx="56" cy="56" r="48"
                    stroke={result.decision === 'recommend' ? '#22c55e' : result.decision === 'conditional' ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8" fill="none" strokeDasharray={`${result.score * 3.02} 302`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-3xl font-bold text-white">{result.score}</span></div>
              </div>
              <div>
                <div className={`text-lg font-semibold ${result.decision === 'recommend' ? 'text-green-400' : result.decision === 'conditional' ? 'text-yellow-400' : 'text-red-400'}`}>
                  {result.decision === 'recommend' ? '✓ 推荐开店' : result.decision === 'conditional' ? '⚠ 条件推荐' : result.decision === 'caution' ? '⚠ 谨慎考虑' : '✗ 不建议'}
                </div>
                <p className="text-sm text-slate-400 mt-1">预估回本周期：{result.paybackPeriod}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{label:'选址',score:result.dimensionScores.location},{label:'市场',score:result.dimensionScores.market},
                {label:'投资',score:result.dimensionScores.investment},{label:'风险',score:result.dimensionScores.risk}].map(dim => (
                <div key={dim.label} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <div className="flex items-center justify-between mb-1"><span className="text-xs text-slate-400">{dim.label}</span><span className="text-sm font-medium text-white">{dim.score}</span></div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-orange-500 rounded-full" style={{width:`${dim.score}%`}} /></div>
                </div>
              ))}
            </div>
            <div><h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" />优势点</h3>
              <ul className="space-y-2">{result.strengths.map((s,i) => <li key={i} className="text-sm text-slate-400 flex items-start gap-2"><span className="text-green-500 mt-0.5">•</span>{s}</li>)}</ul></div>
            <div><h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500" />风险点</h3>
              <ul className="space-y-2">{result.risks.map((r,i) => <li key={i} className="text-sm text-slate-400 flex items-start gap-2"><span className="text-yellow-500 mt-0.5">•</span>{r}</li>)}</ul></div>
            <div><h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">💡 行动建议</h3>
              <ul className="space-y-2">{result.suggestions.map((s,i) => <li key={i} className="text-sm text-slate-300 flex items-start gap-2"><span className="text-orange-500 mt-0.5">{i+1}.</span>{s}</li>)}</ul></div>
          </div>
        )}
      </div>
    </div>
  )
}
