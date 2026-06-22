// 模块类型
export type ModuleType = 'recruitment' | 'location' | 'operation' | 'review'

// 状态类型
export type TaskStatus = 'pending' | 'analyzing' | 'generated' | 'exportable'

// 招商线索
export interface RecruitmentInput {
  name: string
  city: string
  intention: 'high' | 'medium' | 'low'
  budget: string
  experience: string
  matchScore: number
}

export interface RecruitmentOutput {
  score: number
  recommendFollowUp: boolean
  riskPoints: string[]
  priority: 'high' | 'medium' | 'low'
  talkPoints: string
  nextStep: string
}

// 选址
export interface LocationInput {
  city: string
  district: string
  rent: string
  area: string
  competitors: number
  crowdMatch: number
  trafficCondition: string
}

export interface LocationOutput {
  score: number
  riskLevel: 'low' | 'medium' | 'high'
  recommendSurvey: boolean
  riskWarnings: string[]
  suggestions: string[]
}

// 新店运营
export interface OperationInput {
  storeName: string
  openDate: string
  prepStatus: string
  day7Performance: string
  day30Performance: string
  day60Performance: string
  issueType: string
}

export interface OperationOutput {
  status: 'good' | 'warning' | 'critical'
  diagnosis: string
  weaknesses: string[]
  improvementActions: string[]
  needHumanIntervention: boolean
}

// 月度复盘
export interface ReviewInput {
  storeName: string
  month: string
  salesPerformance: string
  customerFlow: string
  costPerformance: string
  abnormalEvents: string
  keyActions: string[]
}

export interface ReviewOutput {
  summary: string
  highlights: string[]
  problems: string[]
  nextActions: string[]
  replicableExperiences: string[]
}

// 模块定义
export interface Module {
  id: ModuleType
  title: string
  subtitle: string
  icon: string
  description: string
  inputFields: string[]
}

// 任务记录
export interface TaskRecord {
  id: string
  moduleType: ModuleType
  name: string
  status: TaskStatus
  time: string
}