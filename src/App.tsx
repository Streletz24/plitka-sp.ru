import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CatalogDetail from "./pages/CatalogDetail.tsx";
import Prices from "./pages/Prices.tsx";
import Sale from "./pages/Sale.tsx";
import Tiling from "./pages/Tiling.tsx";
import NotFound from "./pages/NotFound.tsx";
import ImageLightbox from "./components/ImageLightbox.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import CartDrawer from "./components/CartDrawer.tsx";
import ScrollToHash from "./components/ScrollToHash.tsx";
import AppErrorBoundary from "./components/AppErrorBoundary.tsx";

const queryClient = new QueryClient();
const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

const App = () => (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <Router>
            <ScrollToHash />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog/:slug" element={<CatalogDetail />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/tiling" element={<Tiling />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ImageLightbox />
            <CartDrawer />
          </Router>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
);

export default App;
