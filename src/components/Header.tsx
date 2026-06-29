'use client'

import { Plus, Download, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onNewTask: () => void
  onExport: () => void
  onViewExample: () => void
}

export function Header({ onNewTask, onExport }: HeaderProps) {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
          <TrendingUpIcon className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-white">门店增长 Agent</h1>
          <p className="text-xs text-slate-400">盈利诊断 · 拓展评估 · AI 对话</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button 
          size="sm" 
          onClick={onExport} 
          className="gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
        >
          <Download className="w-3.5 h-3.5" />
          导出报告
        </Button>
        <Button 
          size="sm" 
          onClick={onNewTask} 
          className="gap-1.5 bg-orange-500 hover:bg-orange-600 text-white border-0"
        >
          <Plus className="w-3.5 h-3.5" />
          新建任务
        </Button>
      </div>
    </header>
  )
}

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  )
}
