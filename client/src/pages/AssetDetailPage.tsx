import { useRoute } from 'wouter';
import { useState } from 'react';
import { allAssets } from '@/data/assets';
import AssetDetail from '@/components/AssetDetail';
import TradingModal from '@/components/TradingModal';
import { convertAssetDataToTradingAsset } from '@/utils/assetConverter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useLocation } from 'wouter';

export default function AssetDetailPage() {
  const [match, params] = useRoute('/asset/:id');
  const [, setLocation] = useLocation();
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  if (!match) {
    return null;
  }

  const asset = allAssets.find(a => a.id === params?.id);

  if (!asset) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Asset Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The asset you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => setLocation('/marketplace')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleTrade = () => {
    setIsTradeModalOpen(true);
  };

  const handleWatchlist = () => {
    console.log(`Added ${asset.name} to watchlist`);
  };

  const handleBack = () => {
    setLocation('/marketplace');
  };

  return (
    <>
      <AssetDetail
        asset={asset}
        onBack={handleBack}
        onTrade={handleTrade}
        onWatchlist={handleWatchlist}
      />
      <TradingModal
        asset={convertAssetDataToTradingAsset(asset)}
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
      />
    </>
  );
}