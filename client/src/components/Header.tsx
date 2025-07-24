import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Plus, Wallet, User } from "lucide-react";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const pageNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/marketplace": "Marketplace",
  "/movies": "Movies",
  "/ipl-teams": "IPL Teams",
  "/portfolio": "Portfolio",
  "/watchlist": "Watchlist",
  "/transactions": "Transactions",
  "/leaderboard": "Leaderboard",
  "/news": "News",
  "/settings": "Settings",
};

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [location] = useLocation();
  const pageName = pageNames[location] || "InvestIn";

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden -ml-2 mr-2 h-12 w-12"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{pageName}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-success-light text-success px-3 py-1 rounded-full text-sm font-medium">
              <Wallet className="h-4 w-4 mr-2" />
              <span>₹1,25,000</span>
            </div>
            
            <Button className="bg-brand-blue text-white hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Funds
            </Button>
            
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
