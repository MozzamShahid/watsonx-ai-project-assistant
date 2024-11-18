'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sidebar } from '@/components/Sidebar'
import { UserMessage } from '@/components/UserMessage'
import { AIMessage } from '@/components/AIMessage'
import axios from 'axios'
import { Upload, Send } from 'lucide-react'
import { getQuery } from '@/actions/query_action'

type Message = { type: 'user' | 'ai'; content: string }

export default function ChatInterface() {
  const [chats, setChats] = useState<{ id: string; name: string; messages: Message[] }[]>([
    { id: 'default', name: 'Default Chat', messages: [] },
  ])
  const [activeChatId, setActiveChatId] = useState<string>('default')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const hasStartedChat = activeChat && activeChat.messages && activeChat.messages.length > 0
  const shouldShowIntro = input.trim() === '' && !hasStartedChat

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !activeChat || isLoading) return

    const userMessage: Message = { type: 'user', content: input }
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat
      )
    )
    setInput('')
    setIsLoading(true)

    try {
      const response = await getQuery(input) 
        if(response.status==200) {
              const aiMessage: Message = { type: 'ai', content: response.data.response }
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === activeChatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat
            )
          )
        } 
        
      
    } catch (error) {
      console.error('Error querying AI:', error)
      const errorMessage: Message = { type: 'ai', content: 'Sorry, I encountered an error. Please try again.' }
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && activeChat) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        const aiMessage: Message = { type: 'ai', content: response.data.message }
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === activeChatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat
          )
        )
      } catch (error) {
        console.error('Error uploading file:', error)
        const errorMessage: Message = { type: 'ai', content: 'Sorry, I encountered an error uploading the file. Please try again.' }
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === activeChatId ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
          )
        )
      }
    }
  }

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`
    const newChat = { id: newChatId, name: 'New Chat', messages: [] }
    setChats((prevChats) => [...prevChats, newChat])
    setActiveChatId(newChatId)
  }

  const handleDeleteChat = (id: string) => {
    if (id === 'default') return
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id))
    if (activeChatId === id) {
      setActiveChatId('default')
    }
  }

  const handleChatClick = (id: string) => {
    setActiveChatId(id)
  }

  return (
    <div className="flex h-[calc(100vh-100px)] bg-white">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        onChatClick={handleChatClick}
      />
      <div className="flex flex-col flex-1 bg-white">
        {shouldShowIntro && (
          <div className="flex flex-col items-center justify-center p-6 text-gray-700">
            <h2 className="mb-4 text-lg font-semibold">Our Chat System is Specialised in:</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 p-2 border rounded-lg shadow-sm">
                <span className="text-sm font-medium">Document Generation</span>
              </div>
              <div className="flex items-center gap-2 p-2 border rounded-lg shadow-sm">
                <span className="text-sm font-medium">Impact Analysis</span>
              </div>
              <div className="flex items-center gap-2 p-2 border rounded-lg shadow-sm">
                <span className="text-sm font-medium">WBS Generator</span>
              </div>
              <div className="flex items-center gap-2 p-2 border rounded-lg shadow-sm">
                <span className="text-sm font-medium">Meeting Simulation</span>
              </div>
              <div className="flex items-center gap-2 p-2 border rounded-lg shadow-sm">
                <span className="text-sm font-medium">Scope Validation</span>
              </div>
            </div>
          </div>
        )}
        <ScrollArea className="flex-1 p-4">
          {activeChat?.messages.map((message, index) => (
            message.type === 'user' ? (
              <UserMessage key={index} content={message.content} />
            ) : (
              <AIMessage key={index} content={message.content} />
            )
          ))}
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex items-center p-4 border-t">
          <div className="relative">
            <Button type="button" size="icon" variant="outline">
              <Upload className="h-4 w-4" />
            </Button>
            <Input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleUpload}
            />
          </div>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 mx-4"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}