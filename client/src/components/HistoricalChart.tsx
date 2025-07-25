import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Calendar, Volume2, Info } from 'lucide-react';
import { HistoricalDataPoint, NewsItem } from '@/data/assets';
import IVCLogo from './IVCLogo';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

interface HistoricalChartProps {
  data: HistoricalDataPoint[];
  newsFeed: NewsItem[];
  currentPrice: number;
  className?: string;
}

export function HistoricalChart({ data, newsFeed, currentPrice, className }: HistoricalChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getMaxGainDay = () => {
    let maxGain = 0;
    let maxGainPoint = data[0];
    
    for (let i = 1; i < data.length; i++) {
      const gain = data[i].price - data[i-1].price;
      if (gain > maxGain) {
        maxGain = gain;
        maxGainPoint = data[i];
      }
    }
    return { point: maxGainPoint, gain: maxGain };
  };

  const getMaxLossDay = () => {
    let maxLoss = 0;
    let maxLossPoint = data[0];
    
    for (let i = 1; i < data.length; i++) {
      const loss = data[i-1].price - data[i].price;
      if (loss > maxLoss) {
        maxLoss = loss;
        maxLossPoint = data[i];
      }
    }
    return { point: maxLossPoint, loss: maxLoss };
  };

  const maxGain = getMaxGainDay();
  const maxLoss = getMaxLossDay();

  const chartData = data.map(point => ({
    ...point,
    formattedDate: formatDate(point.date),
    volumeInM: Math.round(point.volume / 1000000 * 10) / 10
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const newsForDate = newsFeed.find(news => news.date === dataPoint.date);
      
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3 max-w-sm">
          <p className="font-medium">{label}</p>
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-1">
              <IVCLogo size="sm" />
              <span className="font-semibold">{payload[0].value}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Volume: {dataPoint.volumeInM}M IVC
            </div>
            {dataPoint.newsEvent && (
              <div className="text-sm p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <div className="flex items-center gap-1 mb-1">
                  <Info className="h-3 w-3 text-blue-500" />
                  <span className="font-medium text-blue-700 dark:text-blue-300">News Event</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400">{dataPoint.newsEvent}</p>
              </div>
            )}
            {newsForDate && (
              <div className="text-sm p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                  {newsForDate.headline}
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  {newsForDate.source}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Price History & News Timeline
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">30 Days</Badge>
            <Badge variant="secondary">Interactive</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#1d4ed8' }}
              />
              
              {/* Highlight max gain day */}
              <ReferenceDot 
                x={formatDate(maxGain.point.date)} 
                y={maxGain.point.price}
                r={8}
                fill="#10b981"
                stroke="#059669"
                strokeWidth={2}
              />
              
              {/* Highlight max loss day */}
              <ReferenceDot 
                x={formatDate(maxLoss.point.date)} 
                y={maxLoss.point.price}
                r={8}
                fill="#ef4444"
                stroke="#dc2626"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Best Day</span>
            </div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              +{maxGain.gain.toFixed(2)}
            </div>
            <div className="text-xs text-green-600/80 dark:text-green-400/80">
              {formatDate(maxGain.point.date)}
            </div>
            {maxGain.point.newsEvent && (
              <div className="text-xs mt-1 text-green-700 dark:text-green-300">
                {maxGain.point.newsEvent}
              </div>
            )}
          </div>

          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">Worst Day</span>
            </div>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              -{maxLoss.loss.toFixed(2)}
            </div>
            <div className="text-xs text-red-600/80 dark:text-red-400/80">
              {formatDate(maxLoss.point.date)}
            </div>
            {maxLoss.point.newsEvent && (
              <div className="text-xs mt-1 text-red-700 dark:text-red-300">
                {maxLoss.point.newsEvent}
              </div>
            )}
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Avg Volume</span>
            </div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {Math.round(data.reduce((sum, point) => sum + point.volume, 0) / data.length / 1000000)}M
            </div>
            <div className="text-xs text-blue-600/80 dark:text-blue-400/80">
              IVC per day
            </div>
          </div>
        </div>

        {/* News Timeline */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Recent News Timeline
          </h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {newsFeed.slice(0, 4).map((news, index) => (
              <div key={index} className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  news.impact === 'positive' ? 'bg-green-500' :
                  news.impact === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                }`} />
                <div className="flex-1">
                  <div className="font-medium text-sm">{news.headline}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(news.date)} • {news.source}
                  </div>
                </div>
                <Badge 
                  variant={news.impact === 'positive' ? 'default' : news.impact === 'negative' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {news.impact}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}