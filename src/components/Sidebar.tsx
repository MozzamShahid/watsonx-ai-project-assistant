import { Plus, Trash2 } from "lucide-react";

export function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onDeleteChat,
  onChatClick,
}: {
  chats: { id: string; name: string; messages: { type: string; content: string }[] }[];
  activeChatId: string;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
  onChatClick: (id: string) => void;
}) {
  return (
    <div className="w-64 bg-gray-100 border-r h-screen flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Project Assistant</h1>
      </div>

      {/* Chats List */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center justify-between p-2 rounded-md ${
              activeChatId === chat.id ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-700"
            }`}
          >
            <button
              className="text-left w-full"
              onClick={() => onChatClick(chat.id)}
            >
              {chat.name}
            </button>
            {chat.id !== "default" && (
              <button
                className="p-1 text-gray-500 hover:text-red-500"
                onClick={() => onDeleteChat(chat.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t">
        <button
          className="w-full flex items-center justify-center bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          onClick={onNewChat}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </button>
      </div>
    </div>
  );
}
