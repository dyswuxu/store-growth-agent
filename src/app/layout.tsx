import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '开店增长 Agent',
  description: '招商、选址、开业、复盘的统一增长中枢',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}