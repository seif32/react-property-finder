"use client";
import { Link } from "react-router-dom";
import PropertySearchForm from "../components/PropertySearchForm";
import PropertyCard from "../components/PropertyCard";
import { useGetAllProperties } from "../hooks/property/useGetAllProperties";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  MapPinIcon,
  BuildingOffice2Icon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useGetAllLocations } from "../hooks/location/useGetAllLocations";

function HomePage() {
  const { data: properties, isLoading } = useGetAllProperties();
  const { data: locations, isLoading: isLocationLoading } =
    useGetAllLocations();
  if (isLoading || isLocationLoading) return <LoadingSpinner />;

  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-white text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="https://cdn.pixabay.com/photo/2023/12/04/01/23/kitchen-8428467_1280.jpg"
            alt="Luxury Property"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Find Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover the perfect property that matches your lifestyle and
            preferences
          </p>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties that offer
            exceptional value and features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/properties"
            className="inline-flex items-center px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200"
          >
            View All Properties
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding your dream property is easy with our simple three-step
              process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Search</h3>
              <p className="text-gray-600">
                Browse our extensive collection of properties using our advanced
                search filters to find exactly what you're looking for.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tour</h3>
              <p className="text-gray-600">
                Schedule viewings of your favorite properties at your
                convenience, either in person or through our virtual tour
                option.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Purchase</h3>
              <p className="text-gray-600">
                Work with our experienced agents to negotiate the best deal and
                complete your property purchase with ease.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        <PropertySearchForm compact={true} />
      </div>

      {/* Popular Locations Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Locations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore properties in these sought-after locations
          </p>
        </div>

        {/* Enhanced Locations Grid - Modern Design without Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.slice(0, 4).map((location, index) => {
            // Generate unique colors for each location
            const colors = [
              [
                "from-gray-700 to-gray-900", // gradient text or background
                "bg-gray-700/10", // soft background tint
                "border-gray-700/20", // subtle border
              ],
              [
                "from-gray-800 to-black",
                "bg-gray-800/10",
                "border-gray-800/20",
              ],
              ["from-black to-gray-800", "bg-black/10", "border-black/20"],
              [
                "from-gray-900 to-gray-700",
                "bg-gray-900/10",
                "border-gray-900/20",
              ],
            ];

            const [gradientColor, bgColor, borderColor] =
              colors[index % colors.length];

            return (
              <Link
                key={location.id}
                to={`/properties?location=${location.name}`}
                className="group block"
              >
                <div
                  className={`relative h-64 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl ${bgColor} border border-dashed ${borderColor}`}
                >
                  {/* Abstract background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id={`gradient-${location.id}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            className={`${gradientColor.split(" ")[0]}`}
                          />
                          <stop
                            offset="100%"
                            className={`${gradientColor.split(" ")[1]}`}
                          />
                        </linearGradient>
                        <pattern
                          id={`pattern-${location.id}`}
                          width="10"
                          height="10"
                          patternUnits="userSpaceOnUse"
                        >
                          <circle
                            cx="5"
                            cy="5"
                            r="1.5"
                            fill={`url(#gradient-${location.id})`}
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#pattern-${location.id})`}
                      />
                    </svg>
                  </div>

                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-2xl p-[1px] overflow-hidden">
                    <div
                      className={`absolute -inset-[10%] bg-gradient-to-r ${gradientColor} opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500`}
                    />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <MapPinIcon
                      className={`h-6 w-6 text-gradient-to-r ${gradientColor}`}
                    />
                  </div>

                  {/* Large decorative letter */}
                  <div className="absolute -right-6 -bottom-6 text-[120px] font-black opacity-10 select-none">
                    {location.name.charAt(0)}
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">
                        {location.name}
                      </h3>

                      <div className="flex items-center mb-3 text-gray-700">
                        <MapPinIcon className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">
                          {location.type}
                        </span>
                      </div>

                      {/* <div className="flex items-center text-gray-700">
                        <BuildingOffice2Icon className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">
                          {location.subLocations.length}{" "}
                          {location.subLocations.length === 1
                            ? "area"
                            : "areas"}
                        </span>
                      </div> */}

                      {/* Explore button */}
                      <div
                        className={`mt-4 inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${gradientColor} text-white opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 transform-gpu`}
                      >
                        Explore properties
                        <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-16 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8">
            Start your property search today and discover the perfect place to
            call home
          </p>
          <Link
            to="/properties"
            className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors duration-200 text-lg"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
