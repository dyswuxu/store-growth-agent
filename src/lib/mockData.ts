import {
  RecruitmentInput,
  RecruitmentOutput,
  LocationInput,
  LocationOutput,
  OperationInput,
  OperationOutput,
  ReviewInput,
  ReviewOutput,
} from '@/types'

// ============ 招商判断助手 ============

export const recruitmentExamples: { name: string; input: RecruitmentInput; output: RecruitmentOutput }[] = [
  {
    name: '示例一：优质潜力客户',
    input: {
      name: '张先生',
      city: '杭州',
      intention: 'high',
      budget: '50-80万',
      experience: '3年餐饮经验，经营过奶茶店',
      matchScore: 85,
    },
    output: {
      score: 82,
      recommendFollowUp: true,
      riskPoints: ['加盟意向较高，需关注后续资金验证', '首次接触，尚未实地考察总部'],
      priority: 'high',
      talkPoints: '张先生您好，看了您的资料，您在杭州有3年餐饮经验，对茶饮行业比较熟悉。正新鸡排在浙江有超过500家门店，品牌影响力强，加盟体系成熟。建议您先来总部实地考察，了解供应链和培训体系。',
      nextStep: '邀请参加下周招商说明会，同步发送品牌介绍资料',
    },
  },
  {
    name: '示例二：需谨慎评估客户',
    input: {
      name: '李女士',
      city: '郑州',
      intention: 'medium',
      budget: '20-30万',
      experience: '无餐饮经验，首次创业',
      matchScore: 45,
    },
    output: {
      score: 48,
      recommendFollowUp: true,
      riskPoints: ['预算低于开店最低标准，可能存在资金缺口', '无餐饮经验，运营风险较高', '意向强度中等，转化周期可能较长'],
      priority: 'medium',
      talkPoints: '李女士您好，感谢您对正新鸡排的关注。根据您的情况，建议先了解我们的轻投资方案，或者考虑合伙模式。同时建议您先到附近门店跟岗实习，了解门店日常运营。',
      nextStep: '推荐参加新商培训营，降低运营风险；保持每月1次回访',
    },
  },
]

// ============ 选址初筛助手 ============

export const locationExamples: { name: string; input: LocationInput; output: LocationOutput }[] = [
  {
    name: '示例一：优质点位',
    input: {
      city: '南京',
      district: '建邺区',
      rent: '1.2万/月',
      area: '45㎡',
      competitors: 2,
      crowdMatch: 88,
      trafficCondition: '地铁出口50米，公交站步行2分钟',
    },
    output: {
      score: 78,
      riskLevel: 'low',
      recommendSurvey: true,
      riskWarnings: ['周边2公里已有2家正新门店，需确认商圈保护范围', '租金略高于同类商圈平均水平'],
      suggestions: ['建议尽快安排实地勘址，确认物业条件', '可争取季付租金减轻现金流压力', '重点评估客流动线与门面可见性'],
    },
  },
  {
    name: '示例二：风险点位',
    input: {
      city: '成都',
      district: '郫都区',
      rent: '0.6万/月',
      area: '30㎡',
      competitors: 5,
      crowdMatch: 52,
      trafficCondition: '社区底商，人流量一般',
    },
    output: {
      score: 45,
      riskLevel: 'high',
      recommendSurvey: false,
      riskWarnings: ['周边5家竞品，竞争激烈', '客群匹配度偏低，需确认主力客群', '社区底商周末与工作日客流差异大', '面积偏小，可能影响出品效率'],
      suggestions: ['建议更换备选点位', '如坚持此点位，需差异化定位', '需额外评估外卖覆盖能力'],
    },
  },
]

// ============ 新店运营承接助手 ============

