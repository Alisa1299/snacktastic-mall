
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import EntryForm from "./pages/EntryForm";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Entry page as the default route */}
              <Route path="/" element={<EntryForm />} />
              
              {/* Main application routes with layout */}
              <Route path="/main" element={<MainLayout />}>
                <Route index element={<Index />} />
              </Route>
              
              <Route path="/cart" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Cart />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/product/:id" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <ProductDetail />
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// MainLayout component to wrap the main pages with Navbar and Footer
const MainLayout = () => {
  const [hasCustomerInfo, setHasCustomerInfo] = useState(false);
  
  useEffect(() => {
    // Check if customer info exists in localStorage
    const customerInfo = localStorage.getItem("customerInfo");
    setHasCustomerInfo(!!customerInfo);
  }, []);
  
  // If no customer info, redirect to entry form
  if (!hasCustomerInfo) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Index />
      </main>
      <Footer />
    </div>
  );
};

export default App;
