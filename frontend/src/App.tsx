import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/customer/Home';
import Menu from './pages/customer/Menu';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderSuccess from './pages/customer/OrderSuccess';
import OrderFailed from './pages/customer/OrderFailed';
import TrackOrder from './pages/customer/TrackOrder';
import Contact from './pages/customer/Contact';
import About from './pages/customer/About';

import CustomerLogin from './pages/customer/LoginPage';
import LoginPage from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import BookingManagement from './pages/admin/BookingManagement';
import MenuManagement from './pages/admin/MenuManagement';
import Orders from './pages/admin/Orders';
import StockManagement from './pages/admin/StockManagement';
import Settings from './pages/admin/Settings';
import { useThemeStore } from './store/useThemeStore';
import ScrollToTop from './components/shared/ScrollToTop';

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin Auth */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="order-failed" element={<OrderFailed />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />

          <Route path="login" element={<CustomerLogin />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="orders" element={<Orders />} />
          <Route path="stock" element={<StockManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