export const operationExamples: { name: string; input: OperationInput; output: OperationOutput }[] = [
  {
    name: '示例一：运营正常',
    input: {
      storeName: '上海虹口龙之梦店',
      openDate: '2026-05-01',
      prepStatus: '完成度95%，培训合格，设备调试完毕',
      day7Performance: '日均营收4200元，完成率105%',
      day30Performance: '日均营收3800元，完成率95%',
      day60Performance: '日均营收4100元，完成率103%',
      issueType: '无明显问题',
    },
    output: {
      status: 'good',
      diagnosis: '新店承接情况良好，各项指标均达标或超预期。开业7天表现亮眼，30天略有回落属正常调整，60天已企稳。门店运营团队稳定，出品质量可控。',
      weaknesses: ['线上评价数量偏少，需加强私域运营', '周末高峰时段排队时间较长'],
      improvementActions: ['启动会员拉新活动，提升复购率', '优化出品流程，缩短等待时间', '加强大众点评运营，提升自然流量'],
      needHumanIntervention: false,
    },
  },
  {
    name: '示例二：需要介入',
    input: {
      storeName: '武汉光谷世界城店',
      openDate: '2026-04-15',
      prepStatus: '完成度70%，培训时间仓促，部分设备未调试',
      day7Performance: '日均营收2800元，完成率70%',
      day30Performance: '日均营收2200元，完成率55%',
      day60Performance: '日均营收1900元，完成率48%',
      issueType: '营收持续下滑，出品质量不稳定',
    },
    output: {
      status: 'critical',
      diagnosis: '新店承接严重不达预期，问题根源在于开业准备不足。培训仓促导致出品质量不稳定，开业后未及时复盘调整，导致问题积累。建议立即介入。',
      weaknesses: ['出品质量不稳定，客户投诉率上升', '门店管理混乱，排班不合理', '营销活动缺失，自然流量不足', '成本控制意识薄弱'],
      improvementActions: ['区域经理驻店支持1周', '重新培训门店核心员工', '梳理门店SOP，严格执行', '启动地推活动提升曝光', '核查成本结构，控制损耗'],
      needHumanIntervention: true,
    },
  },
]

// ============ 月度复盘助手 ============

export const reviewExamples: { name: string; input: ReviewInput; output: ReviewOutput }[] = [
  {
    name: '示例一：表现优异门店',
    input: {
      storeName: '苏州观前街店',
      month: '2026年5月',
      salesPerformance: '月营收18.2万，完成率112%，环比增长8%',
      customerFlow: '月均客流9200人次，客单价19.8元',
      costPerformance: '毛利率62%，费用率28%，净利率34%',
      abnormalEvents: '无食品安全问题，无投诉升级',
      keyActions: ['上线抖音本地团购', '优化午餐时段出品速度', '新增2款套餐组合'],
    },
    output: {
      summary: '门店5月表现超出预期，营收与利润双达标。抖音本地团购带来新增客流，套餐组合提升客单价。成本控制良好，毛利率维持在健康水平。',
      highlights: ['营收完成率112%，创全年新高', '抖音团购带动客流增长15%', '毛利率62%，优于公司平均水平', '零食品安全事故，零投诉升级'],
      problems: ['晚高峰排队时间较长，影响体验', '新品试销反馈收集不及时'],
      nextActions: ['优化晚高峰出品流程', '建立新品反馈快速收集机制', '复制抖音团购经验至其他门店'],
      replicableExperiences: ['抖音本地团购获客模式可复制', '套餐组合定价策略有效，建议推广'],
    },
  },
  {
    name: '示例二：需改善门店',
    input: {
      storeName: '合肥步行街店',
      month: '2026年5月',
      salesPerformance: '月营收10.5万，完成率78%，环比下降5%',
      customerFlow: '月均客流5800人次，客单价18.1元',
      costPerformance: '毛利率55%，费用率35%，净利率20%',
      abnormalEvents: '因油烟投诉被城管约谈1次',
      keyActions: ['尝试直播带货，效果不佳', '下调部分产品价格'],
    },
    output: {
      summary: '门店5月表现低于预期，营收与利润双未达标。直播带货投入产出不成正比，降价策略拉低了毛利率。油烟投诉暴露了门店基础管理问题。',
      highlights: ['尝试新渠道触达客户，态度值得肯定', '老客复购率维持稳定'],
      problems: ['直播带货转化率仅0.8%，ROI为负', '降价导致毛利率下滑7个百分点', '油烟排放超标，基础管理缺失', '客流持续下滑，竞争力不足'],
      nextActions: ['停止无效直播，回归门店精细化运营', '恢复原价，优化套餐组合提升感知价值', '立即整改油烟问题通过环评', '分析竞品调整定价策略', '加强门店基础管理培训'],
      replicableExperiences: ['直播带货模式不适合当前阶段，需谨慎投入', '价格战是双刃剑，应通过价值感而非降价获客'],
    },
  },
]

// 模拟AI生成结果
export function generateRecruitmentResult(input: RecruitmentInput): Promise<RecruitmentOutput> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const example = recruitmentExamples[0]
      resolve(example.output)
    }, 1500)
  })
}

export function generateLocationResult(input: LocationInput): Promise<LocationOutput> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const example = locationExamples[0]
      resolve(example.output)
    }, 1500)
  })
}

export function generateOperationResult(input: OperationInput): Promise<OperationOutput> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const example = operationExamples[0]
      resolve(example.output)
    }, 1500)
  })
}

export function generateReviewResult(input: ReviewInput): Promise<ReviewOutput> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const example = reviewExamples[0]
      resolve(example.output)
    }, 1500)
  })
}