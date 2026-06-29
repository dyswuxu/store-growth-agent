import { NextRequest, NextResponse } from 'next/server'
import { buildExpandPrompt, chatCompletion } from '@/lib/ai'
import { addAnalysisRecord } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { storeName, city, district, locationType, expectedRent, expectedArea, crowdFlow, competitors, budget, experience } = body

    const prompt = buildExpandPrompt({
      storeName, city, district, locationType, expectedRent, expectedArea, crowdFlow, competitors, budget, experience
    })

    const aiResponse = await chatCompletion([
      { role: 'user', content: prompt }
    ])

    let result
    try {
      result = JSON.parse(aiResponse)
    } catch {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('AI返回格式错误')
      }
    }

    try {
      addAnalysisRecord('expand', storeName, body, result)
    } catch (e) {
      console.error('数据库记录失败:', e)
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error('Expand API error:', error)
    return NextResponse.json(
      { success: false, error: error.message || '评估失败' },
      { status: 500 }
    )
  }
}
