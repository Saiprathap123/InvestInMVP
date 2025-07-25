import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, TrendingDown, Eye, MessageSquare, Zap, Flame, Star } from 'lucide-react';
import { trendingAssets, allAssets } from '@/data/assets';
import IVCLogo from './IVCLogo';

export function TrendingBar() {
  const [, setLocation] = useLocation();
  const getTrendingList = (type: keyof typeof trendingAssets) => {
    return trendingAssets[type].map(id => allAssets.find(asset => asset.id === id)).filter(Boolean);
  };

  const getHypeIcon = (level: string) => {
    switch (level) {
      case 'extreme': return <Flame className="h-3 w-3 text-red-500" />;
      case 'high': return <Star className="h-3 w-3 text-orange-500" />;
      case 'medium': return <TrendingUp className="h-3 w-3 text-yellow-500" />;
      default: return null;
    }
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Most Traded */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Most Traded
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            <div className="space-y-2">
              {getTrendingList('mostTraded').map((asset, index) => (
                <div 
                  key={asset?.id} 
                  className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
                  onClick={() => asset && setLocation(`/asset/${asset.id}`)}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 text-xs flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium text-sm">{asset?.ticker}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-20">
                        {asset?.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs">
                      <IVCLogo size="sm" />
                      {asset?.price?.toFixed(2)}
                    </div>
                    <div className={`text-xs ${getChangeColor(asset?.change || 0)}`}>
                      {asset?.change && asset.change >= 0 ? '+' : ''}{asset?.change?.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Most Watched */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Eye className="h-4 w-4 text-purple-500" />
            Most Watched
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            <div className="space-y-2">
              {getTrendingList('mostWatched').map((asset, index) => (
                <div 
                  key={asset?.id} 
                  className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
                  onClick={() => asset && setLocation(`/asset/${asset.id}`)}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 text-xs flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium text-sm flex items-center gap-1">
                        {asset?.ticker}
                        {asset?.hypeLevel && getHypeIcon(asset.hypeLevel)}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-20">
                        {asset?.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs">
                      <IVCLogo size="sm" />
                      {asset?.price?.toFixed(2)}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {asset?.hypeLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Flash Events & Top Gainers */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            Hot Right Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            <div className="space-y-3">
              {/* Flash Events */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  Flash Events
                </h4>
                <div className="space-y-1">
                  {getTrendingList('flashEvents').map((asset) => (
                    <div 
                      key={asset?.id} 
                      className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                      onClick={() => asset && setLocation(`/asset/${asset.id}`)}
                    >
                      <div className="font-medium text-sm flex items-center gap-1">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        {asset?.ticker}
                      </div>
                      <Badge variant="destructive" className="text-xs animate-pulse">
                        LIVE
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Gainers */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Top Gainers
                </h4>
                <div className="space-y-1">
                  {getTrendingList('topGainers').slice(0, 3).map((asset) => (
                    <div 
                      key={asset?.id} 
                      className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                      onClick={() => asset && setLocation(`/asset/${asset.id}`)}
                    >
                      <div className="font-medium text-sm">{asset?.ticker}</div>
                      <div className="text-green-600 dark:text-green-400 text-xs font-medium">
                        +{asset?.percentChange?.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}