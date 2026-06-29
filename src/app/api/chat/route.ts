import { NextRequest, NextResponse } from 'next/server'
import { buildChatPrompt, chatCompletion } from '@/lib/ai'
import { addChatMessage } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId, messages } = body

    if (!sessionId || !messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, error: '参数错误' }, { status: 400 })
    }

    const systemPrompt = buildChatPrompt([])
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ]

    const aiResponse = await chatCompletion(fullMessages)

    // 保存用户消息和AI回复
    try {
      const lastUserMessage = messages[messages.length - 1]
      if (lastUserMessage?.role === 'user') {
        addChatMessage(sessionId, 'user', lastUserMessage.content)
      }
      addChatMessage(sessionId, 'assistant', aiResponse)
    } catch (e) {
      console.error('数据库记录失败:', e)
    }

    return NextResponse.json({ success: true, data: { content: aiResponse } })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { success: false, error: error.message || '对话失败' },
      { status: 500 }
    )
  }
}
