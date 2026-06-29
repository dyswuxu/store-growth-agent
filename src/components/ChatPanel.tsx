'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatMessage } from '@/types'

export function ChatPanel() {
  const sessionId = useRef(`session_${Date.now()}`)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: '你好！我是门店增长 Agent，基于吴旭老师的门店增长方法论设计。你可以问我任何关于门店盈利和拓展的问题。', timestamp: Date.now() }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => { scrollToBottom() }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: input.trim(), timestamp: Date.now() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionId.current, messages: [...messages, userMessage] })
      })
      const json = await res.json()
      if (json.success) {
        const assistantMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: json.data.content, timestamp: Date.now() }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        const errorMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: `抱歉，${json.error || '服务出错了'}` , timestamp: Date.now() }
        setMessages(prev => [...prev, errorMsg])
      }
    } catch (e: any) {
      const errorMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: '网络错误，请稍后重试', timestamp: Date.now() }
      setMessages(prev => [...prev, errorMsg])
    }
    setIsLoading(false)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div><h2 className="text-base font-semibold text-white">门店增长 AI 对话</h2><p className="text-xs text-slate-400">基于吴旭方法论的智能顾问</p></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' && <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0"><Sparkles className="w-4 h-4 text-orange-500" /></div>}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-orange-500 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-200 rounded-tl-sm'}`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center"><Sparkles className="w-4 h-4 text-orange-500" /></div><div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3"><Loader2 className="w-4 h-4 text-slate-400 animate-spin" /></div></div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-slate-800">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="输入门店增长相关问题..." className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-orange-500 placeholder-slate-500" />
          <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
