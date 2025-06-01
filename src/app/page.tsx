'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Sidebar } from '@/components/sidebar'
import { ChatArea } from '@/components/chat-area'

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>>([])

  const handleSendMessage = async (content: string) => {
    const userMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user' as const,
      content,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])

    try {
      // Call the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          conversationId: 'current-conversation', // TODO: Use actual conversation ID
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: Math.random().toString(36).substr(2, 9),
          role: 'assistant' as const,
          content: data.message,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        // Handle error
        const aiMessage = {
          id: Math.random().toString(36).substr(2, 9),
          role: 'assistant' as const,
          content: 'Sorry, I encountered an error while processing your message. Please try again.',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const aiMessage = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'assistant' as const,
        content: 'Sorry, I encountered an error while processing your message. Please try again.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
    }
  }

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="flex h-screen bg-white items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Redirect will be handled by middleware, but this is a fallback
  if (!isSignedIn) {
    return (
      <div className="flex h-screen bg-white items-center justify-center">
        <div className="text-gray-600">Redirecting to sign in...</div>
      </div>
    );
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
