"use client";

import { useState } from "react";
import { locations } from "../data/dummyData";
import LocationCard from "../components/LocationCard";

function LocationBrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationType, setLocationType] = useState("all");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (newValue) => {
    setLocationType(newValue);
  };

  // Filter locations based on search term and type
  const filteredLocations = locations.filter((location) => {
    const matchesSearch = location.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      locationType === "all" || location.type.toLowerCase() === locationType;
    return matchesSearch && matchesType;
  });

  // Get all sub-locations that match the criteria
  const filteredSubLocations = locations.flatMap((location) =>
    location.subLocations.filter((subLocation) => {
      const matchesSearch = subLocation.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        locationType === "all" ||
        subLocation.type.toLowerCase() === locationType;
      return matchesSearch && matchesType;
    })
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Browse Locations
      </h1>
      <p className="text-gray-600 mb-8">
        Explore properties by location to find your perfect neighborhood.
      </p>

      <div className="mb-8">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search locations..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              onClick={() => handleTabChange("all")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                locationType === "all"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Locations
            </button>
            <button
              onClick={() => handleTabChange("city")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                locationType === "city"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Cities
            </button>
            <button
              onClick={() => handleTabChange("district")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                locationType === "district"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Districts
            </button>
            <button
              onClick={() => handleTabChange("neighborhood")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                locationType === "neighborhood"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Neighborhoods
            </button>
            <button
              onClick={() => handleTabChange("region")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                locationType === "region"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Regions
            </button>
          </nav>
        </div>
      </div>

      {filteredLocations.length > 0 || filteredSubLocations.length > 0 ? (
        <>
          {filteredLocations.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Main Locations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredLocations.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>
            </>
          )}

          {filteredSubLocations.length > 0 && (
            <>
              {filteredLocations.length > 0 && (
                <div className="border-t border-gray-200 my-8" />
              )}
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Sub Locations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubLocations.map((subLocation) => (
                  <LocationCard key={subLocation.id} location={subLocation} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            No locations found
          </h2>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default LocationBrowsePage;
