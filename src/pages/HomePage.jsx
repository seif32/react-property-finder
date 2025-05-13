import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { locations, properties } from "../data/dummyData";
import PropertySearchForm from "../components/PropertySearchForm";
import PropertyCard from "../components/PropertyCard";

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [featuredProperties] = useState(properties.slice(0, 3));

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "70vh", md: "80vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            },
          }}
        >
          <img
            src="/placeholder.svg?height=1080&width=1920&query=luxury modern home with pool and mountain view"
            alt="Luxury Property"
            className="w-full h-full object-cover"
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Find Your Dream Home
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: "800px",
              mx: "auto",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            Discover the perfect property that matches your lifestyle and
            preferences
          </Typography>

          <Box
            sx={{
              maxWidth: 800,
              mx: "auto",
              mt: 4,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
              p: { xs: 2, md: 3 },
            }}
          >
            <PropertySearchForm compact={true} />
          </Box>
        </Container>
      </Box>

      {/* Featured Properties Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            fontWeight="bold"
          >
            Featured Properties
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Explore our handpicked selection of premium properties that offer
            exceptional value and features
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {featuredProperties.map((property) => (
            <Grid item key={property.id} xs={12} sm={6} md={4}>
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            component={Link}
            to="/properties"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SearchIcon />}
          >
            View All Properties
          </Button>
        </Box>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: "background.default", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight="bold"
            >
              How It Works
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: "auto" }}
            >
              Finding your dream property is easy with our simple three-step
              process
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <SearchIcon fontSize="large" />
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Search
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Browse our extensive collection of properties using our
                  advanced search filters to find exactly what you're looking
                  for.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: "secondary.main",
                      color: "white",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <HomeIcon fontSize="large" />
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Tour
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Schedule viewings of your favorite properties at your
                  convenience, either in person or through our virtual tour
                  option.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: "info.main",
                      color: "white",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <AttachMoneyIcon fontSize="large" />
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Purchase
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Work with our experienced agents to negotiate the best deal
                  and complete your property purchase with ease.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Popular Locations Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            fontWeight="bold"
          >
            Popular Locations
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Explore properties in these sought-after locations
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {locations.slice(0, 4).map((location) => (
            <Grid item key={location.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  position: "relative",
                  height: 200,
                  overflow: "hidden",
                  borderRadius: 2,
                  "&:hover img": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`/placeholder.svg?height=400&width=300&query=${location.name} city skyline`}
                  alt={location.name}
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    p: 2,
                  }}
                >
                  <Typography variant="h6" component="div">
                    {location.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {location.subLocations.length} areas
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            fontWeight="bold"
          >
            Ready to Find Your Dream Home?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: "normal" }}>
            Start your property search today and discover the perfect place to
            call home
          </Typography>
          <Button
            component={Link}
            to="/properties"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
          >
            Browse Properties
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
