'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { WorkflowStrip } from '@/components/WorkflowStrip'
import { TaskPanel } from '@/components/TaskPanel'
import { ResultPanel } from '@/components/ResultPanel'
import { KnowledgePanel } from '@/components/KnowledgePanel'
import { ModuleType, TaskStatus } from '@/types'

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleType>('recruitment')
  const [currentExample, setCurrentExample] = useState(0)
  const [status, setStatus] = useState<TaskStatus>('pending')

  const handleGenerate = () => {
    setStatus('analyzing')
    // Simulate AI processing
    setTimeout(() => {
      setStatus('generated')
    }, 1500)
  }

  const handleNewTask = () => {
    setStatus('pending')
    setCurrentExample(0)
  }

  const handleExport = () => {
    if (status === 'generated' || status === 'exportable') {
      alert('报告导出功能演示：实际会生成 PDF/Word 格式的报告')
    } else {
      alert('请先生成分析结果')
    }
  }

  const handleViewExample = () => {
    alert('当前页面已展示示例数据，点击"示例1/示例2"可切换不同场景')
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header
        onNewTask={handleNewTask}
        onExport={handleExport}
        onViewExample={handleViewExample}
      />
      <WorkflowStrip />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <TaskPanel
              activeModule={activeModule}
              currentExample={currentExample}
              status={status}
              onExampleChange={(index) => {
                setCurrentExample(index)
                setStatus('pending')
              }}
            />
            <ResultPanel
              activeModule={activeModule}
              currentExample={currentExample}
              status={status}
              onGenerate={handleGenerate}
            />
          </div>
        </main>
        <KnowledgePanel activeModule={activeModule} status={status} />
      </div>
    </div>
  )
}