import { NextRequest, NextResponse } from 'next/server'
import { getAnalysisHistory, getChatHistory } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const moduleType = searchParams.get('moduleType')
    const sessionId = searchParams.get('sessionId')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (type === 'chat' && sessionId) {
      const history = getChatHistory(sessionId, limit)
      return NextResponse.json({ success: true, data: history })
    }

    if (type === 'analysis') {
      const history = getAnalysisHistory(moduleType || undefined, limit)
      return NextResponse.json({ success: true, data: history })
    }

    return NextResponse.json({ success: false, error: '参数错误' }, { status: 400 })
  } catch (error: any) {
    console.error('History API error:', error)
    return NextResponse.json(
      { success: false, error: error.message || '获取历史失败' },
      { status: 500 }
    )
  }
}
