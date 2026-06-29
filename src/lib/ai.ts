const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || ''
const MINIMAX_BASE_URL = 'https://api.minimax.chat/v1'

interface MiniMaxResponse {
  choices?: Array<{
    message: {
      content: string
    }
  }>
  error?: {
    message: string
    type: string
  }
}

export async function chatCompletion(
  messages: Array<{ role: string; content: string }>,
  model = 'MiniMax-Text-01'
): Promise<string> {
  if (!MINIMAX_API_KEY) {
    throw new Error('MINIMAX_API_KEY is not configured')
  }

  const response = await fetch(`${MINIMAX_BASE_URL}/text/chatcompletion_v2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MINIMAX_API_KEY}`
    },
    body: JSON.stringify({
      model,
      messages
    })
  })

  if (!response.ok) {
    throw new Error(`MiniMax API error: ${response.status}`)
  }

  const data: MiniMaxResponse = await response.json()
  
  if (data.error) {
    throw new Error(data.error.message)
  }

  return data.choices?.[0]?.message?.content || ''
}

// 盈利诊断 prompt
export function buildProfitPrompt(input: {
  storeName: string
  monthlyRevenue: string
  grossMargin: string
  rent: string
  laborCost: string
  otherCost: string
  location: string
  storeArea: string
  openMonths: string
}): string {
  return `你是门店盈利诊断专家。基于以下门店数据，进行深度分析并给出专业建议。

门店信息：
- 门店名称：${input.storeName}
- 月营业额：${input.monthlyRevenue}元
- 毛利率：${input.grossMargin}%
- 月租金：${input.rent}元
- 人工成本：${input.laborCost}元
- 其他成本：${input.otherCost}元
- 位置类型：${input.location}
- 面积：${input.storeArea}㎡
- 开业月数：${input.openMonths}个月

请以JSON格式输出分析结果，包含：
{
  "netProfit": 净利润数字,
  "netProfitRate": 净利率数字,
  "status": "healthy/warning/critical"之一,
  "breakdown": { "revenue": 营收, "grossProfit": 毛利, "rent": 租金, "labor": 人工, "other": 其他, "netProfit": 净利润 },
  "issues": ["问题点1", "问题点2", ...],
  "suggestions": ["建议1", "建议2", ...],
  "comparableScore": 0-100的数字
}

只输出JSON，不要其他内容。`
}

// 拓展评估 prompt
export function buildExpandPrompt(input: {
  storeName: string
  city: string
  district: string
  locationType: string
  expectedRent: string
  expectedArea: string
  crowdFlow: string
  competitors: string
  budget: string
  experience: string
}): string {
  return `你是门店选址评估专家。基于以下选址信息，进行可行性分析并给出专业建议。

选址信息：
- 门店名称：${input.storeName}
- 城市：${input.city}
- 区域：${input.district}
- 位置类型：${input.locationType}
- 预期月租金：${input.expectedRent}元
- 预期面积：${input.expectedArea}㎡
- 客流情况：${input.crowdFlow}
- 竞争情况：${input.competitors}
- 投资预算：${input.budget}万元
- 行业经验：${input.experience}

请以JSON格式输出分析结果，包含：
{
  "score": 0-100的综合评分,
  "dimensionScores": { "location": 选址评分, "market": 市场评分, "investment": 投资可行性, "risk": 风险评分 },
  "decision": "recommend/conditional/caution/not-recommend"之一,
  "strengths": ["优势1", "优势2", ...],
  "risks": ["风险1", "风险2", ...],
  "suggestions": ["建议1", "建议2", ...],
  "paybackPeriod": "预估回本周期"
}

只输出JSON，不要其他内容。`
}

// 通用对话 prompt
export function buildChatPrompt(messages: Array<{ role: string; content: string }>): string {
  return `你是吴旭老师的门店增长AI助手，基于吴旭的门店增长方法论回答用户问题。
吴旭方法论的核心是：门店盈利和拓展。
- 盈利：关注净利率、成本结构、坪效、人效、产品结构
- 拓展：关注选址模型、投资回报、竞争分析、扩张节奏

回答要专业、务实、有操作性。结合具体数字给出建议。
保持简洁，不要太长。`
}
