"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { currentUser, properties } from "../data/dummyData";
import PropertyCard from "../components/PropertyCard";

function BookmarksPage() {
  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch bookmarked properties
    const fetchBookmarkedProperties = () => {
      setLoading(true);
      setTimeout(() => {
        const bookmarked = properties.filter((property) =>
          currentUser.bookmarks.includes(property.id)
        );
        setBookmarkedProperties(bookmarked);
        setLoading(false);
      }, 500);
    };

    fetchBookmarkedProperties();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Loading your bookmarks...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Your Bookmarked Properties
      </h1>
      <div className="border-b border-gray-200 mb-8" />

      {bookmarkedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            You haven't bookmarked any properties yet
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Browse our listings and save your favorite properties to view them
            later
          </p>
          <Link
            to="/properties"
            className="inline-block px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
