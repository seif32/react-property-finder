"use client";

import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Rating,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import VerifiedIcon from "@mui/icons-material/Verified";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function AgentProfile({ agent }) {
  return (
    <Box>
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Avatar
              src={
                agent.profileImage ||
                "/placeholder.svg?height=200&width=200&query=professional real estate agent portrait"
              }
              alt={`${agent.firstName} ${agent.lastName}`}
              sx={{ width: 150, height: 150, mx: { xs: "auto", md: 0 }, mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              {agent.firstName} {agent.lastName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                mb: 1,
              }}
            >
              <Rating
                value={agent.rating}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({agent.reviewCount} reviews)
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: { xs: "center", md: "flex-start" },
                mb: 2,
              }}
            >
              <Chip
                icon={<VerifiedIcon />}
                label="Verified Agent"
                color="primary"
                size="small"
                variant="outlined"
              />
              <Chip
                label={`${agent.propertiesCount} Properties`}
                size="small"
                variant="outlined"
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
            >
              Contact Agent
            </Button>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              About {agent.firstName}
            </Typography>
            <Typography variant="body1" paragraph>
              {agent.bio}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <List dense>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={agent.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={agent.phoneNumber} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary={agent.location} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Specializes in ${agent.specialization}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${agent.experience} years of experience`}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default AgentProfile;
