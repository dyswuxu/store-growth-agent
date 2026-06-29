import { NextRequest, NextResponse } from 'next/server'
import { buildProfitPrompt, chatCompletion } from '@/lib/ai'
import { addAnalysisRecord } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { storeName, monthlyRevenue, grossMargin, rent, laborCost, otherCost, location, storeArea, openMonths } = body

    // 构造 prompt
    const prompt = buildProfitPrompt({
      storeName, monthlyRevenue, grossMargin, rent, laborCost, otherCost, location, storeArea, openMonths
    })

    // 调用 AI
    const aiResponse = await chatCompletion([
      { role: 'user', content: prompt }
    ])

    // 解析 AI 返回的 JSON
    let result
    try {
      result = JSON.parse(aiResponse)
    } catch {
      // 如果解析失败，尝试从文本中提取 JSON
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('AI返回格式错误')
      }
    }

    // 记录到数据库
    try {
      addAnalysisRecord('profit', storeName, body, result)
    } catch (e) {
      console.error('数据库记录失败:', e)
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error('Profit API error:', error)
    return NextResponse.json(
      { success: false, error: error.message || '分析失败' },
      { status: 500 }
    )
  }
}
