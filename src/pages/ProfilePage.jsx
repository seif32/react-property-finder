import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { currentUser } from "../data/dummyData";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber,
    },
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const onSubmit = (data) => {
    console.log("Profile updated with data:", data);
    // In a real app, you would call an API to update the user profile
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (data) => {
    console.log("Password change requested");
    // In a real app, you would call an API to change the password
    alert("Password changed successfully!");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Your Profile
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, textAlign: "center" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
                fontSize: "3rem",
              }}
            >
              {currentUser.firstName.charAt(0)}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {currentUser.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since {new Date().getFullYear()}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => console.log("Change profile picture")}
            >
              Change Picture
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="profile tabs"
              >
                <Tab label="Personal Information" />
                <Tab label="Security" />
                <Tab label="Preferences" />
              </Tabs>
            </Box>

            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10,15}$/,
                            message: "Invalid phone number",
                          },
                        })}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Change Password
                </Typography>
                <form onSubmit={handleSubmit(handlePasswordChange)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        {...register("currentPassword", {
                          required: "Current password is required",
                        })}
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        {...register("newPassword", {
                          required: "New password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value, formValues) =>
                            value === formValues.newPassword ||
                            "Passwords do not match",
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Change Password
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Notification Preferences
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Manage how you receive notifications and updates
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {/* Notification preferences would go here */}
                  <Typography variant="body1">
                    This section would contain notification preferences controls
                  </Typography>
                </Box>
                <Button variant="contained" color="primary">
                  Save Preferences
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfilePage;
