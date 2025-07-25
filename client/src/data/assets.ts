// Static data for InvestIn MVP - Movies and IPL Teams as tradable assets

export interface AssetData {
  id: string;
  ticker: string;
  name: string;
  category: 'Movie' | 'IPL Team';
  image: string;
  description: string;
  price: number;
  change: number;
  percentChange: number;
  chartData: number[];
  marketCap: string;
  volume: string;
  newsFeed: NewsItem[];
}

export interface NewsItem {
  date: string;
  headline: string;
  source?: string;
}

export const movieAssets: AssetData[] = [
  {
    id: 'pushpa2',
    ticker: 'PUSHPA2',
    name: 'Pushpa: The Rule',
    category: 'Movie',
    image: '/api/placeholder/200/300',
    description: 'The biggest action entertainer of 2024, starring Allu Arjun. Sequel to the blockbuster Pushpa: The Rise.',
    price: 120.50,
    change: 6.5,
    percentChange: 5.7,
    chartData: [100, 101, 105, 109, 115, 118, 120, 125, 120],
    marketCap: '₹850 Cr',
    volume: '15.2M IVC',
    newsFeed: [
      { date: '2025-07-24', headline: 'Pushpa 2 teaser breaks YouTube records with 50M views', source: 'BoxOffice India' },
      { date: '2025-07-20', headline: 'Advance bookings open across India', source: 'Trade Analyst' },
      { date: '2025-07-15', headline: 'International release confirmed in 15 countries', source: 'Variety' }
    ]
  },
  {
    id: 'rrr2',
    ticker: 'RRR2',
    name: 'RRR: Rise Roar Revolt 2',
    category: 'Movie',
    image: '/api/placeholder/200/300',
    description: 'SS Rajamouli\'s epic sequel to the Oscar-winning RRR, featuring Ram Charan and Jr. NTR.',
    price: 98.75,
    change: -2.25,
    percentChange: -2.2,
    chartData: [110, 108, 105, 102, 100, 99, 98, 101, 99],
    marketCap: '₹1200 Cr',
    volume: '22.8M IVC',
    newsFeed: [
      { date: '2025-07-23', headline: 'Principal photography begins in September', source: 'Film Trade' },
      { date: '2025-07-18', headline: 'Budget increased to ₹500 crores', source: 'Industry Insider' }
    ]
  },
  {
    id: 'kalki2',
    ticker: 'KALKI2',
    name: 'Kalki 2898 AD: Part 2',
    category: 'Movie',
    image: '/api/placeholder/200/300',
    description: 'Nag Ashwin\'s sci-fi epic continues with Prabhas, Deepika Padukone, and Amitabh Bachchan.',
    price: 156.30,
    change: 8.75,
    percentChange: 5.9,
    chartData: [140, 145, 148, 152, 155, 158, 160, 159, 156],
    marketCap: '₹950 Cr',
    volume: '18.5M IVC',
    newsFeed: [
      { date: '2025-07-22', headline: 'VFX work begins with international studios', source: 'Hollywood Reporter' },
      { date: '2025-07-19', headline: 'Part 1 crosses ₹1000 crores worldwide', source: 'Sacnilk' }
    ]
  },
  {
    id: 'pathaan2',
    ticker: 'PATH2',
    name: 'Pathaan 2',
    category: 'Movie',
    image: '/api/placeholder/200/300',
    description: 'Shah Rukh Khan returns as the super spy Pathaan in this high-octane action thriller.',
    price: 142.80,
    change: 4.20,
    percentChange: 3.0,
    chartData: [130, 135, 138, 140, 142, 145, 143, 142, 143],
    marketCap: '₹800 Cr',
    volume: '12.3M IVC',
    newsFeed: [
      { date: '2025-07-21', headline: 'Shooting begins in Dubai and Istanbul', source: 'Mid-Day' },
      { date: '2025-07-17', headline: 'Deepika Padukone confirmed to return', source: 'Pinkvilla' }
    ]
  },
  {
    id: 'brahmastra2',
    ticker: 'BRAH2',
    name: 'Brahmastra Part 2: Deva',
    category: 'Movie',
    image: '/api/placeholder/200/300',
    description: 'Ayan Mukerji\'s mythological fantasy continues the Astraverse with Ranbir Kapoor and Alia Bhatt.',
    price: 89.45,
    change: -5.30,
    percentChange: -5.6,
    chartData: [105, 102, 98, 95, 92, 90, 88, 89, 89],
    marketCap: '₹650 Cr',
    volume: '9.8M IVC',
    newsFeed: [
      { date: '2025-07-20', headline: 'Pre-production delayed to 2026', source: 'Bollywood Hungama' },
      { date: '2025-07-16', headline: 'VFX team from Marvel Studios joins project', source: 'Variety India' }
    ]
  }
];

