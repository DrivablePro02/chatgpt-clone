'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ChatGPTLogo } from '@/components/chatgpt-logo'
import {
  Menu,
  Share,
  ChevronDown,
  Send,
  Paperclip,
  User,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatAreaProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function ChatArea({ messages, onSendMessage, isSidebarOpen, onToggleSidebar }: ChatAreaProps) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    onSendMessage(input.trim())
    setInput('')
    setIsLoading(true)

    // Reset loading state after AI response
    setTimeout(() => setIsLoading(false), 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const examplePrompts = [
    "Recipe with what's in my kitchen",
    "Quiz me on ancient civilizations",
    "Superhero shark story",
    "Pick outfit to look good on camera"
  ]

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="h-8 w-8 p-0"
          >
            <Menu className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            className="h-8 px-3 text-sm font-medium bg-gray-100 hover:bg-gray-200"
          >
            ChatGPT 4o
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <Share className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="max-w-3xl mx-auto space-y-6 px-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-black flex items-center justify-center">
                <ChatGPTLogo className="text-white" size={40} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                How can I help you today?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {examplePrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    className="p-4 h-auto text-left justify-start border-gray-200 hover:bg-gray-50"
                    onClick={() => onSendMessage(prompt)}
                  >
                    <span className="text-sm text-gray-700">{prompt}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-4",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-black text-white">
                      <ChatGPTLogo className="text-white" size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={cn(
                  "max-w-2xl",
                  message.role === 'user' ? 'order-1' : 'order-2'
                )}>
                  <div
                    className={cn(
                      "rounded-2xl p-4 text-sm",
                      message.role === 'user'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-transparent text-gray-900'
                    )}
                  >
                    {message.content}
                  </div>

                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-gray-500 hover:text-gray-700"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Retry
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700"
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700"
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 mt-1 order-2">
                    <AvatarFallback className="bg-green-600 text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-black text-white">
                  <ChatGPTLogo className="text-white" size={16} />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-2xl">
                <div className="rounded-2xl p-4 text-sm bg-transparent text-gray-900">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message ChatGPT..."
                className="min-h-[52px] max-h-[200px] pr-16 resize-none border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                rows={1}
              />

              <div className="absolute right-2 bottom-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>

                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-8 w-8 p-0 bg-gray-900 hover:bg-gray-800 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>

          <p className="text-xs text-gray-500 text-center mt-2">
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  )
}
