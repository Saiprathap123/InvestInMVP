import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Zap, Clock, Users, TrendingUp, Sparkles } from 'lucide-react';
import { flashMarketEvents, allAssets } from '@/data/assets';
import IVCLogo from './IVCLogo';

export function FlashEventBanner() {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const activeEvents = flashMarketEvents.filter(event => event.isActive);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTimeLeft = { ...prev };
        activeEvents.forEach(event => {
          if (newTimeLeft[event.id] > 0) {
            newTimeLeft[event.id] = (newTimeLeft[event.id] || event.timeLeft) - 1;
          }
        });
        return newTimeLeft;
      });
    }, 1000);

    // Initialize timeLeft
    const initialTimeLeft: { [key: string]: number } = {};
    activeEvents.forEach(event => {
      initialTimeLeft[event.id] = event.timeLeft;
    });
    setTimeLeft(initialTimeLeft);

    return () => clearInterval(timer);
  }, [activeEvents.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  if (activeEvents.length === 0) return null;

  return (
    <>
      <div className="space-y-3">
        {activeEvents.map((event) => {
          const asset = allAssets.find(a => a.id === event.assetId);
          const eventTimeLeft = timeLeft[event.id] || 0;
          
          return (
            <Card 
              key={event.id} 
              className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-pulse"
              onClick={() => handleEventClick(event)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Zap className="h-6 w-6 text-yellow-500 animate-bounce" />
                      <Badge variant="destructive" className="bg-red-500 text-white font-bold animate-pulse">
                        FLASH EVENT LIVE
                      </Badge>
                    </div>
                    <div className="hidden md:block h-6 w-px bg-gray-300 dark:bg-gray-600" />
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                        {formatTime(eventTimeLeft)}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold animate-pulse"
                  >
                    TRADE NOW
                  </Button>
                </div>
                
                <div className="mt-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {asset?.name} - {event.multiplier}x Bonus IVC!
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{event.participants.toLocaleString()} trading</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">{event.multiplier}x IVC multiplier</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium">High volatility</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Flash Event Modal */}
      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Flash Market Event
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                {selectedEvent && (
                  <>
                    <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg">
                      <h3 className="font-bold text-lg">{selectedEvent.title}</h3>
                      <p className="text-sm mt-2">{selectedEvent.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {selectedEvent.multiplier}x
                        </div>
                        <div className="text-xs text-muted-foreground">IVC Multiplier</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {selectedEvent.participants.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Participants</div>
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-sm font-medium text-red-700 dark:text-red-300">
                        Time Remaining: {formatTime(timeLeft[selectedEvent.id] || 0)}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <h4 className="font-medium">Flash Event Rules:</h4>
                      <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                        <li>All trades during this event earn {selectedEvent.multiplier}x IVC rewards</li>
                        <li>Leaderboard points are doubled for participants</li>
                        <li>Special "Flash Champ" badge for top performers</li>
                        <li>Limited time only - trade fast for maximum rewards!</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
              Start Trading
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}