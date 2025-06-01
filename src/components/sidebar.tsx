'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChatGPTLogo } from '@/components/chatgpt-logo'
import { useUser, useClerk } from '@clerk/nextjs'
import {
  PenSquare,
  MessageSquare,
  MoreHorizontal,
  User,
  Plus,
  Trash2,
  Edit,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  messages: Message[]
}

export function Sidebar({ isOpen, onToggle, messages }: SidebarProps) {
  const { user } = useUser()
  const { signOut } = useClerk()

  // Group messages into conversations (simplified - just using all messages as one conversation)
  const conversations = messages.length > 0 ? [{
    id: '1',
    title: `${messages[0]?.content.slice(0, 30)}...` || 'New conversation',
    lastMessage: messages[messages.length - 1]?.timestamp || new Date(),
    messageCount: messages.length
  }] : []

  return (
    <div
      className={cn(
        "flex flex-col bg-[#171717] text-white transition-all duration-300 ease-in-out border-r border-gray-800",
        isOpen ? "w-80" : "w-0 overflow-hidden",
        "md:relative absolute md:translate-x-0 z-50 h-full",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 px-2">
          <ChatGPTLogo className="text-white" size={24} />
          <span className="text-lg font-semibold text-white">ChatGPT</span>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:text-white"
          onClick={() => window.location.reload()}
        >
          <PenSquare className="h-4 w-4" />
          New chat
        </Button>
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="group flex items-center justify-between rounded-lg p-3 hover:bg-gray-800 cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200 truncate">
                    {conversation.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {conversation.messageCount} messages
                  </p>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}

          {conversations.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">
              No conversations yet
            </div>
          )}
        </div>
      </ScrollArea>

      <Separator className="bg-gray-800" />

      {/* Bottom Section */}
      <div className="p-4">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback className="bg-green-600 text-white text-sm">
              {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-200">
              {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500">Free plan</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={() => signOut()}
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
