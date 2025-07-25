import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Crown, Zap, Star, MapPin, TrendingUp } from 'lucide-react';
import { demoLeaderboardUsers, DemoUser } from '@/data/assets';
import IVCLogo from './IVCLogo';

interface TeluguTraderHallOfFameProps {
  className?: string;
}

export function TeluguTraderHallOfFame({ className }: TeluguTraderHallOfFameProps) {
  const [activeTab, setActiveTab] = useState('all');

  const teluguTraders = demoLeaderboardUsers.filter(user => 
    user.location.includes('Telangana') || user.location.includes('AP') || user.location.includes('Andhra Pradesh')
  );

  const getFilteredUsers = (type: string) => {
    switch (type) {
      case 'telugu':
        return teluguTraders;
      case 'telangana':
        return demoLeaderboardUsers.filter(user => user.location.includes('Telangana'));
      case 'ap':
        return demoLeaderboardUsers.filter(user => user.location.includes('AP') || user.location.includes('Andhra Pradesh'));
      default:
        return demoLeaderboardUsers;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Trophy className="h-5 w-5 text-amber-600" />;
      default: return <Star className="h-4 w-4 text-blue-500" />;
    }
  };

  const hasFlashBadge = (user: DemoUser) => user.specialBadges.includes('Flash Market Champion');

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Telugu Trader Hall of Fame
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Top performers from Telangana and Andhra Pradesh
        </p>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">All Users</TabsTrigger>
            <TabsTrigger value="telugu" className="text-xs">Telugu</TabsTrigger>
            <TabsTrigger value="telangana" className="text-xs">Telangana</TabsTrigger>
            <TabsTrigger value="ap" className="text-xs">AP</TabsTrigger>
          </TabsList>

          {['all', 'telugu', 'telangana', 'ap'].map(tabValue => (
            <TabsContent key={tabValue} value={tabValue} className="mt-4">
              <div className="space-y-3">
                {getFilteredUsers(tabValue).map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-200 dark:border-yellow-800' 
                        : index === 1
                        ? 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border border-gray-200 dark:border-gray-700'
                        : index === 2
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800'
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getRankIcon(index + 1)}
                        <span className="font-bold text-lg">#{index + 1}</span>
                      </div>
                      
                      <div className="text-2xl">{user.avatar}</div>
                      
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {user.name}
                          {hasFlashBadge(user) && (
                            <Badge variant="destructive" className="text-xs animate-pulse">
                              <Zap className="h-3 w-3 mr-1" />
                              Flash Champ
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {user.location}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.tradesCount} trades • {user.bestTrade}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-lg font-bold text-green-600 dark:text-green-400">
                        <TrendingUp className="h-4 w-4" />
                        <IVCLogo size="sm" />
                        {user.totalProfit.toLocaleString()}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2 justify-end">
                        {user.specialBadges.slice(0, 2).map((badge, badgeIndex) => (
                          <Badge 
                            key={badgeIndex} 
                            variant="outline" 
                            className="text-xs"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {getFilteredUsers(tabValue).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No traders found for this region</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {teluguTraders.length}
              </div>
              <div className="text-sm text-muted-foreground">Telugu Traders</div>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {teluguTraders.reduce((sum, user) => sum + user.totalProfit, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Telugu Profits</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}