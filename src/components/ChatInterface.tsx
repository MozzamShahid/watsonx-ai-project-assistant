"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Upload, Send } from "lucide-react";

type Message = { type: "user"; content: string } | { type: "ai"; content: string };

export default function ChatInterface() {
  const [chats, setChats] = useState<{ id: string; name: string; messages: Message[] }[]>([
    { id: "default", name: "Default Chat", messages: [] }, // Default chat is always available
  ]);
  const [activeChatId, setActiveChatId] = useState<string>("default");
  const [input, setInput] = useState("");

  const activeChat = chats.find((chat) => chat.id === activeChatId); // Find the active chat
  const hasStartedChat = activeChat && activeChat.messages && activeChat.messages.length > 0;
  const shouldShowIntro = input.trim() === "" && !hasStartedChat; // Show intro if no input and no messages

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeChat) return;

    const userMessage: Message = { type: "user", content: input };
    const aiResponse: Message = { type: "ai", content: "Simulated AI response." };

    // Update active chat messages
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, userMessage, aiResponse] }
          : chat
      )
    );
    setInput(""); // Clear input field
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeChat) {
      const userMessage: Message = { type: "user", content: `Uploaded: ${file.name}` };
      const aiResponse: Message = {
        type: "ai",
        content: `Processing the uploaded file: ${file.name}`,
      };

      // Update active chat messages with uploaded file information
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, userMessage, aiResponse] }
            : chat
        )
      );
      e.target.value = ""; // Reset the input field
    }
  };

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = { id: newChatId, name: "New Chat", messages: [] };
    setChats((prevChats) => [...prevChats, newChat]);
    setActiveChatId(newChatId); // Switch to the new chat
  };

  const handleDeleteChat = (id: string) => {
    if (id === "default") return; // Default chat cannot be deleted
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));

    // If the active chat is deleted, switch to the default chat
    if (activeChatId === id) {
      setActiveChatId("default");
    }
  };

  const handleChatClick = (id: string) => {
    setActiveChatId(id);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] bg-white">
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        onChatClick={handleChatClick}
      />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 bg-white">
        {/* Intro Section */}
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

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeChat?.messages.map((message, index) => (
            <div key={index} className="flex items-start gap-3 mb-4">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold ${
                  message.type === "user" ? "bg-blue-500" : "bg-gray-400"
                }`}
              >
                {message.type === "user" ? "U" : "AI"}
              </div>
              <div
                className={`p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <form onSubmit={handleSendMessage} className="flex items-center p-4 border-t">
          {/* Upload Button */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200"
            >
              <Upload className="h-5 w-5 text-gray-500" />
            </button>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleUpload}
            />
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 mx-4 border px-4 py-2 rounded"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
