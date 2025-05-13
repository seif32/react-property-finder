import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

  const handleTabChange = (event, newValue) => {
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          My Properties
        </Typography>
        <Button
          component={Link}
          to="/properties/create"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add New Property
        </Button>
      </Box>

      <Paper elevation={1} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Properties" />
          <Tab label="For Sale" />
          <Tab label="For Rent" />
        </Tabs>
      </Paper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredProperties.length > 0 ? (
        <Box>
          {filteredProperties.map((property) => (
            <PropertyManagementItem key={property.id} property={property} />
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" gutterBottom>
            No properties found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {tabValue === 0
              ? "You haven't listed any properties yet."
              : tabValue === 1
                ? "You don't have any properties listed for sale."
                : "You don't have any properties listed for rent."}
          </Typography>
          <Button
            component={Link}
            to="/properties/create"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Your First Property
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default MyPropertiesPage;
