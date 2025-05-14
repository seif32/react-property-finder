import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { listingTypes, locations, propertyTypes } from "../data/dummyData";

function PropertySearchForm({ onSearch, compact = false }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      location: "",
      propertyType: "",
      listingType: "",
      minPrice: 0,
      maxPrice: 5000000,
      bedrooms: "",
    },
  });

  const [priceRange, setPriceRange] = useState([0, 5000000]);

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange(value.split(",").map(Number));
    setValue("minPrice", value.split(",")[0]);
    setValue("maxPrice", value.split(",")[1]);
  };

  const formatPrice = (value) => `$${value.toLocaleString()}`;

  const onSubmit = (data) => {
    if (onSearch) {
      onSearch(data);
    } else {
      const searchParams = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== "" && value !== 0) {
          searchParams.append(key, value);
        }
      });
      navigate(`/properties?${searchParams.toString()}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg ${compact ? "p-4" : "p-6 md:p-8"}`}
    >
      {!compact && (
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Find Your Dream Property
        </h2>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location Select */}
          <div className="relative">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <select
                id="location"
                {...register("location")}
                className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black rounded-lg shadow-sm"
              >
                <option value="">Any Location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Type Select */}
          <div>
            <label
              htmlFor="propertyType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type
            </label>
            <select
              id="propertyType"
              {...register("propertyType")}
              className="block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black rounded-lg shadow-sm"
            >
              <option value="">Any Property Type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Listing Type Select */}
          <div>
            <label
              htmlFor="listingType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Listing Type
            </label>
            <select
              id="listingType"
              {...register("listingType")}
              className="block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black rounded-lg shadow-sm"
            >
              <option value="">Any Listing Type</option>
              {listingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms Select */}
          <div>
            <label
              htmlFor="bedrooms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bedrooms
            </label>
            <select
              id="bedrooms"
              {...register("bedrooms")}
              className="block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black rounded-lg shadow-sm"
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n.toString()}>
                  {n}+
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="col-span-full">
            <label
              htmlFor="price-range"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price Range
            </label>
            <input
              type="range"
              id="price-range"
              min="0"
              max="5000000"
              step="50000"
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              multiple
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">
                {formatPrice(priceRange[0])}
              </span>
              <span className="text-sm text-gray-600">
                {formatPrice(priceRange[1])}
              </span>
            </div>
          </div>

          {/* Search Button */}
          <div className="col-span-full mt-2">
            <button
              type="submit"
              className={`w-full flex items-center justify-center bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200 ${
                compact ? "py-2 text-sm" : "py-3 text-base"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              {compact ? "Search" : "Search Properties"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PropertySearchForm;
