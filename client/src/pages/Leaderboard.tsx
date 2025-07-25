import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Crown, Star, Zap, Users, TrendingUp, MapPin, Calendar, Award } from 'lucide-react';
import { demoLeaderboardUsers, DemoUser } from '@/data/assets';
import IVCLogo from '@/components/IVCLogo';
import { TeluguTraderHallOfFame } from '@/components/TeluguTraderHallOfFame';

export default function Leaderboard() {
  const [activeTimeframe, setActiveTimeframe] = useState('all-time');
  const [activeRegion, setActiveRegion] = useState('global');

  const getFilteredUsers = (timeframe: string, region: string) => {
    let filtered = [...demoLeaderboardUsers];
    
    // Filter by region
    if (region === 'telugu') {
      filtered = filtered.filter(user => 
        user.location.includes('Telangana') || 
        user.location.includes('AP') || 
        user.location.includes('Andhra Pradesh')
      );
    } else if (region === 'south') {
      filtered = filtered.filter(user => 
        user.location.includes('Telangana') || 
        user.location.includes('AP') || 
        user.location.includes('Karnataka') ||
        user.location.includes('Tamil Nadu') ||
        user.location.includes('Kerala')
      );
    }
    
    // Sort by profits (already sorted in demo data)
    return filtered;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3: return <Trophy className="h-6 w-6 text-amber-600" />;
      default: return <Star className="h-5 w-5 text-blue-500" />;
    }
  };

  const hasFlashBadge = (user: DemoUser) => user.specialBadges.includes('Flash Market Champion');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            InvestIn Leaderboard
          </h1>
          <Trophy className="h-8 w-8 text-yellow-500" />
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the top-performing traders across movies and IPL teams. See who's dominating the Telugu entertainment market!
        </p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Traders</p>
                <p className="text-2xl font-bold text-yellow-600">{demoLeaderboardUsers.length}</p>
              </div>
              <Users className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Telugu States</p>
                <p className="text-2xl font-bold text-purple-600">
                  {demoLeaderboardUsers.filter(u => 
                    u.location.includes('Telangana') || u.location.includes('AP')
                  ).length}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Profits</p>
                <p className="text-2xl font-bold text-green-600 flex items-center gap-1">
                  <IVCLogo size="sm" />
                  {demoLeaderboardUsers.reduce((sum, user) => sum + user.totalProfit, 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flash Champions</p>
                <p className="text-2xl font-bold text-blue-600">
                  {demoLeaderboardUsers.filter(hasFlashBadge).length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Telugu Trader Hall of Fame Component */}
      <TeluguTraderHallOfFame />

      {/* Main Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-500" />
            Global Rankings
          </CardTitle>
          <div className="flex gap-2 mt-4">
            <Button 
              variant={activeTimeframe === 'all-time' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTimeframe('all-time')}
            >
              All Time
            </Button>
            <Button 
              variant={activeTimeframe === 'monthly' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTimeframe('monthly')}
            >
              This Month
            </Button>
            <Button 
              variant={activeTimeframe === 'weekly' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTimeframe('weekly')}
            >
              This Week
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeRegion} onValueChange={setActiveRegion}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="telugu">Telugu States</TabsTrigger>
              <TabsTrigger value="south">South India</TabsTrigger>
              <TabsTrigger value="metro">Metro Cities</TabsTrigger>
            </TabsList>

            <TabsContent value={activeRegion} className="mt-6">
              <div className="space-y-4">
                {getFilteredUsers(activeTimeframe, activeRegion).map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-6 rounded-xl transition-all duration-200 hover:shadow-lg ${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 border-2 border-yellow-200 dark:border-yellow-800' 
                        : index === 1
                        ? 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/30 dark:to-slate-900/30 border border-gray-200 dark:border-gray-700'
                        : index === 2
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-800'
                        : 'bg-muted/30 hover:bg-muted/50 border border-border'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {getRankIcon(index + 1)}
                        <span className={`font-bold text-xl ${
                          index < 3 ? 'text-2xl' : ''
                        }`}>
                          #{index + 1}
                        </span>
                      </div>
                      
                      <div className="text-3xl">{user.avatar}</div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-lg">{user.name}</span>
                          {hasFlashBadge(user) && (
                            <Badge variant="destructive" className="animate-pulse">
                              <Zap className="h-3 w-3 mr-1" />
                              Flash Champ
                            </Badge>
                          )}
                          {index < 3 && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              <Trophy className="h-3 w-3 mr-1" />
                              Top {index + 1}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {user.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {user.tradesCount} trades
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {user.bestTrade}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {user.specialBadges.slice(0, 3).map((badge, badgeIndex) => (
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

                    <div className="text-right">
                      <div className={`flex items-center gap-2 text-2xl font-bold ${
                        index < 3 ? 'text-3xl' : ''
                      } text-green-600 dark:text-green-400 mb-2`}>
                        <TrendingUp className="h-5 w-5" />
                        <IVCLogo size="md" />
                        {user.totalProfit.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Member since March 2024
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {getFilteredUsers(activeTimeframe, activeRegion).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No traders found for this region</p>
                  <p className="text-sm">Check back soon for new participants!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Achievement Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <Crown className="h-5 w-5" />
              Movie Moguls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Top performers in movie stock trading
            </p>
            <div className="space-y-2">
              {demoLeaderboardUsers
                .filter(user => user.specialBadges.includes('Movie Master'))
                .slice(0, 3)
                .map((user, index) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{user.avatar}</span>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <IVCLogo size="sm" />
                    {user.totalProfit.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Trophy className="h-5 w-5" />
              Cricket Champions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              IPL team trading specialists
            </p>
            <div className="space-y-2">
              {demoLeaderboardUsers
                .filter(user => user.specialBadges.includes('Cricket Expert'))
                .slice(0, 3)
                .map((user, index) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{user.avatar}</span>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <IVCLogo size="sm" />
                    {user.totalProfit.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Zap className="h-5 w-5" />
              Flash Legends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Masters of flash event trading
            </p>
            <div className="space-y-2">
              {demoLeaderboardUsers
                .filter(hasFlashBadge)
                .slice(0, 3)
                .map((user, index) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{user.avatar}</span>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <IVCLogo size="sm" />
                    {user.totalProfit.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}