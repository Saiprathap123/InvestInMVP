import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, Trophy, Star, Heart, MapPin, TrendingUp } from 'lucide-react';
import { FanHubData, TopFan } from '@/data/assets';
import IVCLogo from './IVCLogo';

interface FanHubProps {
  fanHub: FanHubData;
  assetName: string;
  onJoinFanHub?: () => void;
}

export function FanHub({ fanHub, assetName, onJoinFanHub }: FanHubProps) {
  const [isJoined, setIsJoined] = useState(fanHub.isUserMember);

  const handleJoinClick = () => {
    setIsJoined(true);
    onJoinFanHub?.();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Fan Hub - Join the Fan Army for {assetName}
          </CardTitle>
          {isJoined && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              <Heart className="h-3 w-3 mr-1 fill-current" />
              Member
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Fan Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {formatNumber(fanHub.totalFans)}
            </div>
            <div className="text-sm text-muted-foreground">Total Fans</div>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {formatNumber(fanHub.teluguFans)}
            </div>
            <div className="text-sm text-muted-foreground">Telugu Fans</div>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg col-span-2 md:col-span-1">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {((fanHub.teluguFans / fanHub.totalFans) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Telugu Presence</div>
          </div>
        </div>

        <Separator />

        {/* Top Telugu Fans Hall of Fame */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top Telugu Fans - Hall of Fame
          </h3>
          
          <div className="space-y-3">
            {fanHub.topFans.map((fan, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{fan.avatar}</div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {fan.name}
                      {index === 0 && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {fan.location}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                    <TrendingUp className="h-4 w-4" />
                    <IVCLogo size="sm" />
                    {fan.profit.toLocaleString()}
                  </div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {fan.badge}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Special Events */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Special Fan Events</h3>
          <div className="flex flex-wrap gap-2">
            {fanHub.specialEvents.map((event, index) => (
              <Badge key={index} variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300">
                {event}
              </Badge>
            ))}
          </div>
        </div>

        {/* Join Fan Hub Button */}
        {!isJoined && (
          <div className="pt-4 border-t">
            <Button 
              onClick={handleJoinClick}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              size="lg"
            >
              <Heart className="h-4 w-4 mr-2" />
              Join This Fan Hub
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Join now for exclusive updates, special events, and fan community access!
            </p>
          </div>
        )}

        {isJoined && (
          <div className="pt-4 border-t bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
                Welcome to the Fan Army! 🎉
              </div>
              <p className="text-sm text-muted-foreground">
                You're now part of the exclusive {assetName} fan community. Get ready for special events and insider updates!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}