'use client'

import { Plus, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onNewTask: () => void
  onExport: () => void
  onViewExample: () => void
}

export function Header({ onNewTask, onExport, onViewExample }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
          <span className="text-white text-sm font-bold">开</span>
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900">开店增长 Agent</h1>
          <p className="text-xs text-gray-500">招商、选址、开业、复盘的统一增长中枢</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onViewExample} className="gap-1.5">
          <Eye className="w-3.5 h-3.5" />
          查看示例
        </Button>
        <Button variant="outline" size="sm" onClick={onExport} className="gap-1.5">
          <Download className="w-3.5 h-3.5" />
          导出报告
        </Button>
        <Button size="sm" onClick={onNewTask} className="gap-1.5 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-3.5 h-3.5" />
          新建任务
        </Button>
      </div>
    </header>
  )
}