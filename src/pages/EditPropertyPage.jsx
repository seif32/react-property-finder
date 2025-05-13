import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { properties } from "../data/dummyData";
import PropertyForm from "../components/PropertyForm";

function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch property details
    const fetchProperty = () => {
      setLoading(true);
      setTimeout(() => {
        const foundProperty = properties.find(
          (p) => p.id === Number.parseInt(id)
        );
        setProperty(foundProperty || null);
        setLoading(false);
      }, 500);
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = (data) => {
    console.log(`PUT /api/properties/${id} with data:`, data);

    // In a real app, you would make an API call here
    alert("Property updated successfully!");
    navigate(`/properties/${id}`);
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading property details...
        </Typography>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Property not found
        </Typography>
        <Link to="/my-properties">Back to My Properties</Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
      >
        <Link to="/" className="text-inherit hover:underline flex items-center">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link to="/my-properties" className="text-inherit hover:underline">
          My Properties
        </Link>
        <Typography color="text.primary">Edit Property</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Edit Property
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Update the details of your property listing.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <PropertyForm property={property} onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
}

export default EditPropertyPage;
