import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";

function LocationCard({ location }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
      component={Link}
      to={`/properties?location=${location.name}`}
      className="no-underline"
    >
      <CardMedia
        component="img"
        height="160"
        image={`/placeholder.svg?height=400&width=600&query=${location.name} city view`}
        alt={location.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {location.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            {location.type}
          </Typography>
        </Box>
        {location.subLocations && location.subLocations.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HomeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {location.subLocations.length} areas
            </Typography>
          </Box>
        )}
        {location.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {location.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default LocationCard;
