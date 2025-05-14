"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { properties } from "../data/dummyData";
import PropertySearchForm from "../components/PropertySearchForm";
import PropertyCard from "../components/PropertyCard";
import { useAuth } from "../auth/AuthContext";

function PropertyListingPage() {
  const { user } = useAuth();
  console.log(user);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const propertiesPerPage = 6;

  // Extract filter values from URL params
  const location = searchParams.get("location") || "";
  const propertyType = searchParams.get("propertyType") || "";
  const listingType = searchParams.get("listingType") || "";
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : 0;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : 5000000;
  const bedrooms = searchParams.get("bedrooms")
    ? Number(searchParams.get("bedrooms"))
    : "";

  // Filter properties based on search params
  useEffect(() => {
    let result = [...properties];

    if (location) {
      result = result.filter((property) => property.location === location);
    }

    if (propertyType) {
      result = result.filter(
        (property) => property.propertyType === propertyType
      );
    }

    if (listingType) {
      result = result.filter(
        (property) => property.listingType === listingType
      );
    }

    if (minPrice > 0) {
      result = result.filter((property) => property.price >= minPrice);
    }

    if (maxPrice < 5000000) {
      result = result.filter((property) => property.price <= maxPrice);
    }

    if (bedrooms) {
      result = result.filter((property) => property.bedrooms >= bedrooms);
    }

    // Sort properties
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, you would sort by date
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredProperties(result);
    setCurrentPage(1);
  }, [
    location,
    propertyType,
    listingType,
    minPrice,
    maxPrice,
    bedrooms,
    sortBy,
  ]);

  const handleSearch = (data) => {
    // Update URL params based on search form data
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== "" && value !== 0) {
        params.append(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Generate active filters for display
  const activeFilters = [];
  if (location)
    activeFilters.push({ key: "location", label: `Location: ${location}` });
  if (propertyType)
    activeFilters.push({ key: "propertyType", label: `Type: ${propertyType}` });
  if (listingType)
    activeFilters.push({ key: "listingType", label: `For: ${listingType}` });
  if (bedrooms)
    activeFilters.push({ key: "bedrooms", label: `${bedrooms}+ Beds` });
  if (minPrice > 0 || maxPrice < 5000000) {
    const formatPrice = (price) => `$${price.toLocaleString()}`;
    activeFilters.push({
      key: "price",
      label: `Price: ${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`,
    });
  }

  const handleRemoveFilter = (key) => {
    const newParams = new URLSearchParams(searchParams);

    if (key === "price") {
      newParams.delete("minPrice");
      newParams.delete("maxPrice");
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };

  const handleClearAllFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Property Listings
      </h1>

      <div className="mb-8">
        <button
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mb-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {showFilters && (
          <div className="mb-6">
            <PropertySearchForm onSearch={handleSearch} />
          </div>
        )}

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">Active Filters:</span>
            {activeFilters.map((filter) => (
              <span
                key={filter.key}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {filter.label}
                <button
                  type="button"
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => handleRemoveFilter(filter.key)}
                >
                  <span className="sr-only">Remove filter</span>
                  <svg
                    className="h-2 w-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 8 8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M1 1l6 6m0-6L1 7"
                    />
                  </svg>
                </button>
              </span>
            ))}
            <button
              className="text-sm text-black hover:underline"
              onClick={handleClearAllFilters}
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <p className="text-gray-700 mb-2 sm:mb-0">
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1 ? "property" : "properties"} found
          </p>
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black appearance-none"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mb-8" />

      {currentProperties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav
                className="inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === index + 1
                        ? "z-10 bg-black text-white border-black"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            No properties found
          </h2>
          <p className="text-gray-600 mb-6">
            Try adjusting your search filters to find more properties
          </p>
          <button
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            onClick={handleClearAllFilters}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default PropertyListingPage;
