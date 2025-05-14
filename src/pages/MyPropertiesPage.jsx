"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { properties } from "../data/dummyData";
import PropertyManagementItem from "../components/PropertyManagementItem";

function MyPropertiesPage() {
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch user's properties
    const fetchMyProperties = () => {
      setLoading(true);
      setTimeout(() => {
        // In a real app, you would filter by the actual owner ID
        // For demo purposes, let's assume the current user owns some properties
        const userProperties = properties.filter(
          (property) => property.ownerId === 1
        );
        setMyProperties(userProperties);
        setLoading(false);
      }, 500);
    };

    fetchMyProperties();
  }, []);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  // Filter properties based on tab
  const filteredProperties =
    tabValue === 0
      ? myProperties
      : tabValue === 1
        ? myProperties.filter((p) => p.listingType === "Sale")
        : myProperties.filter((p) => p.listingType === "Rent");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
          My Properties
        </h1>
        <Link
          to="/properties/create"
          className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Property
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex">
          <button
            onClick={() => handleTabChange(0)}
            className={`flex-1 py-3 text-center font-medium ${
              tabValue === 0
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700 border-b border-gray-200"
            }`}
          >
            All Properties
          </button>
          <button
            onClick={() => handleTabChange(1)}
            className={`flex-1 py-3 text-center font-medium ${
              tabValue === 1
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700 border-b border-gray-200"
            }`}
          >
            For Sale
          </button>
          <button
            onClick={() => handleTabChange(2)}
            className={`flex-1 py-3 text-center font-medium ${
              tabValue === 2
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700 border-b border-gray-200"
            }`}
          >
            For Rent
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <PropertyManagementItem key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            No properties found
          </h2>
          <p className="text-gray-600 mb-6">
            {tabValue === 0
              ? "You haven't listed any properties yet."
              : tabValue === 1
                ? "You don't have any properties listed for sale."
                : "You don't have any properties listed for rent."}
          </p>
          <Link
            to="/properties/create"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Your First Property
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyPropertiesPage;
