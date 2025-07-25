import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Wallet, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import type { Asset } from "@shared/schema";

interface TradingModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
}

interface WalletData {
  walletBalance: string;
  totalCreditsEarned: string;
  availableBalance: string;
}

export default function TradingModal({ asset, isOpen, onClose }: TradingModalProps) {
  const [quantity, setQuantity] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const { toast } = useToast();

  const { data: walletData } = useQuery<WalletData>({
    queryKey: ["/api/wallet"],
  });

  const tradeMutation = useMutation({
    mutationFn: (tradeData: {
      assetId: number;
      type: "BUY" | "SELL";
      quantity: number;
      price: string;
      totalAmount: string;
    }) => apiRequest("/api/transactions", "POST", tradeData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallet"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      
      toast({
        title: `${variables.type === "BUY" ? "Purchase" : "Sale"} Successful!`,
        description: `${variables.type === "BUY" ? "Bought" : "Sold"} ${variables.quantity} ${variables.type === "BUY" ? "shares" : "shares"} of ${asset?.name}`,
      });
      
      onClose();
      setQuantity("1");
    },
    onError: (error: any) => {
      toast({
        title: "Transaction Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  if (!asset) return null;

  const currentPrice = parseFloat(asset.currentPrice);
  const previousPrice = parseFloat(asset.previousPrice);
  const changePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isPositive = changePercent >= 0;
  
  const quantityNum = parseInt(quantity) || 0;
  const totalAmount = (currentPrice * quantityNum).toFixed(2);
  const walletBalance = parseFloat(walletData?.walletBalance || "0");
  const canAfford = walletBalance >= parseFloat(totalAmount);

  const handleTrade = () => {
    if (quantityNum <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity.",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === "buy" && !canAfford) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough credits for this transaction.",
        variant: "destructive",
      });
      return;
    }

    tradeMutation.mutate({
      assetId: asset.id,
      type: activeTab === "buy" ? "BUY" : "SELL",
      quantity: quantityNum,
      price: asset.currentPrice,
      totalAmount,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <img
              src={asset.imageUrl || "https://images.unsplash.com/photo-1489599904632-8421fd8675c2?w=50&h=50"}
              alt={asset.name}
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <div className="text-lg font-semibold">{asset.name}</div>
              <div className="text-sm text-gray-500 font-normal">{asset.symbol} • {asset.category}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Price Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-400">Current Price</Label>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{currentPrice.toLocaleString()}
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-400">24h Change</Label>
                <div className={cn("text-lg font-semibold flex items-center", isPositive ? "text-success" : "text-danger")}>
                  {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {isPositive ? "+" : ""}{changePercent.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="flex items-center">
              <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Wallet Balance</span>
            </div>
            <span className="font-semibold text-blue-900 dark:text-blue-100">
              ₹{walletBalance.toLocaleString()}
            </span>
          </div>

          {/* Trading Tabs */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "buy" | "sell")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy" className="text-success data-[state=active]:bg-success data-[state=active]:text-white">
                Buy
              </TabsTrigger>
              <TabsTrigger value="sell" className="text-danger data-[state=active]:bg-danger data-[state=active]:text-white">
                Sell
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="mt-1"
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Cost</span>
                  <div className="flex items-center">
                    <Calculator className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="font-semibold">₹{parseFloat(totalAmount).toLocaleString()}</span>
                  </div>
                </div>
                {!canAfford && quantityNum > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    Insufficient Balance
                  </Badge>
                )}
              </div>

              <Button
                onClick={handleTrade}
                disabled={tradeMutation.isPending || !canAfford || quantityNum <= 0}
                className="w-full bg-success hover:bg-green-600 text-white"
              >
                {tradeMutation.isPending ? "Processing..." : `Buy ${quantityNum || 0} ${quantityNum === 1 ? "Share" : "Shares"}`}
              </Button>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4">
              <div>
                <Label htmlFor="sell-quantity">Quantity</Label>
                <Input
                  id="sell-quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="mt-1"
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">You'll Receive</span>
                  <div className="flex items-center">
                    <Calculator className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="font-semibold text-success">₹{parseFloat(totalAmount).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleTrade}
                disabled={tradeMutation.isPending || quantityNum <= 0}
                className="w-full bg-danger hover:bg-red-600 text-white"
              >
                {tradeMutation.isPending ? "Processing..." : `Sell ${quantityNum || 0} ${quantityNum === 1 ? "Share" : "Shares"}`}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}