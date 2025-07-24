import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Marketplace from "@/pages/Marketplace";
import Movies from "@/pages/Movies";
import IplTeams from "@/pages/IplTeams";
import Portfolio from "@/pages/Portfolio";
import Watchlist from "@/pages/Watchlist";
import Transactions from "@/pages/Transactions";
import Leaderboard from "@/pages/Leaderboard";
import News from "@/pages/News";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/movies" component={Movies} />
        <Route path="/ipl-teams" component={IplTeams} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/watchlist" component={Watchlist} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/news" component={News} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
