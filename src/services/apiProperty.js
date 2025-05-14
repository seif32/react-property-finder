import { API_BASE_URL, ERROR_MESSAGES } from "./constants/apiConstants";

/**
 * Get all properties with optional pagination
 * @param {number} page - Page number
 * @param {number} limit - Number of properties per page
 * @param {string} sort - Sort order (e.g., 'price-asc', 'price-desc', 'newest')
 */
export const getAllProperties = async (
  page = 1,
  limit = 10,
  sort = "newest"
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/properties?page=${page}&limit=${limit}&sort=${sort}`
    );

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? ERROR_MESSAGES.NOT_FOUND
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get a specific property by ID
 * @param {number} id - Property ID
 */
export const getPropertyById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Property not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Search properties with filters
 * @param {Object} filters - Search filters
 */
export const searchProperties = async (filters = {}) => {
  try {
    // Convert filters object to query string
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    const response = await fetch(
      `${API_BASE_URL}/properties/search?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching properties:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get properties by owner ID
 * @param {number} ownerId - Owner ID
 */
export const getPropertiesByOwner = async (ownerId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/properties/byOwner/${ownerId}`
    );

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "No properties found for this owner"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching properties for owner ${ownerId}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Create a new property
 * @param {Object} propertyData - Property data
 */
export const createProperty = async (propertyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating property:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Update an existing property
 * @param {number} id - Property ID
 * @param {Object} propertyData - Updated property data
 */
export const updateProperty = async (id, propertyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating property ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Delete a property
 * @param {number} id - Property ID
 */
export const deleteProperty = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Property not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return true; // Successfully deleted
  } catch (error) {
    console.error(`Error deleting property ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};
