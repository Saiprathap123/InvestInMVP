import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Settings, 
  User, 
  CreditCard, 
  Moon, 
  Sun, 
  Globe, 
  Bell,
  Wallet
} from 'lucide-react';
import IVCLogo from '@/components/IVCLogo';
import { ProfileDrawer } from './ProfileDrawer';

interface HeaderActionsProps {
  className?: string;
}

export function HeaderActions({ className }: HeaderActionsProps) {
  const [addCreditOpen, setAddCreditOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [amount, setAmount] = useState('');

  const currentBalance = 15000.00;

  const quickAmounts = [1000, 5000, 10000, 25000];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // In a real app, this would update the theme
    console.log('Theme toggled to:', newTheme);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Wallet Balance */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border">
        <Wallet className="h-4 w-4 text-green-600" />
        <div className="flex items-center gap-1">
          <IVCLogo size="sm" />
          <span className="font-semibold text-green-600">
            {currentBalance.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Add Credit Button */}
      <Dialog open={addCreditOpen} onOpenChange={setAddCreditOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Credit</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Add InvestIn Credits
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Current Balance</div>
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-600">
                <IVCLogo size="md" />
                {currentBalance.toLocaleString()}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Amount to Add</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-center text-lg"
              />
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Quick Add</div>
              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="gap-1"
                  >
                    <IVCLogo size="sm" />
                    {quickAmount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              className="w-full gap-2" 
              disabled={!amount || parseFloat(amount) <= 0}
              onClick={() => {
                console.log('Adding credit:', amount);
                setAddCreditOpen(false);
                setAmount('');
              }}
            >
              <Plus className="h-4 w-4" />
              Add {amount ? `${parseFloat(amount).toLocaleString()} IVC` : 'Credits'}
            </Button>

            <div className="text-xs text-muted-foreground text-center">
              Demo mode - No actual payment processing
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications */}
      <Button variant="ghost" size="sm" className="relative" title="Notifications">
        <Bell className="h-4 w-4" />
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
        >
          3
        </Badge>
      </Button>

      {/* Settings Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" title="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Preferences</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={toggleTheme} className="gap-2">
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </DropdownMenuItem>
          
          <DropdownMenuItem className="gap-2" disabled>
            <Globe className="h-4 w-4" />
            Language
            <Badge variant="secondary" className="ml-auto text-xs">English</Badge>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="gap-2" disabled>
            <Bell className="h-4 w-4" />
            Notifications
          </DropdownMenuItem>
          
          <DropdownMenuItem className="gap-2" disabled>
            <CreditCard className="h-4 w-4" />
            Payment Methods
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile */}
      <ProfileDrawer>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 hover:bg-muted"
          title="User Profile"
        >
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            R
          </div>
          <span className="hidden sm:inline font-medium">Ravi</span>
        </Button>
      </ProfileDrawer>
    </div>
  );
}