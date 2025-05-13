import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import { properties } from "../data/dummyData";
import PropertySearchForm from "../components/PropertySearchForm";
import PropertyCard from "../components/PropertyCard";

function PropertyListingPage() {
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

  const handlePageChange = (event, value) => {
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Property Listings
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{ mb: 2 }}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>

        {showFilters && (
          <Box sx={{ mb: 3 }}>
            <PropertySearchForm onSearch={handleSearch} />
          </Box>
        )}

        {activeFilters.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Active Filters:
            </Typography>
            {activeFilters.map((filter) => (
              <Chip
                key={filter.key}
                label={filter.label}
                onDelete={() => handleRemoveFilter(filter.key)}
                size="small"
              />
            ))}
            <Button size="small" onClick={handleClearAllFilters}>
              Clear All
            </Button>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1 ? "property" : "properties"} found
          </Typography>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              onChange={handleSortChange}
              label="Sort By"
              startAdornment={<SortIcon fontSize="small" sx={{ mr: 1 }} />}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {currentProperties.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {currentProperties.map((property) => (
              <Grid item key={property.id} xs={12} sm={6} md={4}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" gutterBottom>
            No properties found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search filters to find more properties
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClearAllFilters}
            sx={{ mt: 2 }}
          >
            Clear All Filters
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default PropertyListingPage;
