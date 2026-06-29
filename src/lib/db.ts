import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

const DATA_DIR = process.env.NODE_ENV === 'production' 
  ? '/tmp' 
  : path.join(process.cwd(), 'data')

const ANALYSIS_FILE = path.join(DATA_DIR, 'analysis_history.json')
const CHAT_FILE = path.join(DATA_DIR, 'chat_history.json')

export interface HistoryRecord {
  id: number
  module_type: string
  store_name: string
  input_data: object
  output_data: object
  created_at: string
}

export interface ChatRecord {
  id: number
  session_id: string
  role: string
  content: string
  created_at: string
}

function readJson<T>(file: string, defaultVal: T): T {
  try {
    if (existsSync(file)) {
      return JSON.parse(readFileSync(file, 'utf-8'))
    }
  } catch {}
  return defaultVal
}

function writeJson<T>(file: string, data: T): void {
  writeFileSync(file, JSON.stringify(data, null, 2))
}

let analysisData: { records: HistoryRecord[]; nextId: number } = { records: [], nextId: 1 }
let chatData: { records: ChatRecord[]; nextId: number } = { records: [], nextId: 1 }

try {
  analysisData = readJson(ANALYSIS_FILE, { records: [], nextId: 1 })
  chatData = readJson(CHAT_FILE, { records: [], nextId: 1 })
} catch {}

export function addAnalysisRecord(
  moduleType: string,
  storeName: string,
  inputData: object,
  outputData: object
) {
  const record: HistoryRecord = {
    id: analysisData.nextId++,
    module_type: moduleType,
    store_name: storeName,
    input_data: inputData,
    output_data: outputData,
    created_at: new Date().toISOString()
  }
  analysisData.records.unshift(record)
  if (analysisData.records.length > 100) analysisData.records.pop()
  writeJson(ANALYSIS_FILE, analysisData)
  return record
}

export function getAnalysisHistory(moduleType?: string, limit = 20): HistoryRecord[] {
  let records = analysisData.records
  if (moduleType) {
    records = records.filter(r => r.module_type === moduleType)
  }
  return records.slice(0, limit)
}

export function getChatHistory(sessionId: string, limit = 50): ChatRecord[] {
  return chatData.records
    .filter(r => r.session_id === sessionId)
    .slice(-limit)
}

export function addChatMessage(sessionId: string, role: string, content: string) {
  const record: ChatRecord = {
    id: chatData.nextId++,
    session_id: sessionId,
    role,
    content,
    created_at: new Date().toISOString()
  }
  chatData.records.push(record)
  if (chatData.records.length > 500) chatData.records = chatData.records.slice(-500)
  writeJson(CHAT_FILE, chatData)
  return record
}
