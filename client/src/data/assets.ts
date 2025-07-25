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
  historicalData: HistoricalDataPoint[];
  marketCap: string;
  volume: string;
  newsFeed: NewsItem[];
  fanHub: FanHubData;
  isFlashEvent: boolean;
  hypeLevel: 'low' | 'medium' | 'high' | 'extreme';
}

export interface NewsItem {
  date: string;
  headline: string;
  source?: string;
  impact?: 'positive' | 'negative' | 'neutral';
}

export interface HistoricalDataPoint {
  date: string;
  price: number;
  volume: number;
  newsEvent?: string;
}

export interface FanHubData {
  totalFans: number;
  teluguFans: number;
  topFans: TopFan[];
  isUserMember: boolean;
  specialEvents: string[];
}

export interface TopFan {
  name: string;
  location: string;
  profit: number;
  badge: string;
  avatar?: string;
}

export interface DemoUser {
  id: string;
  name: string;
  location: string;
  totalProfit: number;
  bestTrade: string;
  tradesCount: number;
  specialBadges: string[];
  avatar?: string;
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
    historicalData: [
      { date: '2025-07-01', price: 100, volume: 12000000, newsEvent: 'First teaser announcement' },
      { date: '2025-07-05', price: 105, volume: 15000000, newsEvent: 'Allu Arjun training videos viral' },
      { date: '2025-07-10', price: 115, volume: 18000000, newsEvent: 'Sukumar confirms direction return' },
      { date: '2025-07-15', price: 118, volume: 20000000, newsEvent: 'International release confirmed' },
      { date: '2025-07-20', price: 125, volume: 25000000, newsEvent: 'Advance bookings open' },
      { date: '2025-07-24', price: 120, volume: 22000000, newsEvent: 'YouTube record teaser release' }
    ],
    marketCap: '₹850 Cr',
    volume: '15.2M IVC',
    newsFeed: [
      { date: '2025-07-24', headline: 'Pushpa 2 teaser breaks YouTube records with 50M views', source: 'BoxOffice India', impact: 'positive' },
      { date: '2025-07-20', headline: 'Advance bookings open across India', source: 'Trade Analyst', impact: 'positive' },
      { date: '2025-07-15', headline: 'International release confirmed in 15 countries', source: 'Variety', impact: 'positive' },
      { date: '2025-07-10', headline: 'Sukumar confirms return as director', source: 'Telugu Cinema', impact: 'positive' },
      { date: '2025-07-05', headline: 'Allu Arjun training videos go viral', source: 'Social Media', impact: 'positive' }
    ],
    fanHub: {
      totalFans: 2847592,
      teluguFans: 1947283,
      topFans: [
        { name: 'Ravi Kumar', location: 'Hyderabad, Telangana', profit: 45600, badge: 'Pushpa Army General', avatar: '👑' },
        { name: 'Priya Reddy', location: 'Vijayawada, AP', profit: 38200, badge: 'Telugu Cinema Expert', avatar: '🎬' },
        { name: 'Srinivas Rao', location: 'Guntur, AP', profit: 31850, badge: 'Stylish Star Fan', avatar: '⭐' },
        { name: 'Deepika Sharma', location: 'Warangal, Telangana', profit: 28900, badge: 'Mass Movie Specialist', avatar: '🔥' },
        { name: 'Krishna Murthy', location: 'Tirupati, AP', profit: 25700, badge: 'South Cinema Guru', avatar: '🏆' }
      ],
      isUserMember: false,
      specialEvents: ['Pushpa 2 Release Week Fan Fest', 'Telugu Cinema Celebration', 'Allu Arjun Birthday Special']
    },
    isFlashEvent: true,
    hypeLevel: 'extreme'
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
    historicalData: [
      { date: '2025-07-01', price: 110, volume: 18000000, newsEvent: 'Oscar win celebration' },
      { date: '2025-07-08', price: 105, volume: 20000000, newsEvent: 'Cast announcement delays' },
      { date: '2025-07-15', price: 100, volume: 16000000, newsEvent: 'Script development updates' },
      { date: '2025-07-18', price: 102, volume: 22000000, newsEvent: 'Budget increase news' },
      { date: '2025-07-23', price: 98, volume: 19000000, newsEvent: 'Photography timeline set' }
    ],
    marketCap: '₹1200 Cr',
    volume: '22.8M IVC',
    newsFeed: [
      { date: '2025-07-23', headline: 'Principal photography begins in September', source: 'Film Trade', impact: 'neutral' },
      { date: '2025-07-18', headline: 'Budget increased to ₹500 crores', source: 'Industry Insider', impact: 'positive' },
      { date: '2025-07-15', headline: 'Rajamouli working on enhanced script', source: 'Telugu Film News', impact: 'positive' },
      { date: '2025-07-08', headline: 'Minor delays in cast finalization', source: 'Trade Insider', impact: 'negative' }
    ],
    fanHub: {
      totalFans: 1982473,
      teluguFans: 1456789,
      topFans: [
        { name: 'Venkat Reddy', location: 'Karimnagar, Telangana', profit: 52300, badge: 'RRR Legend', avatar: '🏆' },
        { name: 'Lakshmi Devi', location: 'Nellore, AP', profit: 41200, badge: 'Rajamouli Fan', avatar: '🎬' },
        { name: 'Suresh Babu', location: 'Khammam, Telangana', profit: 38900, badge: 'Oscar Winner Supporter', avatar: '🏅' },
        { name: 'Anusha Patel', location: 'Kurnool, AP', profit: 33400, badge: 'Epic Cinema Lover', avatar: '⚡' }
      ],
      isUserMember: true,
      specialEvents: ['RRR 2 Script Reading', 'Rajamouli Birthday Celebration', 'Oscar Anniversary Event']
    },
    isFlashEvent: false,
    hypeLevel: 'high'
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
    historicalData: [
      { date: '2025-07-01', price: 140, volume: 14000000, newsEvent: 'Part 1 success celebration' },
      { date: '2025-07-05', price: 148, volume: 16000000, newsEvent: 'International collaboration news' },
      { date: '2025-07-12', price: 155, volume: 18000000, newsEvent: 'Prabhas training updates' },
      { date: '2025-07-19', price: 160, volume: 22000000, newsEvent: 'Part 1 crosses ₹1000 crores' },
      { date: '2025-07-22', price: 156, volume: 19000000, newsEvent: 'VFX work begins' }
    ],
    marketCap: '₹950 Cr',
    volume: '18.5M IVC',
    newsFeed: [
      { date: '2025-07-22', headline: 'VFX work begins with international studios', source: 'Hollywood Reporter', impact: 'positive' },
      { date: '2025-07-19', headline: 'Part 1 crosses ₹1000 crores worldwide', source: 'Sacnilk', impact: 'positive' },
      { date: '2025-07-12', headline: 'Prabhas begins intensive training for sequel', source: 'Telugu Cinema', impact: 'positive' }
    ],
    fanHub: {
      totalFans: 1567234,
      teluguFans: 892456,
      topFans: [
        { name: 'Rajesh Kumar', location: 'Anantapur, AP', profit: 42800, badge: 'Sci-Fi Specialist', avatar: '🚀' },
        { name: 'Meera Devi', location: 'Medak, Telangana', profit: 39600, badge: 'Prabhas Fan Club', avatar: '⭐' },
        { name: 'Sunil Reddy', location: 'Chittoor, AP', profit: 35400, badge: 'Future Cinema Expert', avatar: '🌟' }
      ],
      isUserMember: false,
      specialEvents: ['Kalki Universe Expansion', 'Sci-Fi Cinema Festival', 'Prabhas Birthday Celebration']
    },
    isFlashEvent: false,
    hypeLevel: 'high'
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
    historicalData: [
      { date: '2025-07-01', price: 130, volume: 10000000, newsEvent: 'Sequel announcement' },
      { date: '2025-07-08', price: 138, volume: 12000000, newsEvent: 'SRK confirms return' },
      { date: '2025-07-17', price: 145, volume: 15000000, newsEvent: 'Deepika Padukone returns' },
      { date: '2025-07-21', price: 142, volume: 13000000, newsEvent: 'Dubai shooting begins' }
    ],
    marketCap: '₹800 Cr',
    volume: '12.3M IVC',
    newsFeed: [
      { date: '2025-07-21', headline: 'Shooting begins in Dubai and Istanbul', source: 'Mid-Day', impact: 'positive' },
      { date: '2025-07-17', headline: 'Deepika Padukone confirmed to return', source: 'Pinkvilla', impact: 'positive' }
    ],
    fanHub: {
      totalFans: 987654,
      teluguFans: 234567,
      topFans: [
        { name: 'Arjun Shah', location: 'Hyderabad, Telangana', profit: 28900, badge: 'Action Movie Expert', avatar: '🎬' },
        { name: 'Kavitha Nair', location: 'Visakhapatnam, AP', profit: 25600, badge: 'SRK Fan', avatar: '👑' }
      ],
      isUserMember: false,
      specialEvents: ['Action Thriller Night', 'Bollywood Blockbuster Event']
    },
    isFlashEvent: false,
    hypeLevel: 'medium'
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
    historicalData: [
      { date: '2025-07-01', price: 105, volume: 8000000, newsEvent: 'Part 1 mixed reception' },
      { date: '2025-07-08', price: 98, volume: 7000000, newsEvent: 'Script revision news' },
      { date: '2025-07-16', price: 90, volume: 9000000, newsEvent: 'Marvel VFX team joins' },
      { date: '2025-07-20', price: 89, volume: 6000000, newsEvent: 'Production delayed' }
    ],
    marketCap: '₹650 Cr',
    volume: '9.8M IVC',
    newsFeed: [
      { date: '2025-07-20', headline: 'Pre-production delayed to 2026', source: 'Bollywood Hungama', impact: 'negative' },
      { date: '2025-07-16', headline: 'VFX team from Marvel Studios joins project', source: 'Variety India', impact: 'positive' }
    ],
    fanHub: {
      totalFans: 654321,
      teluguFans: 156789,
      topFans: [
        { name: 'Vishnu Prasad', location: 'Nizamabad, Telangana', profit: 15600, badge: 'Fantasy Specialist', avatar: '✨' },
        { name: 'Divya Rao', location: 'Kadapa, AP', profit: 12300, badge: 'Mythology Expert', avatar: '🔮' }
      ],
      isUserMember: false,
      specialEvents: ['Astraverse Deep Dive', 'Mythology Cinema Festival']
    },
    isFlashEvent: false,
    hypeLevel: 'low'
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
    historicalData: [
      { date: '2025-07-01', price: 165, volume: 25000000, newsEvent: 'IPL 2025 retention announcement' },
      { date: '2025-07-08', price: 160, volume: 28000000, newsEvent: 'Dhoni leadership confirmed' },
      { date: '2025-07-15', price: 157, volume: 26000000, newsEvent: 'New coaching staff discussions' },
      { date: '2025-07-18', price: 158, volume: 30000000, newsEvent: 'Sponsorship deal extended' },
      { date: '2025-07-22', price: 156, volume: 32000000, newsEvent: 'Dhoni confirms availability' },
      { date: '2025-07-24', price: 155, volume: 29000000, newsEvent: 'New coaching staff announced' }
    ],
    marketCap: '₹1100 Cr',
    volume: '28.5M IVC',
    newsFeed: [
      { date: '2025-07-24', headline: 'CSK announces new coaching staff for IPL 2025', source: 'ESPNCricinfo', impact: 'positive' },
      { date: '2025-07-22', headline: 'MS Dhoni confirms availability for next season', source: 'Cricbuzz', impact: 'positive' },
      { date: '2025-07-18', headline: 'Team sponsors extend partnership by 3 years', source: 'SportsBusiness', impact: 'positive' },
      { date: '2025-07-15', headline: 'Strategic planning for IPL 2025 begins', source: 'Tamil Nadu Cricket', impact: 'neutral' },
      { date: '2025-07-08', headline: 'Dhoni to continue as captain and mentor', source: 'Chennai Sports', impact: 'positive' }
    ],
    fanHub: {
      totalFans: 4562891,
      teluguFans: 1892456,
      topFans: [
        { name: 'Karthik Raj', location: 'Chennai, Tamil Nadu', profit: 67800, badge: 'Dhoni Army General', avatar: '🏆' },
        { name: 'Pradeep Kumar', location: 'Guntur, AP', profit: 54200, badge: 'Whistle Podu Champion', avatar: '💛' },
        { name: 'Sunitha Reddy', location: 'Madurai, Tamil Nadu', profit: 48600, badge: 'CSK Loyalist', avatar: '🦁' },
        { name: 'Ramesh Nair', location: 'Warangal, Telangana', profit: 43900, badge: 'Yellow Brigade Leader', avatar: '⭐' },
        { name: 'Divya Krishnan', location: 'Coimbatore, Tamil Nadu', profit: 41200, badge: 'Super Kings Expert', avatar: '👑' }
      ],
      isUserMember: true,
      specialEvents: ['Dhoni Birthday Celebration', 'CSK Trophy Day', 'Whistle Podu Festival', 'Tamil Nadu Cricket Day']
    },
    isFlashEvent: false,
    hypeLevel: 'high'
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
    historicalData: [
      { date: '2025-07-01', price: 155, volume: 28000000, newsEvent: 'IPL success celebration' },
      { date: '2025-07-05', price: 162, volume: 30000000, newsEvent: 'Rohit Sharma contract talks' },
      { date: '2025-07-12', price: 167, volume: 32000000, newsEvent: 'Academy expansion plans' },
      { date: '2025-07-19', price: 170, volume: 35000000, newsEvent: 'Record sponsorship deal' },
      { date: '2025-07-21', price: 169, volume: 34000000, newsEvent: 'Academy expansion announced' },
      { date: '2025-07-23', price: 168, volume: 33000000, newsEvent: 'Rohit retained as captain' }
    ],
    marketCap: '₹1250 Cr',
    volume: '32.1M IVC',
    newsFeed: [
      { date: '2025-07-23', headline: 'Rohit Sharma retained as captain for IPL 2025', source: 'Times of India', impact: 'positive' },
      { date: '2025-07-21', headline: 'MI announces academy expansion to 5 new cities', source: 'Indian Express', impact: 'positive' },
      { date: '2025-07-19', headline: 'Record sponsorship deal signed worth ₹200 crores', source: 'Business Standard', impact: 'positive' },
      { date: '2025-07-12', headline: 'Youth development program launched', source: 'Mumbai Cricket', impact: 'positive' }
    ],
    fanHub: {
      totalFans: 5123456,
      teluguFans: 567890,
      topFans: [
        { name: 'Rohit Patel', location: 'Mumbai, Maharashtra', profit: 72500, badge: 'MI Champion', avatar: '🔵' },
        { name: 'Arjun Mehta', location: 'Pune, Maharashtra', profit: 65300, badge: 'Paltan Leader', avatar: '⚡' },
        { name: 'Sneha Joshi', location: 'Nagpur, Maharashtra', profit: 58700, badge: 'Blue Army General', avatar: '💙' },
        { name: 'Venkat Rao', location: 'Hyderabad, Telangana', profit: 51200, badge: 'MI Telugu Fan', avatar: '🏆' }
      ],
      isUserMember: false,
      specialEvents: ['MI Trophy Celebration', 'Rohit Sharma Day', 'Mumbai Cricket Festival', 'Paltan Pride Day']
    },
    isFlashEvent: true,
    hypeLevel: 'extreme'
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
    historicalData: [
      { date: '2025-07-01', price: 120, volume: 22000000, newsEvent: 'IPL season analysis' },
      { date: '2025-07-08', price: 128, volume: 24000000, newsEvent: 'Training facility plans' },
      { date: '2025-07-17', price: 135, volume: 28000000, newsEvent: 'Fan engagement peak' },
      { date: '2025-07-20', price: 138, volume: 30000000, newsEvent: 'Training facility investment' },
      { date: '2025-07-24', price: 134, volume: 26000000, newsEvent: 'Kohli contract extension' }
    ],
    marketCap: '₹950 Cr',
    volume: '25.7M IVC',
    newsFeed: [
      { date: '2025-07-24', headline: 'Virat Kohli extends contract till 2027', source: 'Hindustan Times', impact: 'positive' },
      { date: '2025-07-20', headline: 'RCB invests in state-of-the-art training facility', source: 'Deccan Herald', impact: 'positive' },
      { date: '2025-07-17', headline: 'Fan engagement reaches all-time high', source: 'SportsTak', impact: 'positive' }
    ],
    fanHub: {
      totalFans: 6789012,
      teluguFans: 1234567,
      topFans: [
        { name: 'Anand Kumar', location: 'Bangalore, Karnataka', profit: 89400, badge: 'RCB Army Commander', avatar: '❤️' },
        { name: 'Priya Sharma', location: 'Hubli, Karnataka', profit: 76200, badge: 'Kohli Fan Club', avatar: '👑' },
        { name: 'Sanjay Reddy', location: 'Mysore, Karnataka', profit: 68900, badge: 'Bold Diaries Expert', avatar: '🔥' },
        { name: 'Rakesh Rao', location: 'Warangal, Telangana', profit: 61500, badge: 'RCB Telugu Brigade', avatar: '⚡' }
      ],
      isUserMember: false,
      specialEvents: ['RCB Bold Day', 'Kohli Birthday Special', 'Bangalore Cricket Festival', 'Ee Sala Cup Namde Campaign']
    },
    isFlashEvent: true,
    hypeLevel: 'extreme'
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
    historicalData: [
      { date: '2025-07-01', price: 125, volume: 18000000, newsEvent: 'Season review meeting' },
      { date: '2025-07-08', price: 127, volume: 19000000, newsEvent: 'Strategic planning session' },
      { date: '2025-07-18', price: 130, volume: 21000000, newsEvent: 'CPL partnership announcement' },
      { date: '2025-07-21', price: 128, volume: 20000000, newsEvent: 'Eden Gardens upgrade' },
      { date: '2025-07-23', price: 128, volume: 19500000, newsEvent: 'Youth program launch' }
    ],
    marketCap: '₹875 Cr',
    volume: '19.3M IVC',
    newsFeed: [
      { date: '2025-07-23', headline: 'KKR announces youth development program', source: 'Telegraph India', impact: 'positive' },
      { date: '2025-07-21', headline: 'Eden Gardens gets major infrastructure upgrade', source: 'Times Now', impact: 'positive' },
      { date: '2025-07-18', headline: 'Strategic partnership with Caribbean Premier League', source: 'Cricket.com', impact: 'positive' }
    ],
    fanHub: {
      totalFans: 3456789,
      teluguFans: 456789,
      topFans: [
        { name: 'Sourav Das', location: 'Kolkata, West Bengal', profit: 45600, badge: 'Purple Army Leader', avatar: '💜' },
        { name: 'Ritika Sen', location: 'Durgapur, West Bengal', profit: 38900, badge: 'KKR Loyalist', avatar: '⚔️' },
        { name: 'Manoj Gupta', location: 'Siliguri, West Bengal', profit: 34200, badge: 'Knight Rider', avatar: '🏆' }
      ],
      isUserMember: false,
      specialEvents: ['KKR Knights Day', 'Eden Gardens Special', 'Purple Brigade Meet', 'SRK Birthday Celebration']
    },
    isFlashEvent: false,
    hypeLevel: 'medium'
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
    historicalData: [
      { date: '2025-07-01', price: 118, volume: 15000000, newsEvent: 'Youth focus strategy' },
      { date: '2025-07-08', price: 114, volume: 16000000, newsEvent: 'Academy partnerships' },
      { date: '2025-07-16', price: 114, volume: 17000000, newsEvent: 'Local academy partnerships' },
      { date: '2025-07-19', price: 113, volume: 16500000, newsEvent: 'Practice facility opening' },
      { date: '2025-07-22', price: 112, volume: 16000000, newsEvent: 'Domestic talent focus' }
    ],
    marketCap: '₹780 Cr',
    volume: '16.8M IVC',
    newsFeed: [
      { date: '2025-07-22', headline: 'DC focuses on domestic talent for next auction', source: 'News18', impact: 'neutral' },
      { date: '2025-07-19', headline: 'New practice facility inaugurated in Delhi', source: 'India Today', impact: 'positive' },
      { date: '2025-07-16', headline: 'Partnership with local cricket academies announced', source: 'NDTV Sports', impact: 'positive' }
    ],
    fanHub: {
      totalFans: 2345678,
      teluguFans: 234567,
      topFans: [
        { name: 'Rohit Sharma', location: 'Delhi, Delhi', profit: 32100, badge: 'Capitals Commander', avatar: '🔵' },
        { name: 'Neha Agarwal', location: 'Gurgaon, Haryana', profit: 28700, badge: 'Delhi Daredevil', avatar: '💙' },
        { name: 'Amit Singh', location: 'Noida, UP', profit: 25300, badge: 'Young Guns Expert', avatar: '⚡' }
      ],
      isUserMember: false,
      specialEvents: ['Delhi Capitals Day', 'Youth Cricket Festival', 'Capital City Pride']
    },
    isFlashEvent: false,
    hypeLevel: 'low'
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
    historicalData: [
      { date: '2025-07-01', price: 92, volume: 12000000, newsEvent: 'Season planning begins' },
      { date: '2025-07-08', price: 96, volume: 13000000, newsEvent: 'Talent scouting expansion' },
      { date: '2025-07-17', price: 97, volume: 14000000, newsEvent: 'Sustainability initiatives' },
      { date: '2025-07-20', price: 100, volume: 15000000, newsEvent: 'International scouting network' },
      { date: '2025-07-24', price: 98, volume: 14500000, newsEvent: 'Grassroots program launch' }
    ],
    marketCap: '₹695 Cr',
    volume: '14.2M IVC',
    newsFeed: [
      { date: '2025-07-24', headline: 'RR launches grassroots cricket program in Rajasthan', source: 'Rajasthan Patrika', impact: 'positive' },
      { date: '2025-07-20', headline: 'International scouting network expanded', source: 'Cricinfo', impact: 'positive' },
      { date: '2025-07-17', headline: 'Sustainability initiative makes RR carbon neutral', source: 'Environmental Times', impact: 'positive' }
    ],
    fanHub: {
      totalFans: 1876543,
      teluguFans: 187654,
      topFans: [
        { name: 'Rajesh Sharma', location: 'Jaipur, Rajasthan', profit: 29800, badge: 'Royal Supporter', avatar: '👑' },
        { name: 'Priya Meena', location: 'Udaipur, Rajasthan', profit: 26500, badge: 'Royals Ambassador', avatar: '💙' },
        { name: 'Suresh Jain', location: 'Jodhpur, Rajasthan', profit: 23100, badge: 'Desert Storm Fan', avatar: '🏜️' }
      ],
      isUserMember: false,
      specialEvents: ['Rajasthan Royals Day', 'Desert Cricket Festival', 'Royal Heritage Celebration']
    },
    isFlashEvent: false,
    hypeLevel: 'medium'
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

// Demo leaderboard users
export const demoLeaderboardUsers: DemoUser[] = [
  {
    id: '1',
    name: 'Venkat Reddy',
    location: 'Hyderabad, Telangana',
    totalProfit: 125600,
    bestTrade: 'Pushpa 2 bought at ₹95, sold at ₹125',
    tradesCount: 847,
    specialBadges: ['Telugu Cinema Expert', 'Flash Market Champion', 'Top Performer'],
    avatar: '👑'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Vijayawada, AP',
    totalProfit: 98400,
    bestTrade: 'CSK bought at ₹140, current ₹156',
    tradesCount: 623,
    specialBadges: ['Cricket Specialist', 'Dhoni Army General'],
    avatar: '🏆'
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    location: 'Bangalore, Karnataka',
    totalProfit: 87200,
    bestTrade: 'RCB massive gain during Kohli contract news',
    tradesCount: 756,
    specialBadges: ['RCB Army Commander', 'Bold Diaries Expert'],
    avatar: '❤️'
  },
  {
    id: '4',
    name: 'Lakshmi Devi',
    location: 'Guntur, AP',
    totalProfit: 76800,
    bestTrade: 'Perfect timing on Kalki 2 VFX announcement',
    tradesCount: 534,
    specialBadges: ['Sci-Fi Specialist', 'Regional Pride'],
    avatar: '⭐'
  },
  {
    id: '5',
    name: 'Suresh Babu',
    location: 'Warangal, Telangana',
    totalProfit: 69500,
    bestTrade: 'MI championship prediction trade',
    tradesCount: 489,
    specialBadges: ['Cricket Guru', 'Mumbai Indians Expert'],
    avatar: '🔵'
  }
];

// Flash market events data
export const flashMarketEvents = [
  {
    id: 'flash1',
    assetId: 'pushpa2',
    title: 'Pushpa 2 Flash Event',
    description: 'Breaking: Pushpa 2 teaser crosses 75M views! Trade NOW for bonus IVC rewards!',
    multiplier: 2.5,
    timeLeft: 847, // seconds
    isActive: true,
    participants: 15647
  },
  {
    id: 'flash2',
    assetId: 'rcb',
    title: 'RCB Flash Event',
    description: 'Kohli contract extension news creates market surge! High-reward trading live!',
    multiplier: 2.0,
    timeLeft: 1203,
    isActive: true,
    participants: 12934
  }
];

// Trending now data
export const trendingAssets = {
  mostTraded: ['pushpa2', 'rcb', 'csk', 'mi', 'kalki2'],
  mostWatched: ['rrr2', 'pushpa2', 'rcb', 'pathaan2', 'kkr'],
  mostDiscussed: ['pushpa2', 'rcb', 'csk', 'kalki2', 'mi'],
  flashEvents: ['pushpa2', 'rcb'],
  topGainers: ['rcb', 'pushpa2', 'kalki2', 'mi', 'rr'],
  topLosers: ['rrr2', 'brahmastra2', 'csk', 'dc']
};

// Mock news ticker for homepage
export const mockNewsTicker = [
  '🚀 Flash Event Live: Pushpa 2 teaser breaks all records!',
  '⚡ RCB Flash Trading: Kohli contract extension triggers surge!',
  '🏆 CSK announces retention strategy for IPL 2025',
  '💰 Mumbai Indians signs record ₹200 crore sponsorship deal',
  '🎬 RRR 2 budget increases to massive ₹500 crores',
  '👑 Virat Kohli extends RCB contract till 2027',
  '🚀 Kalki 2898 AD Part 2 begins international VFX work',
  '🔥 Telugu Cinema takes over: 3 movies in top 5 trending',
  '⭐ Fan Hubs growing: 4.5M Telugu fans joined this week'
];