import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Menu, Plus, Wallet, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

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

interface WalletData {
  walletBalance: string;
  totalCreditsEarned: string;
  availableBalance: string;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [location] = useLocation();
  const { toast } = useToast();
  const pageName = pageNames[location] || "InvestIn";

  const { data: walletData } = useQuery<WalletData>({
    queryKey: ["/api/wallet"],
  });

  const addCreditsMutation = useMutation({
    mutationFn: (amount: string) => apiRequest("/api/wallet/add-credits", "POST", { amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallet"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      toast({
        title: "Credits Added!",
        description: "₹5,000 demo credits have been added to your wallet.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add credits. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddFunds = () => {
    addCreditsMutation.mutate("5000"); // Add ₹5,000 demo credits
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{pageName}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-success-light dark:bg-green-900 text-success dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
              <Wallet className="h-4 w-4 mr-2" />
              <span>₹{walletData ? parseFloat(walletData.walletBalance).toLocaleString() : "0"}</span>
            </div>
            
            <Button 
              className="bg-brand-blue text-white hover:bg-blue-600" 
              onClick={handleAddFunds}
              disabled={addCreditsMutation.isPending}
            >
              <Plus className="h-4 w-4 mr-2" />
              {addCreditsMutation.isPending ? "Adding..." : "Add Credits"}
            </Button>
            
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
