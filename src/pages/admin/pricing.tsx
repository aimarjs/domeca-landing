import { useState, useEffect } from "react";

const PricingAdmin = () => {
  const [baseFarePerKm, setBaseFarePerKm] = useState<number>(0);
  const [oneTimeStartingFee, setOneTimeStartingFee] = useState<number>(0); // Renamed additionalCosts
  const [hourPrice, setHourPrice] = useState<number>(0);
  const [waitingHourPrice, setWaitingHourPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0); // New discount field
  const [discountStartKm, setDiscountStartKm] = useState<number>(0); // New field for discount start kilometers
  const [saved, setSaved] = useState<boolean>(false);

  // Fetch existing pricing data when the page loads
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/getPrices");
        const data = await response.json();
        if (response.ok) {
          setBaseFarePerKm(data.baseFarePerKm);
          setOneTimeStartingFee(data.oneTimeStartingFee); // Updated field
          setHourPrice(data.hourPrice);
          setWaitingHourPrice(data.waitingHourPrice);
          setDiscount(data.discount); // New field
          setDiscountStartKm(data.discountStartKm); // New field
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  // Handle form submission to save the pricing data
  const handleSavePrices = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/savePrices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baseFarePerKm,
          oneTimeStartingFee,
          hourPrice,
          waitingHourPrice,
          discount, // Save new field
          discountStartKm, // Save new field
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000); // Clear the saved state after 3 seconds
      } else {
        console.error("Failed to save prices");
      }
    } catch (error) {
      console.error("Error saving prices:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin: Set Pricing Data
        </h1>

        <form onSubmit={handleSavePrices}>
          {/* Base Fare per Kilometer */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Base Fare per Kilometer (€):
            </label>
            <input
              type="number"
              step="0.01"
              value={baseFarePerKm}
              onChange={(e) => setBaseFarePerKm(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 1 Time Starting Fee */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              1 Time Starting Fee (€):
            </label>
            <input
              type="number"
              step="0.01"
              value={oneTimeStartingFee} // Renamed
              onChange={(e) =>
                setOneTimeStartingFee(parseFloat(e.target.value))
              }
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hourly Price */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Hourly Price (€):
            </label>
            <input
              type="number"
              step="0.01"
              value={hourPrice}
              onChange={(e) => setHourPrice(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Waiting Hour Price */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Waiting Hour Price (€):
            </label>
            <input
              type="number"
              step="0.01"
              value={waitingHourPrice}
              onChange={(e) => setWaitingHourPrice(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Discount */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Discount (%) :
            </label>
            <input
              type="number"
              step="0.01"
              value={discount} // New field
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Discount Start Kilometers */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Discount Start (Km):
            </label>
            <input
              type="number"
              step="0.01"
              value={discountStartKm} // New field
              onChange={(e) => setDiscountStartKm(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Save Prices
          </button>

          {/* Success Message */}
          {saved && (
            <p className="mt-4 text-green-400 text-center font-semibold">
              Prices saved successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PricingAdmin;
