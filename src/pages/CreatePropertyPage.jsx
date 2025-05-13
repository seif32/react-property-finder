import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { currentUser } from "../data/dummyData";
import PropertyForm from "../components/PropertyForm";

function CreatePropertyPage() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    // Add owner information to the data
    const propertyData = {
      ...data,
      ownerId: currentUser.id,
      ownerName: `${currentUser.firstName} ${currentUser.lastName}`,
    };

    console.log("POST /api/properties with data:", propertyData);

    // In a real app, you would make an API call here
    alert("Property created successfully!");
    navigate("/my-properties");
  };

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
        <Typography color="text.primary">Create New Property</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Create New Property
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Fill in the details below to list your property on our platform.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <PropertyForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
}

export default CreatePropertyPage;
