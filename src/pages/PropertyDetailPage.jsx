import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  Button,
  Chip,
  Paper,
  Avatar,
  IconButton,
  Breadcrumbs,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { currentUser, properties } from "../data/dummyData";
import PropertyImageGallery from "../components/PropertyImageGallery";
import PropertyReviews from "../components/PropertyReviews";
import PropertyCard from "../components/PropertyCard";

function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProperty = () => {
      setLoading(true);
      setTimeout(() => {
        const foundProperty = properties.find(
          (p) => p.id === Number.parseInt(id)
        );
        setProperty(foundProperty || null);
        setIsBookmarked(currentUser.bookmarks.includes(Number.parseInt(id)));
        setLoading(false);
      }, 500);
    };

    fetchProperty();
  }, [id]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    console.log(
      `Property ${id} ${!isBookmarked ? "bookmarked" : "unbookmarked"}`
    );
  };

  const handleShare = () => {
    console.log(`Sharing property ${id}`);
    // In a real app, you would implement sharing functionality
    alert("Share functionality would be implemented here");
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">Loading property details...</Typography>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Property not found
        </Typography>
        <Button
          component={Link}
          to="/properties"
          variant="contained"
          color="primary"
        >
          Back to Properties
        </Button>
      </Container>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

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
        <Link to="/properties" className="text-inherit hover:underline">
          Properties
        </Link>
        <Typography color="text.primary">{property.title}</Typography>
      </Breadcrumbs>

      {/* Property Title and Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            {property.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon color="action" fontSize="small" />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ ml: 0.5 }}
            >
              {property.location}
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton
            onClick={handleBookmarkToggle}
            color={isBookmarked ? "error" : "default"}
            aria-label={
              isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
            }
          >
            {isBookmarked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={handleShare} aria-label="Share property">
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Property Images */}
      <PropertyImageGallery images={property.images} />

      {/* Property Details */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          {/* Overview */}
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              fontWeight="bold"
            >
              Overview
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BedIcon color="action" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {property.bedrooms}{" "}
                  {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BathtubIcon color="action" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {property.bathrooms}{" "}
                  {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SquareFootIcon color="action" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {property.area} m²
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HomeIcon color="action" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {property.propertyType}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              {property.description}
            </Typography>
          </Paper>

          {/* Reviews */}
          <Paper elevation={1} sx={{ p: 3 }}>
            <PropertyReviews
              reviews={property.reviews}
              propertyId={property.id}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Price Card */}
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography
              variant="h5"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              {formatPrice(property.price)}
              {property.listingType === "Rent" && "/month"}
            </Typography>
            <Chip
              label={property.listingType === "Sale" ? "For Sale" : "For Rent"}
              color={property.listingType === "Sale" ? "primary" : "secondary"}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => console.log("Contact about property", property.id)}
            >
              Contact Agent
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() =>
                console.log("Schedule viewing for property", property.id)
              }
            >
              Schedule Viewing
            </Button>
          </Paper>

          {/* Owner/Agent Card */}
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Listed by
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                {property.ownerName.charAt(0)}
              </Avatar>
              <Typography variant="subtitle1">{property.ownerName}</Typography>
            </Box>
            <Button
              variant="outlined"
              fullWidth
              onClick={() =>
                console.log("View agent profile", property.ownerId)
              }
            >
              View Profile
            </Button>
          </Paper>

          {/* Location */}
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            <Box
              sx={{
                height: 200,
                bgcolor: "grey.200",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <img
                src={`/placeholder.svg?height=400&width=600&query=map of ${property.location}`}
                alt={`Map of ${property.location}`}
                className="w-full h-full object-cover"
              />
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {property.location}
            </Typography>
            <Button
              variant="text"
              fullWidth
              onClick={() => console.log("View on map", property.location)}
            >
              View on Map
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Similar Properties */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          Similar Properties
        </Typography>
        <Grid container spacing={3}>
          {properties
            .filter(
              (p) =>
                p.id !== property.id && p.propertyType === property.propertyType
            )
            .slice(0, 3)
            .map((similarProperty) => (
              <Grid item key={similarProperty.id} xs={12} sm={6} md={4}>
                <PropertyCard property={similarProperty} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default PropertyDetailPage;