export const iplTeamAssets: AssetData[] = [
  {
    id: 'csk',
    ticker: 'CSK',
    name: 'Chennai Super Kings',
    category: 'IPL Team',
    image: '/api/placeholder/200/200',
    description: '5-time IPL champions known for consistency and strong leadership under MS Dhoni.',
    price: 155.75,
    change: -3.25,
    percentChange: -2.0,
    chartData: [165, 162, 158, 160, 157, 155, 158, 156, 156],
    marketCap: '₹1100 Cr',
    volume: '28.5M IVC',
    newsFeed: [
      { date: '2025-07-24', headline: 'CSK announces new coaching staff for IPL 2025', source: 'ESPNCricinfo' },
      { date: '2025-07-22', headline: 'MS Dhoni confirms availability for next season', source: 'Cricbuzz' },
      { date: '2025-07-18', headline: 'Team sponsors extend partnership by 3 years', source: 'SportsBusiness' }
    ]
  },
  {
    id: 'mi',
    ticker: 'MI',
    name: 'Mumbai Indians',
    category: 'IPL Team',
    image: '/api/placeholder/200/200',
    description: '5-time IPL champions with the most successful franchise record in tournament history.',
    price: 168.90,
    change: 5.40,
    percentChange: 3.3,
    chartData: [155, 158, 162, 165, 167, 170, 169, 168, 169],
    marketCap: '₹1250 Cr',
    volume: '32.1M IVC',
    newsFeed: [
      { date: '2025-07-23', headline: 'Rohit Sharma retained as captain for IPL 2025', source: 'Times of India' },
      { date: '2025-07-21', headline: 'MI announces academy expansion to 5 new cities', source: 'Indian Express' },
      { date: '2025-07-19', headline: 'Record sponsorship deal signed worth ₹200 crores', source: 'Business Standard' }
    ]
  },
  {
    id: 'rcb',
    ticker: 'RCB',
    name: 'Royal Challengers Bangalore',
    category: 'IPL Team',
    image: '/api/placeholder/200/200',
    description: 'Popular franchise led by Virat Kohli, known for passionate fanbase and aggressive gameplay.',
    price: 134.60,
    change: 7.85,
    percentChange: 6.2,
    chartData: [120, 125, 128, 130, 132, 135, 138, 136, 135],
    marketCap: '₹950 Cr',
    volume: '25.7M IVC',
    newsFeed: [
      { date: '2025-07-24', headline: 'Virat Kohli extends contract till 2027', source: 'Hindustan Times' },
      { date: '2025-07-20', headline: 'RCB invests in state-of-the-art training facility', source: 'Deccan Herald' },
      { date: '2025-07-17', headline: 'Fan engagement reaches all-time high', source: 'SportsTak' }
    ]
  },
  {
    id: 'kkr',
    ticker: 'KKR',
    name: 'Kolkata Knight Riders',
    category: 'IPL Team',
    image: '/api/placeholder/200/200',
    description: '3-time IPL champions co-owned by Shah Rukh Khan, known for strategic team building.',
    price: 128.45,
    change: 2.15,
    percentChange: 1.7,
    chartData: [125, 126, 127, 129, 130, 128, 127, 128, 128],
    marketCap: '₹875 Cr',
    volume: '19.3M IVC',
    newsFeed: [
      { date: '2025-07-23', headline: 'KKR announces youth development program', source: 'Telegraph India' },
      { date: '2025-07-21', headline: 'Eden Gardens gets major infrastructure upgrade', source: 'Times Now' },
      { date: '2025-07-18', headline: 'Strategic partnership with Caribbean Premier League', source: 'Cricket.com' }
    ]
  },
  {
    id: 'dc',
    ticker: 'DC',
    name: 'Delhi Capitals',
    category: 'IPL Team',
    image: '/api/placeholder/200/200',
    description: 'Young and dynamic team focused on nurturing talent and innovative cricket strategies.',
    price: 112.30,
    change: -1.70,
    percentChange: -1.5,
    chartData: [118, 116, 114, 113, 112, 114, 113, 112, 112],
    marketCap: '₹780 Cr',
    volume: '16.8M IVC',
    newsFeed: [
      { date: '2025-07-22', headline: 'DC focuses on domestic talent for next auction', source: 'News18' },
      { date: '2025-07-19', headline: 'New practice facility inaugurated in Delhi', source: 'India Today' },
      { date: '2025-07-16', headline: 'Partnership with local cricket academies announced', source: 'NDTV Sports' }
    ]
  },
  {
    id: 'rr',
    ticker: 'RR',
    name: 'Rajasthan Royals',
    category: 'IPL Team',
    image: '/api/placeholder/200/200',
    description: 'Inaugural IPL champions known for discovering young talent and unconventional strategies.',
    price: 98.75,
    change: 3.25,
    percentChange: 3.4,
    chartData: [92, 94, 96, 95, 97, 99, 100, 99, 99],
    marketCap: '₹695 Cr',
    volume: '14.2M IVC',
    newsFeed: [
      { date: '2025-07-24', headline: 'RR launches grassroots cricket program in Rajasthan', source: 'Rajasthan Patrika' },
      { date: '2025-07-20', headline: 'International scouting network expanded', source: 'Cricinfo' },
      { date: '2025-07-17', headline: 'Sustainability initiative makes RR carbon neutral', source: 'Environmental Times' }
    ]
  }
];

