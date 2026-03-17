import CheckoutHeader from "../components/addresses/CheckoutHeader";
import AddressSection from "../components/addresses/AddressSection";
import PriceDetail from "../components/addresses/PriceDetail";
import SecureInfo from "../components/addresses/SecureInfo";
import OrderSummaryHeader from "../components/addresses/OrderSummaryHeader";
import { useLocation } from "react-router-dom";


const Address = () => {

  const location = useLocation();
const buyProduct = location.state?.product;

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

        {/* LEFT */}
        <div>
          {/* LOGIN (separate box) */}
          <CheckoutHeader />

          {/* space ONLY here */}
          <div className="h-4" />

          {/* DELIVERY ADDRESS + addresses (sticked) */}
          <AddressSection />
          <OrderSummaryHeader />
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <PriceDetail />
          <SecureInfo />
        </div>

      </div>
    </div>
  );
};

export default Address;
