import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Trash2 } from 'lucide-react'

type Chat = {
  id: string
  name: string
  messages: { type: 'user' | 'ai'; content: string }[]
}

type SidebarProps = {
  chats: Chat[]
  activeChatId: string
  onNewChat: () => void
  onDeleteChat: (id: string) => void
  onChatClick: (id: string) => void
}

export function Sidebar({ chats, activeChatId, onNewChat, onDeleteChat, onChatClick }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-100 border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Project Assistant</h1>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {chats.map((chat) => (
            <div key={chat.id} className="flex items-center justify-between">
              <Button
                variant={chat.id === activeChatId ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => onChatClick(chat.id)}
              >
                {chat.name}
              </Button>
              {chat.id !== 'default' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteChat(chat.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button className="w-full" onClick={onNewChat}>
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
    </div>
  )
}