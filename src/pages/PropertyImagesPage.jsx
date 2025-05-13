import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Breadcrumbs,
  CircularProgress,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { properties } from "../data/dummyData";
import PropertyImageUploader from "../components/PropertyImageUploader";

function PropertyImagesPage() {
  const { id } = useParams();
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
        <Link to={`/properties/${id}`} className="text-inherit hover:underline">
          {property.title}
        </Link>
        <Typography color="text.primary">Manage Images</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Manage Property Images
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Add, edit, or remove images for your property listing.
      </Typography>

      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <PropertyImageUploader
          propertyId={property.id}
          initialImages={property.images}
        />
      </Paper>
    </Container>
  );
}

export default PropertyImagesPage;
