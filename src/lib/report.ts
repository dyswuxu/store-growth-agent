// 报告生成器 - 生成 HTML 格式的报告，可直接打印为 PDF

interface ProfitReportData {
  storeName: string
  netProfit: number
  netProfitRate: number
  status: string
  breakdown: {
    revenue: number
    grossProfit: number
    rent: number
    labor: number
    other: number
    netProfit: number
  }
  issues: string[]
  suggestions: string[]
  comparableScore: number
}

interface ExpandReportData {
  storeName: string
  score: number
  dimensionScores: { location: number; market: number; investment: number; risk: number }
  decision: string
  strengths: string[]
  risks: string[]
  suggestions: string[]
  paybackPeriod: string
}

export function generateProfitReport(data: ProfitReportData): string {
  const statusColor = data.status === 'healthy' ? '#22c55e' : data.status === 'warning' ? '#f59e0b' : '#ef4444'
  const statusText = data.status === 'healthy' ? '健康' : data.status === 'warning' ? '需关注' : '预警'
  const createdAt = new Date().toLocaleString('zh-CN')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>盈利诊断报告 - ${data.storeName}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; }
  h1 { font-size: 24px; margin-bottom: 5px; }
  .subtitle { color: #666; font-size: 14px; margin-bottom: 30px; }
  .card { background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
  .metric { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
  .metric:last-child { border-bottom: none; }
  .metric-label { color: #666; }
  .metric-value { font-weight: 600; }
  .metric-value.positive { color: #22c55e; }
  .metric-value.negative { color: #ef4444; }
  .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; color: white; background: ${statusColor}; }
  .section-title { font-size: 16px; font-weight: 600; margin: 20px 0 10px; }
  ul { margin: 0; padding-left: 20px; }
  li { margin: 5px 0; line-height: 1.6; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
<h1>🏪 盈利诊断报告</h1>
<p class="subtitle">${data.storeName} · ${createdAt}</p>

<div class="card">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
    <div>
      <div style="font-size:28px;font-weight:700;">${data.breakdown.revenue.toLocaleString()}<span style="font-size:14px;color:#666;">元/月</span></div>
      <div style="color:#666;font-size:14px;">月营业额</div>
    </div>
    <div style="text-align:right;">
      <span class="status-badge">${statusText}</span>
      <div style="margin-top:8px;font-size:14px;color:#666;">净利率 <strong style="color:#1a1a1a;">${data.netProfitRate}%</strong></div>
    </div>
  </div>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:20px;">
    <div class="metric">
      <span class="metric-label">毛利 (50%)</span>
      <span class="metric-value positive">+${data.breakdown.grossProfit.toLocaleString()}</span>
    </div>
    <div class="metric">
      <span class="metric-label">净利润</span>
      <span class="metric-value positive">${data.breakdown.netProfit.toLocaleString()}</span>
    </div>
    <div class="metric">
      <span class="metric-label">租金</span>
      <span class="metric-value negative">-${data.breakdown.rent.toLocaleString()}</span>
    </div>
    <div class="metric">
      <span class="metric-label">人工</span>
      <span class="metric-value negative">-${data.breakdown.labor.toLocaleString()}</span>
    </div>
    <div class="metric">
      <span class="metric-label">其他成本</span>
      <span class="metric-value negative">-${data.breakdown.other.toLocaleString()}</span>
    </div>
    <div class="metric">
      <span class="metric-label">同类门店排名</span>
      <span class="metric-value">前 ${100 - data.comparableScore}%</span>
    </div>
  </div>
</div>

<div class="section-title">⚠️ 识别的问题</div>
<div class="card">
  <ul>
    ${data.issues.map(i => `<li>${i}</li>`).join('')}
  </ul>
</div>

<div class="section-title">💡 改善建议</div>
<div class="card">
  <ul>
    ${data.suggestions.map(s => `<li>${s}</li>`).join('')}
  </ul>
</div>

<div class="footer">
  由门店增长 Agent 生成 · 基于吴旭方法论 · 仅供参考
</div>
</body>
</html>`
}

export function generateExpandReport(data: ExpandReportData): string {
  const decisionText = {
    'recommend': '推荐开店',
    'conditional': '条件推荐',
    'caution': '谨慎考虑',
    'not-recommend': '不建议'
  }[data.decision]
  const decisionColor = {
    'recommend': '#22c55e',
    'conditional': '#f59e0b',
    'caution': '#f97316',
    'not-recommend': '#ef4444'
  }[data.decision]
  const createdAt = new Date().toLocaleString('zh-CN')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>拓展评估报告 - ${data.storeName}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; }
  h1 { font-size: 24px; margin-bottom: 5px; }
  .subtitle { color: #666; font-size: 14px; margin-bottom: 30px; }
  .card { background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
  .score-circle { width: 100px; height: 100px; border-radius: 50%; border: 6px solid ${decisionColor}; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; margin: 0 auto 15px; }
  .decision { text-align: center; font-size: 18px; font-weight: 600; color: ${decisionColor}; margin-bottom: 20px; }
  .dimension { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; }
  .dim-bar { width: 60%; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden; }
  .dim-fill { height: 100%; background: #f97316; border-radius: 3px; }
  .section-title { font-size: 16px; font-weight: 600; margin: 20px 0 10px; }
  ul { margin: 0; padding-left: 20px; }
  li { margin: 5px 0; line-height: 1.6; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
<h1>📍 拓展评估报告</h1>
<p class="subtitle">${data.storeName} · ${createdAt}</p>

<div class="card">
  <div class="score-circle">${data.score}</div>
  <div class="decision">${decisionText}</div>
  <div style="text-align:center;color:#666;font-size:14px;margin-bottom:20px;">预估回本周期：${data.paybackPeriod}</div>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
    ${['location', 'market', 'investment', 'risk'].map(dim => `
      <div class="dimension">
        <span style="color:#666;font-size:14px;">${dim === 'location' ? '选址' : dim === 'market' ? '市场' : dim === 'investment' ? '投资' : '风险'}</span>
        <span style="font-weight:600;width:30px;text-align:right;">${data.dimensionScores[dim as keyof typeof data.dimensionScores]}</span>
        <div class="dim-bar"><div class="dim-fill" style="width:${data.dimensionScores[dim as keyof typeof data.dimensionScores]}%"></div></div>
      </div>
    `).join('')}
  </div>
</div>

<div class="section-title">✓ 优势点</div>
<div class="card">
  <ul>${data.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
</div>

<div class="section-title">⚠️ 风险点</div>
<div class="card">
  <ul>${data.risks.map(r => `<li>${r}</li>`).join('')}</ul>
</div>

<div class="section-title">💡 行动建议</div>
<div class="card">
  <ul>${data.suggestions.map(s => `<li>${s}</li>`).join('')}</ul>
</div>

<div class="footer">
  由门店增长 Agent 生成 · 基于吴旭方法论 · 仅供参考，投资有风险
</div>
</body>
</html>`
}
