import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/HomeNav/Sidebar"
import Topbar from "./components/HomeNav/Topbar"
import WishlistPage from "./pages/WishlistPage"
import CreateListPage from "./pages/CreateListPage"
import ListPage from "./pages/ListPage"



import ExplorePage from "./components/Explore/ExplorePage"
import SearchPage from "./components/SearchPage/SearchPage"
import HelpSupport from "./components/HelpSupport"

import Cart from "./pages/Cart"
import Address from "./pages/Address"
import Payment from "./pages/Payment"
import Orders from "./pages/Orders"
import OrderDetails from "./pages/OrderDetails"
import ProfilePage from "./pages/ProfilePage"

/* ✅ NEW SUPPORT PAGES */
import OrdersSupport from "./pages/OrdersSupport"
import ReturnsSupport from "./pages/ReturnsSupport"
import PaymentsSupport from "./pages/PaymentsSupport"
import AccountSupport from "./pages/AccountSupport"
import PrivacySupport from "./pages/PrivacySupport"
import GiftCardsSupport from "./pages/GiftCardsSupport"

//Product Details
import TopProducts from "./components/Explore/TopProducts";
import ProductDetails from "./components/Explore/ProductDetails";

function AppContent() {
  return (
    <div className="flex h-screen bg-white text-gray-800">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Topbar />

        <div className="flex-1 overflow-y-auto bg-gray-50">
          <Routes>
            
            {/* Main Pages */}
            <Route path="/" element={<ExplorePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />
            <Route path="/payment" element={<Payment />} />

            // Product Details
            
        <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Orders */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />

            {/* Help & Support Main Page */}
            <Route path="/help-support" element={<HelpSupport />} />

            {/* ✅ Support Topic Pages */}
           {/* Help & Support Main Page */}
<Route path="/help-support" element={<HelpSupport />} />

{/* Support Topic Pages */}
<Route path="/orders" element={<OrdersSupport />} />
<Route path="/returns" element={<ReturnsSupport />} />
<Route path="/payments" element={<PaymentsSupport />} />
<Route path="/account" element={<AccountSupport />} />
<Route path="/privacy" element={<PrivacySupport />} />
<Route path="/gift-cards" element={<GiftCardsSupport />} />

<Route path="/wishlist" element={<WishlistPage />} />

<Route path="/create-list" element={<CreateListPage />} />
<Route path="/list/:name" element={<ListPage />} />



          </Routes>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
