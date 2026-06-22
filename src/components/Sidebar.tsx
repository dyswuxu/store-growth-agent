'use client'

import { motion } from 'framer-motion'
import { Users, MapPin, Store, BarChart3 } from 'lucide-react'
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
    id: 'recruitment',
    title: '招商判断助手',
    description: '判断线索质量并给出跟进优先级',
    icon: Users,
  },
  {
    id: 'location',
    title: '选址初筛助手',
    description: '基于商圈与竞品情况评估点位风险',
    icon: MapPin,
  },
  {
    id: 'operation',
    title: '新店运营承接助手',
    description: '识别新店开业阶段的关键问题',
    icon: Store,
  },
  {
    id: 'review',
    title: '月度复盘助手',
    description: '自动提炼月度经营问题与行动项',
    icon: BarChart3,
  },
]

interface SidebarProps {
  activeModule: ModuleType
  onModuleChange: (module: ModuleType) => void
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex-shrink-0">
      <div className="mb-4">
        <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">AI 助手</h2>
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
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <div className="flex items-start gap-2.5">
                  <Icon className={cn('w-4 h-4 mt-0.5 flex-shrink-0', isActive ? 'text-blue-600' : 'text-gray-400')} />
                  <div className="min-w-0">
                    <div className={cn('text-sm font-medium', isActive && 'text-blue-700')}>{module.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-tight">{module.description}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}