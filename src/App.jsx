import React, { useState, useEffect } from 'react';
import HazardTicker from './components/HazardTicker';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';

// Dedicated Full Pages
import HomePage from './pages/HomePage';
import CustomStudioPage from './pages/CustomStudioPage';
import LookbookPage from './pages/LookbookPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';

import { PRODUCTS } from './data/products';
import { audioFX } from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '').trim();
    return ['home', 'custom', 'lookbook', 'track', 'profile', 'checkout'].includes(hash)
      ? hash
      : 'home';
  });

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  // Sync hash changes with browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (['home', 'custom', 'lookbook', 'track', 'profile', 'checkout'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    audioFX.playFlick();
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart handler
  const handleAddToCart = (productWithSelection) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === productWithSelection.id && item.selectedSize === productWithSelection.selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.id === productWithSelection.id && item.selectedSize === productWithSelection.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...productWithSelection, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    audioFX.playFlick();
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
  };

  const handleAddBoxToCart = () => {
    const boxProduct = PRODUCTS.find((p) => p.id === 'totka-06');
    if (boxProduct) {
      handleAddToCart({
        ...boxProduct,
        selectedSize: 'L'
      });
      setCartOpen(true);
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#121212] flex flex-col font-sans selection:bg-[#FFB800] selection:text-black">
      
      {/* 1. Sleek Top Hazard Ticker (Luxury Monochrome + Vermillion Accents) */}
      <HazardTicker />

      {/* 2. Sticky Brand Header with Multi-Page Navigation */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 3. Main Multi-Page Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onAddToCart={handleAddToCart}
            onOpenProductDetail={(prod) => setSelectedProductDetail(prod)}
            onAddBoxToCart={handleAddBoxToCart}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'custom' && (
          <CustomStudioPage 
            onAddToCart={(customProduct) => {
              handleAddToCart(customProduct);
              setCartOpen(true);
            }}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'lookbook' && (
          <LookbookPage 
            onNavigate={navigateTo}
            onOpenProductDetail={(prod) => setSelectedProductDetail(prod)}
          />
        )}

        {currentPage === 'track' && (
          <TrackOrderPage 
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'profile' && (
          <ProfilePage 
            onNavigate={navigateTo}
            onSelectOrderToTrack={(order) => {
              navigateTo('track');
            }}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage 
            cart={cart}
            onOrderPlaced={() => {
              setCart([]);
            }}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* 4. Refined Minimal Streetwear Footer with Payment Gateways */}
      <Footer onNavigate={navigateTo} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => navigateTo('checkout')}
      />

      {/* High-Resolution Cloth View Modal */}
      <ProductDetailModal 
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
