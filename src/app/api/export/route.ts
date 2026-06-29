import { NextRequest, NextResponse } from 'next/server'
import { generateProfitReport, generateExpandReport } from '@/lib/report'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    let html: string
    if (type === 'profit') {
      html = generateProfitReport(data)
    } else if (type === 'expand') {
      html = generateExpandReport(data)
    } else {
      return NextResponse.json({ success: false, error: '未知的报告类型' }, { status: 400 })
    }

    // 返回 HTML，浏览器可以打印为 PDF
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      }
    })
  } catch (error: any) {
    console.error('Export API error:', error)
    return NextResponse.json(
      { success: false, error: error.message || '导出失败' },
      { status: 500 }
    )
  }
}
