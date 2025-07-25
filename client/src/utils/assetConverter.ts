import { AssetData } from '../data/assets';

// Convert AssetData to the format expected by existing components
export interface TradingAsset {
  symbol: string;
  id: number;
  name: string;
  type: string;
  currentPrice: string;
  previousPrice: string;
  marketCap: string;
  imageUrl: string | null;
  description: string | null;
  category: string | null;
  isActive: boolean;
  createdAt: Date;
}

export function convertAssetDataToTradingAsset(asset: AssetData): TradingAsset {
  return {
    symbol: asset.ticker,
    id: parseInt(asset.id.replace(/\D/g, '') || '1'), // Extract numeric ID
    name: asset.name,
    type: asset.category.toLowerCase().replace(' ', ''),
    currentPrice: asset.price.toString(),
    previousPrice: (asset.price - asset.change).toString(),
    marketCap: asset.marketCap,
    imageUrl: asset.image,
    description: asset.description,
    category: asset.category,
    isActive: true,
    createdAt: new Date()
  };
}