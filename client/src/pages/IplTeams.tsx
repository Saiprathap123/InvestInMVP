import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, TrendingUp, Trophy, Users, Target } from "lucide-react";
import { iplTeamAssets, AssetData } from "../data/assets";
import AssetCard from "../components/AssetCard";
import AssetDetail from "../components/AssetDetail";
import TradingModal from "../components/TradingModal";
import { IVCDisplay } from "../components/IVCLogo";
import { convertAssetDataToTradingAsset } from "../utils/assetConverter";

export default function IplTeams() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedAsset, setSelectedAsset] = useState<AssetData | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeAsset, setTradeAsset] = useState<AssetData | null>(null);

  const handleAssetClick = (asset: AssetData) => {
    setSelectedAsset(asset);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setSelectedAsset(null);
    setViewMode('list');
  };

  const handleTrade = (asset: AssetData) => {
    setTradeAsset(asset);
    setIsTradeModalOpen(true);
  };

  const handleWatchlist = (asset: AssetData) => {
    console.log(`Added ${asset.name} to watchlist`);
  };

  const filteredTeams = iplTeamAssets.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    switch (sortBy) {
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'change-high':
        return b.change - a.change;
      case 'change-low':
        return a.change - b.change;
      default:
        return 0;
    }
  });

  if (viewMode === 'detail' && selectedAsset) {
    return (
      <>
        <AssetDetail
          asset={selectedAsset}
          onBack={handleBackToList}
          onTrade={handleTrade}
          onWatchlist={handleWatchlist}
        />
        <TradingModal
          asset={tradeAsset ? convertAssetDataToTradingAsset(tradeAsset) : null}
          isOpen={isTradeModalOpen}
          onClose={() => {
            setIsTradeModalOpen(false);
            setTradeAsset(null);
          }}
        />
      </>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">IPL Teams</h1>
        <p className="text-gray-600">
          Trade shares of Indian Premier League franchises and follow their performance
        </p>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Teams</p>
                <p className="text-2xl font-bold">{iplTeamAssets.length}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top Performer</p>
                <p className="text-lg font-bold text-green-600">
                  {iplTeamAssets.reduce((prev, current) => 
                    prev.percentChange > current.percentChange ? prev : current
                  ).ticker}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Price</p>
                <IVCDisplay 
                  amount={iplTeamAssets.reduce((sum, asset) => sum + asset.price, 0) / iplTeamAssets.length}
                  size="sm"
                  className="text-lg font-bold"
                />
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Season Status</p>
                <p className="text-2xl font-bold text-orange-600">Off</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search IPL teams by name or ticker..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="change-high">Top Gainers</SelectItem>
            <SelectItem value="change-low">Top Losers</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTeams.map((team) => (
          <AssetCard
            key={team.id}
            asset={team}
            onClick={handleAssetClick}
          />
        ))}
      </div>

      {sortedTeams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No teams found matching your search.</p>
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
