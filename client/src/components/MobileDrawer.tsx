import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Home, 
  ShoppingCart, 
  Film, 
  Trophy, 
  Briefcase, 
  Eye, 
  Receipt, 
  Crown, 
  Users, 
  Zap, 
  Newspaper, 
  Settings,
  TrendingUp
} from 'lucide-react';

interface MobileDrawerProps {
  className?: string;
}

export function MobileDrawer({ className }: MobileDrawerProps) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  const menuSections = [
    {
      title: 'Trading',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: Home },
        { path: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
        { path: '/portfolio', label: 'Portfolio', icon: Briefcase },
        { path: '/watchlist', label: 'Watchlist', icon: Eye },
        { path: '/transactions', label: 'Transactions', icon: Receipt },
      ]
    },
    {
      title: 'Assets',
      items: [
        { path: '/movies', label: 'Movies', icon: Film },
        { path: '/ipl-teams', label: 'IPL Teams', icon: Trophy },
      ]
    },
    {
      title: 'Community',
      items: [
        { path: '/leaderboard', label: 'Leaderboard', icon: Crown },
        { path: '/hall-of-fame', label: 'Telugu Hall of Fame', icon: Users, badge: 'New' },
        { path: '/fan-hubs', label: 'Fan Hubs', icon: Users },
        { path: '/flash-events', label: 'Flash Events', icon: Zap, badge: 'Live' },
      ]
    },
    {
      title: 'More',
      items: [
        { path: '/news', label: 'Market News', icon: Newspaper },
        { path: '/settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const isActive = (path: string) => location === path;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`hover:bg-muted ${className}`}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80 sm:w-96">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InvestIn
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      onClick={() => setOpen(false)}
                    >
                      <div
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(item.path)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.badge && (
                          <Badge 
                            variant={item.badge === 'Live' ? 'destructive' : 'secondary'} 
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
              {sectionIndex < menuSections.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                U
              </div>
              <div>
                <p className="font-medium text-sm">Demo User</p>
                <p className="text-xs text-muted-foreground">Hyderabad, Telangana</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}