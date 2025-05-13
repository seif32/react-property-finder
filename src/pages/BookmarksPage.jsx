import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { currentUser, properties } from "../data/dummyData";
import PropertyCard from "../components/PropertyCard";

function BookmarksPage() {
  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch bookmarked properties
    const fetchBookmarkedProperties = () => {
      setLoading(true);
      setTimeout(() => {
        const bookmarked = properties.filter((property) =>
          currentUser.bookmarks.includes(property.id)
        );
        setBookmarkedProperties(bookmarked);
        setLoading(false);
      }, 500);
    };

    fetchBookmarkedProperties();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">Loading your bookmarks...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Your Bookmarked Properties
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {bookmarkedProperties.length > 0 ? (
        <Grid container spacing={3}>
          {bookmarkedProperties.map((property) => (
            <Grid item key={property.id} xs={12} sm={6} md={4}>
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" gutterBottom>
            You haven't bookmarked any properties yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Browse our listings and save your favorite properties to view them
            later
          </Typography>
          <Button
            component={Link}
            to="/properties"
            variant="contained"
            color="primary"
            size="large"
          >
            Browse Properties
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default BookmarksPage;
