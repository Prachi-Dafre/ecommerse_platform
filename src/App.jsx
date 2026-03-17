import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/HomeNav/Sidebar"
import Topbar from "./components/HomeNav/Topbar"
import ExplorePage from "./pages/Home"
import Cart from "./pages/Cart"
import Address from "./pages/Address"
import Payment from "./pages/Payment"
import SearchPage from "./components/SearchPage/SearchPage"

//Product Details
import TopProducts from "./components/HomeExplore/TopProducts";
import ProductDetails from "./components/Product/ProductDetails";

function AppContent() {
  return (
    <div className="flex h-screen bg-white text-gray-800">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-white">
        <Topbar />

        <div className="flex-1 overflow-y-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />
            <Route path="/payment" element={<Payment />} />

            // Product Details

            <Route path="/product/:slug" element={<ProductDetails />} />

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
