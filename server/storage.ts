import {
  users,
  assets,
  portfolios,
  transactions,
  watchlists,
  type User,
  type InsertUser,
  type Asset,
  type InsertAsset,
  type Portfolio,
  type InsertPortfolio,
  type Transaction,
  type InsertTransaction,
  type Watchlist,
  type InsertWatchlist,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserBalance(userId: number, balance: string): Promise<void>;

  // Assets
  getAllAssets(): Promise<Asset[]>;
  getAsset(id: number): Promise<Asset | undefined>;
  getAssetsByType(type: string): Promise<Asset[]>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAssetPrice(id: number, currentPrice: string, previousPrice: string): Promise<void>;

  // Portfolio
  getUserPortfolio(userId: number): Promise<(Portfolio & { asset: Asset })[]>;
  getPortfolioItem(userId: number, assetId: number): Promise<Portfolio | undefined>;
  createOrUpdatePortfolio(portfolio: InsertPortfolio): Promise<void>;

  // Transactions
  getUserTransactions(userId: number): Promise<(Transaction & { asset: Asset })[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Watchlist
  getUserWatchlist(userId: number): Promise<(Watchlist & { asset: Asset })[]>;
  addToWatchlist(watchlist: InsertWatchlist): Promise<Watchlist>;
  removeFromWatchlist(userId: number, assetId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assets: Map<number, Asset>;
  private portfolios: Map<string, Portfolio>;
  private transactions: Map<number, Transaction>;
  private watchlists: Map<string, Watchlist>;
  private currentUserId: number;
  private currentAssetId: number;
  private currentPortfolioId: number;
  private currentTransactionId: number;
  private currentWatchlistId: number;

  constructor() {
    this.users = new Map();
    this.assets = new Map();
    this.portfolios = new Map();
    this.transactions = new Map();
    this.watchlists = new Map();
    this.currentUserId = 1;
    this.currentAssetId = 1;
    this.currentPortfolioId = 1;
    this.currentTransactionId = 1;
    this.currentWatchlistId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const defaultUser: User = {
      id: 1,
      username: "demo",
      password: "demo",
      balance: "125000.00",
    };
    this.users.set(1, defaultUser);
    this.currentUserId = 2;

    // Initialize assets
    const initialAssets: Omit<Asset, 'id'>[] = [
      {
        name: "Pathaan",
        symbol: "PATH",
        type: "movie",
        currentPrice: "850.00",
        previousPrice: "680.00",
        marketCap: "2520000000.00",
        imageUrl: "https://images.unsplash.com/photo-1489599904632-8421fd8675c2?w=400&h=600",
        description: "Bollywood Action",
        category: "Bollywood",
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Avatar 2",
        symbol: "AVT2",
        type: "movie",
        currentPrice: "2100.00",
        previousPrice: "1820.00",
        marketCap: "4200000000.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600",
        description: "Hollywood Sci-Fi",
        category: "Hollywood",
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Jawan",
        symbol: "JAWU",
        type: "movie",
        currentPrice: "720.00",
        previousPrice: "665.00",
        marketCap: "2520000000.00",
        imageUrl: "https://images.unsplash.com/photo-1489599904632-8421fd8675c2?w=400&h=600",
        description: "Shah Rukh Khan",
        category: "Bollywood",
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Mumbai Indians",
        symbol: "MI",
        type: "ipl_team",
        currentPrice: "1250.00",
        previousPrice: "1053.00",
        marketCap: "4280000000.00",
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400",
        description: "5 Titles",
        category: "IPL Team",
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Chennai Super Kings",
        symbol: "CSK",
        type: "ipl_team",
        currentPrice: "1180.00",
        previousPrice: "1208.00",
        marketCap: "3540000000.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400",
        description: "4 Titles",
        category: "IPL Team",
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Royal Challengers Bangalore",
        symbol: "RCB",
        type: "ipl_team",
        currentPrice: "980.00",
        previousPrice: "930.00",
        marketCap: "2940000000.00",
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400",
        description: "Virat Kohli",
        category: "IPL Team",
        isActive: true,
        createdAt: new Date(),
      },
    ];

    initialAssets.forEach((asset) => {
      const assetWithId: Asset = { ...asset, id: this.currentAssetId++ };
      this.assets.set(assetWithId.id, assetWithId);
    });

    // Initialize some portfolio items for demo user
    const portfolioItems: Omit<Portfolio, 'id'>[] = [
      { userId: 1, assetId: 1, quantity: 5, averagePrice: "680.00", createdAt: new Date() },
      { userId: 1, assetId: 4, quantity: 2, averagePrice: "1053.00", createdAt: new Date() },
      { userId: 1, assetId: 2, quantity: 3, averagePrice: "1820.00", createdAt: new Date() },
    ];

    portfolioItems.forEach((item) => {
      const portfolioKey = `${item.userId}-${item.assetId}`;
      const portfolioWithId: Portfolio = { ...item, id: this.currentPortfolioId++ };
      this.portfolios.set(portfolioKey, portfolioWithId);
    });

    // Initialize some transactions
    const transactionItems: Omit<Transaction, 'id'>[] = [
      {
        userId: 1,
        assetId: 1,
        type: "BUY",
        quantity: 5,
        price: "680.00",
        totalAmount: "3400.00",
        status: "completed",
        createdAt: new Date("2024-01-15"),
      },
      {
        userId: 1,
        assetId: 4,
        type: "SELL",
        quantity: 2,
        price: "1200.00",
        totalAmount: "2400.00",
        status: "completed",
        createdAt: new Date("2024-01-14"),
      },
      {
        userId: 1,
        assetId: 2,
        type: "BUY",
        quantity: 3,
        price: "1820.00",
        totalAmount: "5460.00",
        status: "completed",
        createdAt: new Date("2024-01-13"),
      },
    ];

    transactionItems.forEach((item) => {
      const transactionWithId: Transaction = { ...item, id: this.currentTransactionId++ };
      this.transactions.set(transactionWithId.id, transactionWithId);
    });

    // Initialize watchlist
    const watchlistItems: Omit<Watchlist, 'id'>[] = [
      { userId: 1, assetId: 5, createdAt: new Date() },
      { userId: 1, assetId: 3, createdAt: new Date() },
      { userId: 1, assetId: 6, createdAt: new Date() },
    ];

    watchlistItems.forEach((item) => {
      const watchlistKey = `${item.userId}-${item.assetId}`;
      const watchlistWithId: Watchlist = { ...item, id: this.currentWatchlistId++ };
      this.watchlists.set(watchlistKey, watchlistWithId);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, balance: "100000.00" };
    this.users.set(id, user);
    return user;
  }

  async updateUserBalance(userId: number, balance: string): Promise<void> {
    const user = this.users.get(userId);
    if (user) {
      user.balance = balance;
      this.users.set(userId, user);
    }
  }

  async getAllAssets(): Promise<Asset[]> {
    return Array.from(this.assets.values()).filter(asset => asset.isActive);
  }

  async getAsset(id: number): Promise<Asset | undefined> {
    return this.assets.get(id);
  }

  async getAssetsByType(type: string): Promise<Asset[]> {
    return Array.from(this.assets.values()).filter(asset => asset.type === type && asset.isActive);
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = this.currentAssetId++;
    const asset: Asset = { ...insertAsset, id, createdAt: new Date() };
    this.assets.set(id, asset);
    return asset;
  }

  async updateAssetPrice(id: number, currentPrice: string, previousPrice: string): Promise<void> {
    const asset = this.assets.get(id);
    if (asset) {
      asset.previousPrice = asset.currentPrice;
      asset.currentPrice = currentPrice;
      this.assets.set(id, asset);
    }
  }

  async getUserPortfolio(userId: number): Promise<(Portfolio & { asset: Asset })[]> {
    const userPortfolios = Array.from(this.portfolios.values()).filter(p => p.userId === userId);
    return userPortfolios.map(portfolio => ({
      ...portfolio,
      asset: this.assets.get(portfolio.assetId)!,
    })).filter(item => item.asset);
  }

  async getPortfolioItem(userId: number, assetId: number): Promise<Portfolio | undefined> {
    const key = `${userId}-${assetId}`;
    return this.portfolios.get(key);
  }

  async createOrUpdatePortfolio(insertPortfolio: InsertPortfolio): Promise<void> {
    const key = `${insertPortfolio.userId}-${insertPortfolio.assetId}`;
    const existing = this.portfolios.get(key);
    
    if (existing) {
      // Update existing portfolio item
      const totalValue = parseFloat(existing.averagePrice) * existing.quantity + 
                        parseFloat(insertPortfolio.averagePrice) * insertPortfolio.quantity;
      const totalQuantity = existing.quantity + insertPortfolio.quantity;
      
      existing.quantity = totalQuantity;
      existing.averagePrice = (totalValue / totalQuantity).toFixed(2);
      this.portfolios.set(key, existing);
    } else {
      // Create new portfolio item
      const portfolio: Portfolio = {
        ...insertPortfolio,
        id: this.currentPortfolioId++,
        createdAt: new Date(),
      };
      this.portfolios.set(key, portfolio);
    }
  }

  async getUserTransactions(userId: number): Promise<(Transaction & { asset: Asset })[]> {
    const userTransactions = Array.from(this.transactions.values())
      .filter(t => t.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return userTransactions.map(transaction => ({
      ...transaction,
      asset: this.assets.get(transaction.assetId)!,
    })).filter(item => item.asset);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getUserWatchlist(userId: number): Promise<(Watchlist & { asset: Asset })[]> {
    const userWatchlist = Array.from(this.watchlists.values()).filter(w => w.userId === userId);
    return userWatchlist.map(watchlist => ({
      ...watchlist,
      asset: this.assets.get(watchlist.assetId)!,
    })).filter(item => item.asset);
  }

  async addToWatchlist(insertWatchlist: InsertWatchlist): Promise<Watchlist> {
    const key = `${insertWatchlist.userId}-${insertWatchlist.assetId}`;
    const watchlist: Watchlist = {
      ...insertWatchlist,
      id: this.currentWatchlistId++,
      createdAt: new Date(),
    };
    this.watchlists.set(key, watchlist);
    return watchlist;
  }

  async removeFromWatchlist(userId: number, assetId: number): Promise<void> {
    const key = `${userId}-${assetId}`;
    this.watchlists.delete(key);
  }
}

export const storage = new MemStorage();
