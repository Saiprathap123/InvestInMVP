import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingUp, TrendingDown, Star, Trophy, Calendar, Activity, Zap, Users } from "lucide-react";
import TradingModal from "@/components/TradingModal";
import AssetCard from "@/components/AssetCard";
import { allAssets, AssetData, mockNewsTicker } from "../data/assets";
import { IVCDisplay } from "../components/IVCLogo";
import { convertAssetDataToTradingAsset } from "../utils/assetConverter";
import { TrendingBar } from "../components/TrendingBar";
import { FlashEventBanner } from "../components/FlashEventBanner";
import { TeluguTraderHallOfFame } from "../components/TeluguTraderHallOfFame";

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeAsset, setTradeAsset] = useState<AssetData | null>(null);

  const [, setLocation] = useLocation();

  const handleAssetClick = (asset: AssetData) => {
    setLocation(`/asset/${asset.id}`);
  };

  const handleTrade = (asset: AssetData) => {
    setTradeAsset(asset);
    setIsTradeModalOpen(true);
  };

  const handleWatchlist = (asset: AssetData) => {
    console.log(`Added ${asset.name} to watchlist`);
  };

  // Filter assets based on search and category
  const filteredAssets = allAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           (selectedCategory === "movies" && asset.category === "Movie") ||
                           (selectedCategory === "ipl" && asset.category === "IPL Team");
    return matchesSearch && matchesCategory;
  });

  // Get trending assets (top performers)
  const trendingAssets = [...allAssets]
    .sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange))
    .slice(0, 4);

  // Get top movers
  const topGainers = [...allAssets]
    .filter(asset => asset.change > 0)
    .sort((a, b) => b.percentChange - a.percentChange)
    .slice(0, 3);

  const topLosers = [...allAssets]
    .filter(asset => asset.change < 0)
    .sort((a, b) => a.percentChange - b.percentChange)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* News Ticker */}
      <div className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-3 overflow-hidden">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 animate-pulse" />
          <div className="flex animate-scroll">
            <span className="text-sm whitespace-nowrap">
              {mockNewsTicker.join(' • ')} • {mockNewsTicker.join(' • ')}
            </span>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold">{allAssets.length}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Movies</p>
                <p className="text-2xl font-bold text-purple-600">
                  {allAssets.filter(a => a.category === 'Movie').length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">IPL Teams</p>
                <p className="text-2xl font-bold text-orange-600">
                  {allAssets.filter(a => a.category === 'IPL Team').length}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Market Status</p>
                <p className="text-2xl font-bold text-green-600">Active</p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>

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

      {/* Top Movers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              Top Gainers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topGainers.map((asset) => (
                <div 
                  key={asset.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleAssetClick(asset)}
                >
                  <div className="flex items-center gap-3">
                    <img src={asset.image} alt={asset.name} className="w-8 h-8 rounded object-cover" />
                    <div>
                      <p className="font-medium text-sm flex items-center gap-2">
                        {asset.ticker}
                        {asset.isFlashEvent && <Zap className="w-3 h-3 text-yellow-500" />}
                        {asset.fanHub && <Users className="w-3 h-3 text-purple-500" />}
                      </p>
                      <p className="text-xs text-gray-600">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <IVCDisplay amount={asset.price} size="sm" />
                    <p className="text-green-600 text-xs font-medium">+{asset.percentChange}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <TrendingDown className="w-5 h-5" />
              Top Losers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topLosers.map((asset) => (
                <div 
                  key={asset.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleAssetClick(asset)}
                >
                  <div className="flex items-center gap-3">
                    <img src={asset.image} alt={asset.name} className="w-8 h-8 rounded object-cover" />
                    <div>
                      <p className="font-medium text-sm flex items-center gap-2">
                        {asset.ticker}
                        {asset.isFlashEvent && <Zap className="w-3 h-3 text-yellow-500" />}
                        {asset.fanHub && <Users className="w-3 h-3 text-purple-500" />}
                      </p>
                      <p className="text-xs text-gray-600">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <IVCDisplay amount={asset.price} size="sm" />
                    <p className="text-red-600 text-xs font-medium">{asset.percentChange}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Flash Events Banner */}
      <div className="mb-8">
        <FlashEventBanner />
      </div>

      {/* Enhanced Trending Bar */}
      <div className="mb-8">
        <TrendingBar />
      </div>

      {/* Telugu Trader Hall of Fame */}
      <div className="mb-8">
        <TeluguTraderHallOfFame />
      </div>

      {/* Trending Assets */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Now</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onClick={handleAssetClick}
              compact={true}
            />
          ))}
        </div>
      </div>

      {/* All Assets Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          All Assets ({filteredAssets.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onClick={handleAssetClick}
            />
          ))}
        </div>
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No assets found matching your search.</p>
        </div>
      )}

      <TradingModal
        asset={tradeAsset ? convertAssetDataToTradingAsset(tradeAsset) : null}
        isOpen={isTradeModalOpen}
        onClose={() => {
          setIsTradeModalOpen(false);
          setTradeAsset(null);
        }}
      />
    </div>
  );
}