import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AIMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start space-x-4 mb-4">
      <Avatar>
        <AvatarImage src="/ai-avatar.png" alt="AI" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
        <p className="text-sm">{content}</p>
      </div>
    </div>
  )
}