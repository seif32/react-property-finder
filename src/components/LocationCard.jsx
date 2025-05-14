"use client";

import { Link } from "react-router-dom";

function LocationCard({ location }) {
  return (
    <Link
      to={`/properties?location=${location.name}`}
      className="block h-full bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md no-underline text-inherit"
    >
      <div className="h-40 overflow-hidden">
        <img
          src={`/placeholder.svg?key=cflgx&height=400&width=600&query=${location.name} city view`}
          alt={location.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {location.name}
        </h3>

        <div className="flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1.5 text-sm text-gray-600">{location.type}</span>
        </div>

        {location.subLocations && location.subLocations.length > 0 && (
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="ml-1.5 text-sm text-gray-600">
              {location.subLocations.length} areas
            </span>
          </div>
        )}

        {location.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {location.description}
          </p>
        )}
      </div>
    </Link>
  );
}

export default LocationCard;
