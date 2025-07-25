import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, TrendingUp, TrendingDown, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import TradingModal from "@/components/TradingModal";
import type { Asset } from "@shared/schema";

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: assets, isLoading } = useQuery<Asset[]>({
    queryKey: ["/api/assets"],
  });

  if (isLoading || !assets) {
    return <MarketplaceSkeleton />;
  }

  // Filter assets based on search and category
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           (selectedCategory === "movies" && asset.type === "movie") ||
                           (selectedCategory === "ipl" && asset.type === "ipl_team");
    return matchesSearch && matchesCategory;
  });

  // Get trending assets (top 4 by price change)
  const trendingAssets = assets
    .map(asset => ({
      ...asset,
      changePercent: ((parseFloat(asset.currentPrice) - parseFloat(asset.previousPrice)) / parseFloat(asset.previousPrice)) * 100
    }))
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filter and Search Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Marketplace</h2>
              <p className="text-gray-600 mt-1">Discover and trade movies and IPL teams</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="movies">Movies</SelectItem>
                  <SelectItem value="ipl">IPL Teams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Assets */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Now</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingAssets.map((asset) => {
            const isPositive = asset.changePercent >= 0;
            return (
              <Card key={asset.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src={asset.imageUrl || "https://images.unsplash.com/photo-1489599904632-8421fd8675c2?w=400&h=600"}
                  alt={asset.name}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{asset.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{asset.category}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{parseFloat(asset.currentPrice).toLocaleString()}
                    </span>
                    <span className={cn("text-sm font-medium flex items-center", isPositive ? "text-success" : "text-danger")}>
                      {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {isPositive ? "+" : ""}{asset.changePercent.toFixed(1)}%
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-brand-blue text-white hover:bg-blue-600"
                    onClick={() => {
                      setSelectedAsset(asset);
                      setIsModalOpen(true);
                    }}
                  >
                    Trade Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Assets Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">All Assets</CardTitle>
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Cap
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssets.map((asset) => {
                  const changePercent = ((parseFloat(asset.currentPrice) - parseFloat(asset.previousPrice)) / parseFloat(asset.previousPrice)) * 100;
                  const isPositive = changePercent >= 0;

                  return (
                    <tr key={asset.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={asset.imageUrl || "https://images.unsplash.com/photo-1489599904632-8421fd8675c2?w=50&h=50"}
                            alt={asset.name}
                            className="w-8 h-8 rounded object-cover mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                            <div className="text-sm text-gray-500">{asset.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {asset.type === "movie" ? "Movie" : "IPL Team"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{parseFloat(asset.currentPrice).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={cn("font-medium", isPositive ? "text-success" : "text-danger")}>
                          {isPositive ? "+" : ""}{changePercent.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{(parseFloat(asset.marketCap) / 10000000).toFixed(1)}Cr
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-brand-blue text-white hover:bg-blue-600"
                            onClick={() => {
                              setSelectedAsset(asset);
                              setIsModalOpen(true);
                            }}
                          >
                            Trade
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <TradingModal
        asset={selectedAsset}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAsset(null);
        }}
      />
    </div>
  );
}

function MarketplaceSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex space-x-3">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="w-full h-64 rounded-t-xl" />
              <CardContent className="p-4">
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-4 w-16 mb-3" />
                <div className="flex justify-between items-center mb-3">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
