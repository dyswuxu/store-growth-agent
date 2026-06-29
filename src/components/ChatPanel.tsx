'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, MessageSquare, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatMessage } from '@/types'

const quickQuestions = [
  '门店毛利率多少算正常？',
  '新店开业前三天怎么做引流？',
  '外卖占比太高怎么调整？',
  '如何提升客单价？',
  '门店亏损应该先抓什么？',
]

const mockResponses: Record<string, string> = {
  '门店毛利率多少算正常？': '正新鸡排类门店的毛利率参考区间：\n\n• 堂食为主：55-65%\n• 外卖为主：45-55%\n• 混合模式：50-60%\n\n低于 45% 需要重点关注，低于 40% 建议立即诊断。\n\n影响毛利率的关键因素：\n1. 原料采购成本控制\n2. 产品出品标准化（减少损耗）\n3. 菜单结构（高毛利产品占比）\n4. 定价策略',
  '新店开业前三天怎么做引流？': '新店开业前三天的引流打法：\n\n**Day 1 - 开业引爆**\n• 门口大气球/拱门，营造氛围\n• 限量 100 份 5 折尝鲜券（必须转发朋友圈）\n• 员工站门口引导路人进店\n\n**Day 2 - 口碑扩散**\n• 推出"打卡送小食"活动\n• 邀请当地美食博主探店\n• 收银台放置好评引导话术\n\n**Day 3 - 复购锁定**\n• 发放 7 天有效期的满减券\n• 引导加入粉丝群/企业微信\n• 记录前 3 天进店顾客手机号做短信召回',
  '如何提升客单价？': '提升客单价的 6 个方法：\n\n1. **套餐化** - 设计 2-3 人套餐，比单点贵 20-30%\n2. **加购推荐** - "再加 5 元换购薯条"类话术\n3. **第二份半价** - 提升联单率\n4. **收银台小货架** - 饮料/小食冲动购买\n5. **满额赠礼** - 满 50 送小礼品\n6. **会员储值** - 充 100 送 10 锁定复购',
}

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是门店增长 Agent，基于吴旭老师的门店增长方法论设计。\n\n我可以帮你分析：\n• 门店盈利状况\n• 选址可行性\n• 经营问题诊断\n• 增长策略建议\n\n有什么门店经营问题，尽管问我。',
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // 模拟 AI 响应
    setTimeout(() => {
      const responseContent = mockResponses[userMessage.content] || 
        `好的，关于"${userMessage.content}"这个问题，我来帮你分析...\n\n这个问题涉及到门店增长的多个方面，建议你：\n\n1. 先在「盈利诊断」模块输入具体数据，获取精准分析\n2. 或者在「AI对话」里继续追问，我可以给你具体的思路\n\n你也可以描述一下你门店的具体情况，比如：\n• 每月营业额大概多少\n• 主要在哪个城市/商圈\n• 外卖和堂食的比例\n\n有了具体数据，我能给你更有针对性的建议。`

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="h-full flex flex-col">
      {/* 顶部 */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">门店增长 AI 对话</h2>
            <p className="text-xs text-slate-400">基于吴旭方法论的智能顾问</p>
          </div>
        </div>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-orange-500" />
              </div>
            )}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-orange-500 text-white rounded-tr-sm' 
                : 'bg-slate-800 text-slate-200 rounded-tl-sm'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
            <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3">
              <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 快捷问题 */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleQuickQuestion(q)}
              className="flex-shrink-0 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-xs text-slate-300 border border-slate-700"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 输入框 */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="输入门店增长相关问题..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 placeholder-slate-500"
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
