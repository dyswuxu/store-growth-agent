'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { ProfitPanel } from '@/components/ProfitPanel'
import { ExpandPanel } from '@/components/ExpandPanel'
import { ChatPanel } from '@/components/ChatPanel'
import { DashboardPanel } from '@/components/DashboardPanel'
import { ModuleType } from '@/types'

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleType>('profit')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleNewTask = () => {
    setRefreshKey(k => k + 1)
  }

  const handleExport = () => {
    alert('报告导出功能开发中...')
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'profit':
        return <ProfitPanel key={refreshKey} />
      case 'expand':
        return <ExpandPanel key={refreshKey} />
      case 'chat':
        return <ChatPanel key={refreshKey} />
      case 'dashboard':
        return <DashboardPanel key={refreshKey} />
      default:
        return <ProfitPanel key={refreshKey} />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      <Header
        onNewTask={handleNewTask}
        onExport={handleExport}
        onViewExample={() => {}}
      />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        <main className="flex-1 overflow-y-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  )
}
