'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Sidebar } from '@/components/sidebar'
import { ChatArea } from '@/components/chat-area'

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth()
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

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to ChatGPT Clone</h1>
          <p className="text-gray-600 mb-6">Please sign in to start chatting</p>
          <a
            href="/sign-in"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    )
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
