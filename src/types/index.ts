// 模块类型
export type ModuleType = 'profit' | 'expand' | 'chat' | 'dashboard'

// 状态类型
export type TaskStatus = 'idle' | 'analyzing' | 'done'

// ============ 盈利诊断 ============
export interface ProfitInput {
  storeName: string
  monthlyRevenue: string      // 月营业额
  grossMargin: string         // 毛利率 %
  rent: string               // 月租金
  laborCost: string          // 人工成本
  otherCost: string          // 其他成本
  location: string           // 位置类型（商圈/社区/学校/交通枢纽/外卖为主）
  storeArea: string           // 面积
  openMonths: string          // 开业月数
}

export interface ProfitOutput {
  netProfit: number           // 净利润
  netProfitRate: number       // 净利率
  status: 'healthy' | 'warning' | 'critical'
  breakdown: {
    revenue: number
    grossProfit: number
    rent: number
    labor: number
    other: number
    netProfit: number
  }
  issues: string[]           // 问题点
  suggestions: string[]      // 改善建议
  comparableScore: number    // 同类门店比较 (0-100)
}

// ============ 拓展评估 ============
export interface ExpandInput {
  storeName: string
  city: string               // 城市
  district: string           // 区域
  locationType: string       // 位置类型
  expectedRent: string       // 预期租金
  expectedArea: string        // 预期面积
  crowdFlow: string          // 人流/客流
  competitors: string        // 竞争对手情况
  budget: string             // 投资预算
  experience: string          // 行业经验
}

export interface ExpandOutput {
  score: number              // 综合评分 0-100
  dimensionScores: {
    location: number         // 选址评分
    market: number           // 市场评分
    investment: number       // 投资可行性
    risk: number             // 风险评分
  }
  decision: 'recommend' | 'conditional' | 'caution' | 'not-recommend'
  strengths: string[]        // 优势点
  risks: string[]            // 风险点
  suggestions: string[]      // 建议
  paybackPeriod: string      // 回本周期预估
}

// ============ 门店体检 ============
export interface StoreHealthInput {
  storeName: string
  salesData: {
    monthlySales: string[]   // 近6月营业额
    peakHourSales: string    // 峰值时段销量
    offHourSales: string     // 低峰时段销量
  }
  productData: {
    topProducts: string[]    // 爆品/畅销品
    lowMarginProducts: string[] // 低毛利产品
    staleProducts: string[]  // 滞销产品
  }
  customerData: {
    dailyTraffic: string    // 日均客流
    repeatRate: string       // 复购率
    avgOrderValue: string    // 客单价
  }
  costData: {
    grossMargin: string      // 毛利率
    rentPerSqm: string        // 租金/平米
    laborRatio: string       // 人工占比
  }
}

export interface StoreHealthOutput {
  overallScore: number       // 综合健康度 (0-100)
  quadrant: 'stars' | 'cashCows' | 'questionMarks' | 'dogs'  // 四象限
  dimensions: {
    sales: number            // 销售能力
    product: number          // 产品结构
    customer: number         // 客户运营
    cost: number             // 成本控制
  }
  healthStatus: 'healthy' | 'attention' | 'warning' | 'critical'
  issues: string[]           // 问题清单
  strengths: string[]        // 优势清单
  actions: string[]          // 行动建议
  productSuggestions: {
    promote: string[]        // 建议主推
    optimize: string[]        // 建议优化
    remove: string[]         // 建议下架
  }
}

// ============ AI对话消息 ============
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// ============ 任务记录 ============
export interface TaskRecord {
  id: string
  moduleType: ModuleType
  storeName: string
  status: TaskStatus
  time: string
}
