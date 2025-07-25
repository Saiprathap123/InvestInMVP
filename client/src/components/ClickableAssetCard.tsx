import { useLocation } from 'wouter';
import { AssetData } from '@/data/assets';
import AssetCard from './AssetCard';

interface ClickableAssetCardProps {
  asset: AssetData;
  compact?: boolean;
  className?: string;
}

export function ClickableAssetCard({ asset, compact = false, className }: ClickableAssetCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(`/asset/${asset.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${className}`}
    >
      <AssetCard 
        asset={asset} 
        onClick={handleClick}
        compact={compact}
      />
    </div>
  );
}