import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema, insertWatchlistSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Assets routes
  app.get("/api/assets", async (req, res) => {
    try {
      const assets = await storage.getAllAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assets" });
    }
  });

  app.get("/api/assets/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const assets = await storage.getAssetsByType(type);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assets by type" });
    }
  });

  // Portfolio routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const userId = 1; // For demo, using default user
      const portfolio = await storage.getUserPortfolio(userId);
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio" });
    }
  });

  // Transactions routes
  app.get("/api/transactions", async (req, res) => {
    try {
      const userId = 1; // For demo, using default user
      const transactions = await storage.getUserTransactions(userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const userId = 1; // For demo, using default user
      const validatedData = insertTransactionSchema.parse({
        ...req.body,
        userId,
      });

      // Check if user has sufficient wallet balance for BUY orders
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const totalCost = parseFloat(validatedData.totalAmount);
      const currentWalletBalance = parseFloat(user.walletBalance);

      if (validatedData.type === "BUY" && currentWalletBalance < totalCost) {
        return res.status(400).json({ 
          message: "Insufficient wallet balance",
          required: totalCost,
          available: currentWalletBalance
        });
      }

      // Create transaction
      const transaction = await storage.createTransaction(validatedData);

      // Update wallet balance and portfolio
      if (validatedData.type === "BUY") {
        // Deduct from wallet
        const newWalletBalance = (currentWalletBalance - totalCost).toFixed(2);
        await storage.updateWalletBalance(userId, newWalletBalance);

        // Update portfolio
        await storage.createOrUpdatePortfolio({
          userId,
          assetId: validatedData.assetId,
          quantity: validatedData.quantity,
          averagePrice: validatedData.price,
        });
      } else if (validatedData.type === "SELL") {
        // Add to wallet
        const newWalletBalance = (currentWalletBalance + totalCost).toFixed(2);
        await storage.updateWalletBalance(userId, newWalletBalance);

        // Update portfolio (reduce quantity)
        const portfolioItem = await storage.getPortfolioItem(userId, validatedData.assetId);
        if (portfolioItem && portfolioItem.quantity >= validatedData.quantity) {
          const newQuantity = portfolioItem.quantity - validatedData.quantity;
          if (newQuantity > 0) {
            await storage.createOrUpdatePortfolio({
              userId,
              assetId: validatedData.assetId,
              quantity: -validatedData.quantity, // Negative to reduce quantity
              averagePrice: validatedData.price,
            });
          }
        }
      }

      res.json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Invalid transaction data" });
    }
  });

  // Watchlist routes
  app.get("/api/watchlist", async (req, res) => {
    try {
      const userId = 1; // For demo, using default user
      const watchlist = await storage.getUserWatchlist(userId);
      res.json(watchlist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watchlist" });
    }
  });

  app.post("/api/watchlist", async (req, res) => {
    try {
      const userId = 1; // For demo, using default user
      const validatedData = insertWatchlistSchema.parse({
        ...req.body,
        userId,
      });

      const watchlistItem = await storage.addToWatchlist(validatedData);
      res.json(watchlistItem);
    } catch (error) {
      res.status(400).json({ message: "Invalid watchlist data" });
    }
  });

  app.delete("/api/watchlist/:assetId", async (req, res) => {
    try {
      const userId = 1; // For demo, using default user
      const assetId = parseInt(req.params.assetId);
      await storage.removeFromWatchlist(userId, assetId);
      res.json({ message: "Removed from watchlist" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from watchlist" });
    }
  });

  // Dashboard data
  app.get("/api/dashboard", async (req, res) => {
    try {
      const userId = 1; // For demo, using default user
      const [portfolio, transactions, watchlist] = await Promise.all([
        storage.getUserPortfolio(userId),
        storage.getUserTransactions(userId),
        storage.getUserWatchlist(userId),
      ]);

      // Calculate portfolio metrics
      let totalValue = 0;
      let totalInvested = 0;

      portfolio.forEach(item => {
        const currentValue = parseFloat(item.asset.currentPrice) * item.quantity;
        const investedValue = parseFloat(item.averagePrice) * item.quantity;
        totalValue += currentValue;
        totalInvested += investedValue;
      });

      const todayPL = totalValue - totalInvested;
      const plPercentage = totalInvested > 0 ? ((todayPL / totalInvested) * 100) : 0;

      // Get top performers (assets with highest gains)
      const topPerformers = portfolio
        .filter(item => {
          const currentPrice = parseFloat(item.asset.currentPrice);
          const avgPrice = parseFloat(item.averagePrice);
          return currentPrice > avgPrice;
        })
        .sort((a, b) => {
          const gainA = (parseFloat(a.asset.currentPrice) - parseFloat(a.averagePrice)) / parseFloat(a.averagePrice);
          const gainB = (parseFloat(b.asset.currentPrice) - parseFloat(b.averagePrice)) / parseFloat(b.averagePrice);
          return gainB - gainA;
        })
        .slice(0, 3);

      // Get user for wallet info
      const user = await storage.getUser(userId);

      const dashboardData = {
        portfolio: {
          total: totalValue.toFixed(2),
          todayPL: todayPL.toFixed(2),
          plPercentage: plPercentage.toFixed(1),
          activeAssets: portfolio.length,
          balance: user?.balance || "125000.00",
          walletBalance: user?.walletBalance || "15000.00",
        },
        topPerformers,
        watchlist: watchlist.slice(0, 3),
        recentTransactions: transactions.slice(0, 3),
      };

      res.json(dashboardData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Wallet routes
  app.get("/api/wallet", async (req, res) => {
    try {
      const userId = 1; // For demo, using default user
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        walletBalance: user.walletBalance,
        totalCreditsEarned: user.totalCreditsEarned,
        availableBalance: user.balance,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wallet data" });
    }
  });

  app.post("/api/wallet/add-credits", async (req, res) => {
    try {
      const userId = 1; // For demo, using default user
      const { amount } = req.body;
      
      if (!amount || parseFloat(amount) <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }

      await storage.addCreditsToWallet(userId, amount);
      const user = await storage.getUser(userId);
      
      res.json({
        message: "Credits added successfully",
        walletBalance: user?.walletBalance,
        totalCreditsEarned: user?.totalCreditsEarned,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to add credits" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