export const allAssets = [...movieAssets, ...iplTeamAssets];

// Mock user portfolio data
export const mockPortfolioData = [
  { assetId: 'csk', symbol: 'CSK', name: 'Chennai Super Kings', quantity: 25, avgPrice: 145.30, currentPrice: 155.75 },
  { assetId: 'pushpa2', symbol: 'PUSHPA2', name: 'Pushpa: The Rule', quantity: 15, avgPrice: 115.20, currentPrice: 120.50 },
  { assetId: 'mi', symbol: 'MI', name: 'Mumbai Indians', quantity: 20, avgPrice: 160.25, currentPrice: 168.90 },
  { assetId: 'kalki2', symbol: 'KALKI2', name: 'Kalki 2898 AD: Part 2', quantity: 10, avgPrice: 148.75, currentPrice: 156.30 }
];

// Mock transaction history
export const mockTransactions = [
  { id: '1', date: '2025-07-24', asset: 'CSK', type: 'buy', quantity: 10, price: 155.75, total: 1557.50 },
  { id: '2', date: '2025-07-23', asset: 'PUSHPA2', type: 'sell', quantity: 5, price: 118.30, total: 591.50 },
  { id: '3', date: '2025-07-22', asset: 'MI', type: 'buy', quantity: 20, price: 160.25, total: 3205.00 },
  { id: '4', date: '2025-07-21', asset: 'KALKI2', type: 'buy', quantity: 10, price: 148.75, total: 1487.50 },
  { id: '5', date: '2025-07-20', asset: 'RRR2', type: 'sell', quantity: 8, price: 101.20, total: 809.60 },
];

// Mock watchlist
export const mockWatchlist = ['rrr2', 'brahmastra2', 'rcb', 'dc', 'rr'];

// Mock news ticker for homepage
export const mockNewsTicker = [
  'Pushpa 2 advance bookings cross ₹100 crores',
  'CSK announces retention strategy for IPL 2025',
  'Mumbai Indians signs record sponsorship deal',
  'RRR 2 budget increases to ₹500 crores',
  'Virat Kohli extends RCB contract till 2027',
  'Kalki 2898 AD Part 2 begins international VFX work'
];