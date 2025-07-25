import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Edit, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Trophy, 
  Star, 
  Zap,
  LogOut,
  Settings,
  Users
} from 'lucide-react';
import IVCLogo from '@/components/IVCLogo';

interface ProfileDrawerProps {
  children: React.ReactNode;
  className?: string;
}

export function ProfileDrawer({ children, className }: ProfileDrawerProps) {
  const [open, setOpen] = useState(false);

  const demoUser = {
    name: 'Ravi Kumar',
    username: '@ravikumar_trader',
    avatar: '👨‍💼',
    location: 'Hyderabad, Telangana',
    joinDate: 'March 2024',
    bio: 'Passionate about Telugu cinema and IPL trading. Love finding hidden gems in the entertainment market!',
    stats: {
      totalTrades: 187,
      totalProfit: 45670,
      winRate: 73.2,
      rank: 12,
      achievements: 8
    },
    badges: [
      { name: 'Telugu Cinema Expert', color: 'purple' },
      { name: 'Flash Event Champion', color: 'red' },
      { name: 'IPL Specialist', color: 'orange' },
      { name: 'Top 20 Trader', color: 'yellow' }
    ],
    achievements: [
      { name: 'First Trade', icon: Star, completed: true },
      { name: '100 Trades Milestone', icon: TrendingUp, completed: true },
      { name: 'Flash Event Winner', icon: Zap, completed: true },
      { name: 'Movie Master', icon: Trophy, completed: true },
      { name: 'IPL Champion', icon: Trophy, completed: true },
      { name: 'Community Leader', icon: Users, completed: false },
    ]
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className={className}>
          {children}
        </div>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80 sm:w-96 overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* User Info */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl">
              {demoUser.avatar}
            </div>
            <div>
              <h3 className="text-xl font-bold">{demoUser.name}</h3>
              <p className="text-sm text-muted-foreground">{demoUser.username}</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {demoUser.location}
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic px-4">
              "{demoUser.bio}"
            </p>
          </div>

          <Separator />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                  <IVCLogo size="sm" />
                  {demoUser.stats.totalProfit.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Total Profit</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">#{demoUser.stats.rank}</div>
                <div className="text-xs text-muted-foreground">Global Rank</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{demoUser.stats.totalTrades}</div>
                <div className="text-xs text-muted-foreground">Total Trades</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{demoUser.stats.winRate}%</div>
                <div className="text-xs text-muted-foreground">Win Rate</div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Badges */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Badges
            </h4>
            <div className="flex flex-wrap gap-2">
              {demoUser.badges.map((badge, index) => (
                <Badge 
                  key={index}
                  variant={badge.color === 'red' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {badge.name}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Achievements */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Achievements ({demoUser.stats.achievements}/10)
            </h4>
            <div className="space-y-2">
              {demoUser.achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      achievement.completed 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                        : 'bg-gray-50 dark:bg-gray-900/20 text-gray-500'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${achievement.completed ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium">{achievement.name}</span>
                    {achievement.completed && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Member Since */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Member since {demoUser.joinDate}
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2" disabled>
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" disabled>
              <User className="h-4 w-4" />
              Change Avatar
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" disabled>
              <Settings className="h-4 w-4" />
              Account Settings
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-red-600 hover:text-red-700" disabled>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}