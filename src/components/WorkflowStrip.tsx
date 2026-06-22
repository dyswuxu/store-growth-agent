'use client'

import { motion } from 'framer-motion'
import { Globe, Cpu, Layers, Database } from 'lucide-react'

const steps = [
  { icon: Globe, label: '网页访问' },
  { icon: Cpu, label: '开店增长 Agent' },
  { icon: Layers, label: '四大 AI 助手' },
  { icon: Database, label: '数据与知识库' },
  { icon: Database, label: '生成结果' },
]

export function WorkflowStrip() {
  return (
    <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={index} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-1.5"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-xs text-gray-600 font-medium">{step.label}</span>
              </motion.div>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-gray-300 mx-2" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}