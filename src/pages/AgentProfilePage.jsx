import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Breadcrumbs,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { properties } from "../data/dummyData";
import AgentProfile from "../components/AgentProfile";
import PropertyCard from "../components/PropertyCard";

// Dummy agent data
const dummyAgent = {
  id: 1,
  firstName: "Ahmed",
  lastName: "Hassan",
  email: "ahmed.hassan@example.com",
  phoneNumber: "+20 123 456 7890",
  location: "Cairo, Egypt",
  bio: "Ahmed is a seasoned real estate professional with over 10 years of experience in the Egyptian property market. Specializing in luxury properties and investment opportunities, Ahmed has helped hundreds of clients find their dream homes and make sound investment decisions. His deep knowledge of the local market and commitment to client satisfaction have earned him a reputation as one of the top agents in the region.",
  rating: 4.8,
  reviewCount: 124,
  propertiesCount: 15,
  specialization: "Luxury Properties",
  experience: 10,
  profileImage: "/professional-real-estate-agent.png",
};

function AgentProfilePage() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [agentProperties, setAgentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch agent details and properties
    const fetchAgentData = () => {
      setLoading(true);
      setTimeout(() => {
        // In a real app, you would fetch the agent by ID
        setAgent(dummyAgent);

        // Filter properties by owner ID
        const ownerProperties = properties.filter(
          (property) => property.ownerId === 1
        );
        setAgentProperties(ownerProperties);

        setLoading(false);
      }, 500);
    };

    fetchAgentData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter properties based on tab
  const filteredProperties =
    tabValue === 0
      ? agentProperties
      : tabValue === 1
        ? agentProperties.filter((p) => p.listingType === "Sale")
        : agentProperties.filter((p) => p.listingType === "Rent");

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading agent profile...
        </Typography>
      </Container>
    );
  }

  if (!agent) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Agent not found
        </Typography>
        <Link to="/">Back to Home</Link>
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
        <Link to="/agents" className="text-inherit hover:underline">
          Agents
        </Link>
        <Typography color="text.primary">
          {agent.firstName} {agent.lastName}
        </Typography>
      </Breadcrumbs>

      <AgentProfile agent={agent} />

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          {agent.firstName}'s Properties
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{ mb: 3 }}
        >
          <Tab label="All Properties" />
          <Tab label="For Sale" />
          <Tab label="For Rent" />
        </Tabs>

        {filteredProperties.length > 0 ? (
          <Grid container spacing={3}>
            {filteredProperties.map((property) => (
              <Grid item key={property.id} xs={12} sm={6} md={4}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No properties found in this category.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default AgentProfilePage;
