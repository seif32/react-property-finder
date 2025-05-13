import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { locations } from "../data/dummyData";
import LocationCard from "../components/LocationCard";

function LocationBrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationType, setLocationType] = useState("all");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Browse Locations
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Explore properties by location to find your perfect neighborhood.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search locations..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Tabs
          value={locationType}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Locations" value="all" />
          <Tab label="Cities" value="city" />
          <Tab label="Districts" value="district" />
          <Tab label="Neighborhoods" value="neighborhood" />
          <Tab label="Regions" value="region" />
        </Tabs>
      </Box>

      {filteredLocations.length > 0 || filteredSubLocations.length > 0 ? (
        <>
          {filteredLocations.length > 0 && (
            <>
              <Typography variant="h5" component="h2" gutterBottom>
                Main Locations
              </Typography>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {filteredLocations.map((location) => (
                  <Grid item key={location.id} xs={12} sm={6} md={4}>
                    <LocationCard location={location} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {filteredSubLocations.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Sub Locations
              </Typography>
              <Grid container spacing={3}>
                {filteredSubLocations.map((subLocation) => (
                  <Grid item key={subLocation.id} xs={12} sm={6} md={4}>
                    <LocationCard location={subLocation} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" gutterBottom>
            No locations found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search criteria.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default LocationBrowsePage;
