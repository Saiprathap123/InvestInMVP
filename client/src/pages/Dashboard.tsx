import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PieChart,
  TrendingUp,
  Layers,
  Wallet,
  Eye,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardData {
  portfolio: {
    total: string;
    todayPL: string;
    plPercentage: string;
    activeAssets: number;
    balance: string;
  };
  topPerformers: Array<{
    id: number;
    asset: {
      name: string;
      type: string;
      currentPrice: string;
      imageUrl: string;
      category: string;
    };
    quantity: number;
    averagePrice: string;
  }>;
  watchlist: Array<{
    id: number;
    asset: {
      name: string;
      type: string;
      currentPrice: string;
      previousPrice: string;
      imageUrl: string;
      category: string;
    };
  }>;
  recentTransactions: Array<{
    id: number;
    type: string;
    quantity: number;
    price: string;
    createdAt: string;
    status: string;
    asset: {
      name: string;
      type: string;
      imageUrl: string;
    };
  }>;
}

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
  });

  if (isLoading || !dashboardData) {
    return <DashboardSkeleton />;
  }

  const { portfolio, topPerformers, watchlist, recentTransactions } = dashboardData;
  const isPLPositive = parseFloat(portfolio.todayPL) >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Portfolio</p>
                <p className="text-2xl font-bold text-gray-900">₹{parseFloat(portfolio.total).toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-brand-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                <PieChart className="h-6 w-6 text-brand-blue" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={cn("text-sm font-medium", isPLPositive ? "text-success" : "text-danger")}>
                {isPLPositive ? "+" : ""}{portfolio.plPercentage}%
              </span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's P&L</p>
                <p className={cn("text-2xl font-bold", isPLPositive ? "text-success" : "text-danger")}>
                  {isPLPositive ? "+" : ""}₹{Math.abs(parseFloat(portfolio.todayPL)).toLocaleString()}
                </p>
              </div>
              <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center", isPLPositive ? "bg-success bg-opacity-10" : "bg-danger bg-opacity-10")}>
                <TrendingUp className={cn("h-6 w-6", isPLPositive ? "text-success" : "text-danger")} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={cn("text-sm font-medium", isPLPositive ? "text-success" : "text-danger")}>
                {isPLPositive ? "+" : ""}{portfolio.plPercentage}%
              </span>
              <span className="text-gray-500 text-sm ml-2">today</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Assets</p>
                <p className="text-2xl font-bold text-gray-900">{portfolio.activeAssets}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Layers className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-gray-500 text-sm">Movies & IPL Teams</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-gray-900">₹{parseFloat(portfolio.balance).toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="link" className="text-brand-blue p-0 h-auto font-medium">
                Add more funds
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers and Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Top Performers</CardTitle>
            <p className="text-sm text-gray-600">Your best performing assets</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((item) => {
              const currentValue = parseFloat(item.asset.currentPrice) * item.quantity;
              const investedValue = parseFloat(item.averagePrice) * item.quantity;
              const gainPercent = ((currentValue - investedValue) / investedValue) * 100;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.asset.imageUrl}
                      alt={item.asset.name}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{item.asset.name}</h4>
                      <p className="text-sm text-gray-600">{item.asset.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{parseFloat(item.asset.currentPrice).toLocaleString()}</p>
                    <p className="text-sm text-success">+{gainPercent.toFixed(1)}%</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Watchlist</CardTitle>
            <p className="text-sm text-gray-600">Assets you're tracking</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {watchlist.map((item) => {
              const currentPrice = parseFloat(item.asset.currentPrice);
              const previousPrice = parseFloat(item.asset.previousPrice);
              const changePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
              const isPositive = changePercent >= 0;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.asset.imageUrl}
                      alt={item.asset.name}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{item.asset.name}</h4>
                      <p className="text-sm text-gray-600">{item.asset.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{currentPrice.toLocaleString()}</p>
                    <p className={cn("text-sm font-medium", isPositive ? "text-success" : "text-danger")}>
                      {isPositive ? "+" : ""}{changePercent.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Your latest trading activity</p>
            </div>
            <Button variant="link" className="text-brand-blue font-medium">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={transaction.asset.imageUrl}
                          alt={transaction.asset.name}
                          className="w-8 h-8 rounded object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{transaction.asset.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{transaction.asset.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                          transaction.type === "BUY"
                            ? "bg-success-light text-success"
                            : "bg-danger-light text-danger"
                        )}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{parseFloat(transaction.price).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center space-x-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
