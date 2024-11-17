import Link from "next/link";
import { Waves as WaveIcon } from "lucide-react";

export default function Header() {
  const name = "Mozzam";
  return (
    <header className="bg-blue-500 text-white h-16">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center text-xl font-semibold">
            <WaveIcon className="mr-2 h-6 w-6" />
            Chat App
          </Link>

          {/* Navigation Links */}
          <nav className="hidden space-x-8 md:flex">
            <Link
              href="/chat"
              className="text-white transition-colors hover:font-bold"
            >
              Chat
            </Link>
            <Link
              href="/about"
              className="text-white transition-colors hover:font-bold"
            >
              About Us
            </Link>
            <Link
              href="/docs"
              className="text-white transition-colors hover:font-bold"
            >
              Documentation
            </Link>
            <Link
              href="/contact"
              className="text-white transition-colors hover:font-bold"
            >
              Contact Us
            </Link>
          </nav>

          {/* User Info */}
          <div className="flex items-center gap-2">
            {/* Avatar Placeholder */}
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-sm font-medium">
              M
            </div>
            <div className="flex flex-col items-center">
              <span>Welcome {name} 👋</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
