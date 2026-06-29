import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '门店增长 Agent | 吴旭',
  description: '基于吴旭门店增长方法论的 AI 诊断工具，专注盈利诊断与拓展评估',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-slate-950">{children}</body>
    </html>
  )
}
