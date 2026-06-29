'use client'

import { motion } from 'framer-motion'
import { TrendingUp, MapPin, MessageSquare, BarChart3 } from 'lucide-react'
import { ModuleType } from '@/types'
import { cn } from '@/lib/utils'

interface Module {
  id: ModuleType
  title: string
  description: string
  icon: React.ElementType
}

const modules: Module[] = [
  {
    id: 'profit',
    title: '盈利诊断',
    description: '分析门店盈利状况与改善方向',
    icon: TrendingUp,
  },
  {
    id: 'expand',
    title: '拓展评估',
    description: '新店选址与扩张可行性判断',
    icon: MapPin,
  },
  {
    id: 'chat',
    title: 'AI 对话',
    description: '门店增长问题随时问',
    icon: MessageSquare,
  },
  {
    id: 'dashboard',
    title: '门店看板',
    description: '综合健康度体检与分析',
    icon: BarChart3,
  },
]

interface SidebarProps {
  activeModule: ModuleType
  onModuleChange: (module: ModuleType) => void
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex-shrink-0">
      <div className="mb-6">
        <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">门店增长 Agent</h2>
        <p className="text-sm text-slate-300">吴旭方法论 · AI 版</p>
      </div>
      
      <div className="space-y-1">
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = activeModule === module.id
          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={cn(
                'w-full text-left px-3 py-2.5 rounded-lg transition-colors relative',
                isActive 
                  ? 'bg-orange-500/20 text-orange-400' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <div className="flex items-start gap-2.5">
                <Icon className={cn('w-4 h-4 mt-0.5 flex-shrink-0', isActive ? 'text-orange-500' : 'text-slate-500')} />
                <div className="min-w-0">
                  <div className={cn('text-sm font-medium', isActive && 'text-orange-400')}>{module.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-tight">{module.description}</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">
        <div className="px-3 text-xs text-slate-500">
          <div className="font-medium text-slate-400 mb-2">Powered by</div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500">MiniMax</span>
            <span className="text-slate-600">+</span>
            <span className="text-slate-400">AI</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
