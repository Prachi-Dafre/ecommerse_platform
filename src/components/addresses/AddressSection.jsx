import { useEffect, useState } from "react";
import AddressCard from "./AddressCard";

const AddressSection = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    is_default: 0
  });

  useEffect(() => {
    localStorage.clear();

    const token = localStorage.getItem("token");
   
    fetch("https://fannest1.co.in/driftgear/api/v1/user/addresses.php", {
      headers: {
        "X-Auth-Token": token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        
        const addressList = data.data || data;
        setAddresses(addressList);

        // auto-select default address
        const defaultAddress = addressList.find(
          (addr) => addr.is_default === 1
        );
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        }
      })
      .catch((error) => {
        console.error("Error fetching addresses:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");

    fetch("https://fannest1.co.in/driftgear/api/v1/user/addresses.php", {
      method: "POST",
      headers: {
        "X-Auth-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddress)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Address added:", data);
        
        // Add the new address to the list
        setAddresses(prev => [...prev, data.data || data]);
        
        // Reset form
        setNewAddress({
          name: "",
          phone: "",
          address_line1: "",
          address_line2: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
          is_default: 0
        });
        
        setShowAddForm(false);
        alert("Address added successfully!");
      })
      .catch((error) => {
        console.error("Error adding address:", error);
        alert("Failed to add address. Please try again.");
      });
  };

  // Show only first 2 addresses initially, all when expanded
  const displayedAddresses = showAllAddresses ? addresses : addresses.slice(0, 2);

  return (
    <div className="bg-white border border-gray-200">

      {/* DELIVERY ADDRESS HEADER */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-400 text-white">
        <span className="bg-white text-blue-600 text-xs font-semibold px-2 py-1 rounded">
          2
        </span>
        <p className="text-sm font-semibold">DELIVERY ADDRESS</p>
      </div>

      {/* ADDRESS LIST */}
      <div className="divide-y divide-gray-200/40">
        {displayedAddresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selected={selectedAddressId === address.id}
            onSelect={setSelectedAddressId}
          />
        ))}
      </div>

      {/* VIEW ALL ADDRESSES */}
      {addresses.length > 2 && (
        <div 
          className="px-4 py-3 text-blue-600 text-sm font-medium cursor-pointer hover:bg-gray-50"
          onClick={() => setShowAllAddresses(!showAllAddresses)}
        >
          {showAllAddresses 
            ? `Show less` 
            : `View all ${addresses.length} addresses`}
        </div>
      )}

      {/* ADD NEW ADDRESS BUTTON */}
      <div 
        className="px-4 py-3 border-t border-gray-200/40 text-blue-600 text-sm font-medium cursor-pointer hover:bg-gray-50"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "- Cancel" : "+ Add a new address"}
      </div>

      {/* ADD ADDRESS FORM */}
      {showAddForm && (
        <form onSubmit={handleSubmitAddress} className="px-4 py-4 border-t border-gray-200/40 bg-gray-50">
          <h3 className="text-sm font-semibold mb-3">Add New Address</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={newAddress.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number *"
                value={newAddress.phone}
                onChange={handleInputChange}
                required
                maxLength="10"
                pattern="[0-9]{10}"
                className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-3">
            <input
              type="text"
              name="address_line1"
              placeholder="Address (House No, Building, Street, Area) *"
              value={newAddress.address_line1}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-3">
            <input
              type="text"
              name="address_line2"
              placeholder="Locality / Town *"
              value={newAddress.address_line2}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <input
                type="text"
                name="city"
                placeholder="City / District *"
                value={newAddress.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <input
                type="text"
                name="state"
                placeholder="State *"
                value={newAddress.state}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode *"
                value={newAddress.pincode}
                onChange={handleInputChange}
                required
                maxLength="6"
                pattern="[0-9]{6}"
                className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <input
                type="text"
                name="country"
                placeholder="Country *"
                value={newAddress.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              id="is_default"
              checked={newAddress.is_default === 1}
              onChange={(e) => setNewAddress(prev => ({
                ...prev,
                is_default: e.target.checked ? 1 : 0
              }))}
              className="cursor-pointer w-4 h-4"
            />
            <label htmlFor="is_default" className="text-sm cursor-pointer text-gray-700">
              Make this my default address
            </label>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2.5 text-sm font-semibold uppercase tracking-wide"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setNewAddress({
                  name: "",
                  phone: "",
                  address_line1: "",
                  address_line2: "",
                  city: "",
                  state: "",
                  pincode: "",
                  country: "India",
                  is_default: 0
                });
              }}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-2.5 text-sm font-semibold uppercase tracking-wide"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

    </div>
  );
};

export default AddressSection;