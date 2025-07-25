import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";
import { MobileDrawer } from "./MobileDrawer";
import { HeaderActions } from "./HeaderActions";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Left: Menu and Logo */}
          <div className="flex items-center gap-4">
            <MobileDrawer />
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InvestIn
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <HeaderActions />
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}
