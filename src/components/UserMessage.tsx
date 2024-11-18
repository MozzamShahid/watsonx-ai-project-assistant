import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start space-x-4 mb-4">
      <Avatar>
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
        <p className="text-sm">{content}</p>
      </div>
    </div>
  )
}