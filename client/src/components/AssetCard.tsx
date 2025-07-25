import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { IVCDisplay } from './IVCLogo';
import { AssetData } from '../data/assets';

interface AssetCardProps {
  asset: AssetData;
  onClick: (asset: AssetData) => void;
  compact?: boolean;
}

export default function AssetCard({ asset, onClick, compact = false }: AssetCardProps) {
  const isPositive = asset.change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-500';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  if (compact) {
    return (
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow border-gray-200 hover:border-gray-300"
        onClick={() => onClick(asset)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={asset.image} 
                alt={asset.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{asset.ticker}</h3>
                <p className="text-xs text-gray-600 truncate max-w-32">{asset.name}</p>
              </div>
            </div>
            <div className="text-right">
              <IVCDisplay amount={asset.price} size="sm" className="font-semibold" />
              <div className={`flex items-center gap-1 text-xs ${changeColor}`}>
                <TrendIcon className="w-3 h-3" />
                {isPositive ? '+' : ''}{asset.change} ({asset.percentChange}%)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-gray-300 hover:scale-[1.02]"
      onClick={() => onClick(asset)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={asset.image} 
            alt={asset.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2">
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
              {asset.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{asset.ticker}</h3>
              <p className="text-sm text-gray-600 line-clamp-1">{asset.name}</p>
            </div>
          </div>

          <div className="mb-3">
            <IVCDisplay amount={asset.price} size="lg" className="font-bold text-xl" />
            <div className={`flex items-center gap-1 mt-1 ${changeColor}`}>
              <TrendIcon className="w-4 h-4" />
              <span className="font-medium">
                {isPositive ? '+' : ''}{asset.change} ({asset.percentChange}%)
              </span>
            </div>
          </div>

          {/* Mini Chart */}
          <div className="mb-3">
            <div className="h-16 flex items-end justify-between gap-1">
              {asset.chartData.map((value, index) => {
                const maxValue = Math.max(...asset.chartData);
                const minValue = Math.min(...asset.chartData);
                const normalizedHeight = ((value - minValue) / (maxValue - minValue)) * 100;
                
                return (
                  <div
                    key={index}
                    className={`w-full rounded-t-sm ${isPositive ? 'bg-green-400' : 'bg-red-400'}`}
                    style={{ height: `${Math.max(normalizedHeight, 10)}%` }}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <div>
              <span className="font-medium">Market Cap</span>
              <p>{asset.marketCap}</p>
            </div>
            <div className="text-right">
              <span className="font-medium">Volume</span>
              <p>{asset.volume}</p>
            </div>
          </div>

          <p className="text-sm text-gray-700 line-clamp-2 mb-4">
            {asset.description}
          </p>

          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Latest News</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Trade Now
              </button>
            </div>
            {asset.newsFeed[0] && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                {asset.newsFeed[0].headline}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}