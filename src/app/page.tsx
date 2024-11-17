import ChatInterface from "@/components/ChatInterface";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header /> {/* Header takes fixed 64px */}
        <ChatInterface /> {/* Occupies remaining height */}
    </main>
  );
}
