import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import Chip from "@mui/material/Chip";
import { currentUser } from "../data/dummyData";

function PropertyCard({ property }) {
  const [isBookmarked, setIsBookmarked] = useState(
    currentUser.bookmarks.includes(property.id)
  );

  const handleBookmarkToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsBookmarked(!isBookmarked);
    console.log(
      `Property ${property.id} ${!isBookmarked ? "bookmarked" : "unbookmarked"}`
    );

    // In a real app, you would call the API to add/remove bookmark
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <Card className="h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={property.images[0].imageUrl}
          alt={property.title}
          className="h-48 object-cover"
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.9)",
            },
          }}
          onClick={handleBookmarkToggle}
          aria-label={
            isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
          }
        >
          {isBookmarked ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Chip
          label={property.listingType}
          color={property.listingType === "Sale" ? "primary" : "secondary"}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            fontWeight: "bold",
          }}
        />
      </Box>
      <CardContent
        component={Link}
        to={`/properties/${property.id}`}
        className="no-underline text-inherit"
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="font-bold text-lg"
        >
          {property.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            {property.location}
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" className="font-bold my-2">
          {formatPrice(property.price)}
          {property.listingType === "Rent" && "/month"}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BedIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BathtubIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SquareFootIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {property.area} m²
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;
