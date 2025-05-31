'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { ChatArea } from '@/components/chat-area'

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>>([])

  const handleSendMessage = (content: string) => {
    const userMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user' as const,
      content,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'assistant' as const,
        content: `I understand you said: "${content}". This is a simulated response from the AI assistant. In a real implementation, this would connect to an actual AI service.`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-white relative">
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        messages={messages}
      />
      <ChatArea
        messages={messages}
        onSendMessage={handleSendMessage}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    </div>
  )
}
