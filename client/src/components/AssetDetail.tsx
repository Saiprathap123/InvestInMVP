import { ArrowLeft, TrendingUp, TrendingDown, Plus, Eye, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { IVCDisplay } from './IVCLogo';
import { AssetData } from '../data/assets';
import { Badge } from './ui/badge';

interface AssetDetailProps {
  asset: AssetData;
  onBack: () => void;
  onTrade: (asset: AssetData) => void;
  onWatchlist: (asset: AssetData) => void;
}

export default function AssetDetail({ asset, onBack, onTrade, onWatchlist }: AssetDetailProps) {
  const isPositive = asset.change >= 0;
  const changeColor = isPositive ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <img 
              src={asset.image} 
              alt={asset.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-gray-600">{asset.ticker}</span>
                <Badge variant="secondary">{asset.category}</Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onWatchlist(asset)} className="gap-2">
            <Eye className="w-4 h-4" />
            Add to Watchlist
          </Button>
          <Button onClick={() => onTrade(asset)} className="gap-2 bg-blue-600 hover:bg-blue-700">
            Trade Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price and Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <IVCDisplay amount={asset.price} size="lg" className="text-3xl font-bold" />
                  <div className={`flex items-center gap-2 mt-2 px-3 py-1 rounded-full ${changeColor}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="font-medium">
                      {isPositive ? '+' : ''}{asset.change} ({asset.percentChange}%)
                    </span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>Market Cap: <span className="font-medium">{asset.marketCap}</span></p>
                  <p>Volume: <span className="font-medium">{asset.volume}</span></p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Enhanced Chart */}
              <div className="h-64 flex items-end justify-between gap-2 mb-4">
                {asset.chartData.map((value, index) => {
                  const maxValue = Math.max(...asset.chartData);
                  const minValue = Math.min(...asset.chartData);
                  const normalizedHeight = ((value - minValue) / (maxValue - minValue)) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={`w-full rounded-t-sm transition-all hover:opacity-80 ${
                          isPositive ? 'bg-green-400' : 'bg-red-400'
                        }`}
                        style={{ height: `${Math.max(normalizedHeight, 10)}%` }}
                        title={`Day ${index + 1}: ${value} IVC`}
                      />
                      <span className="text-xs text-gray-500">D{index + 1}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>9 Days Performance</span>
                <span>Current Trend: {isPositive ? 'Bullish' : 'Bearish'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About {asset.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {asset.description}
              </p>
            </CardContent>
          </Card>

          {/* News Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Latest News & Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {asset.newsFeed.map((news, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{news.headline}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{news.date}</span>
                          {news.source && (
                            <>
                              <span>•</span>
                              <span>{news.source}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-2">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price</span>
                <IVCDisplay amount={asset.price} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Day Change</span>
                <span className={isPositive ? 'text-green-600' : 'text-red-500'}>
                  {isPositive ? '+' : ''}{asset.change}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Day Change %</span>
                <span className={isPositive ? 'text-green-600' : 'text-red-500'}>
                  {asset.percentChange}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Market Cap</span>
                <span className="font-medium">{asset.marketCap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volume</span>
                <span className="font-medium">{asset.volume}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => onTrade(asset)} className="w-full bg-blue-600 hover:bg-blue-700">
                Trade {asset.ticker}
              </Button>
              <Button variant="outline" onClick={() => onWatchlist(asset)} className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add to Watchlist
              </Button>
            </CardContent>
          </Card>

          {/* Similar Assets */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Discover other {asset.category === 'Movie' ? 'movies' : 'IPL teams'} to invest in.
              </p>
              <Button variant="link" className="p-0 h-auto mt-2 text-blue-600">
                View all {asset.category === 'Movie' ? 'Movies' : 'IPL Teams'} →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}