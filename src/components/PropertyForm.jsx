"use client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  InputAdornment,
  Paper,
  Divider,
} from "@mui/material";
import { listingTypes, locations, propertyTypes } from "../data/dummyData";

function PropertyForm({ property = null, onSubmit }) {
  const navigate = useNavigate();
  const isEditing = !!property;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing
      ? {
          title: property.title,
          description: property.description,
          price: property.price,
          location: property.location,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area,
          propertyType: property.propertyType,
          listingType: property.listingType,
        }
      : {
          title: "",
          description: "",
          price: "",
          location: "",
          bedrooms: "",
          bathrooms: "",
          area: "",
          propertyType: "",
          listingType: "",
        },
  });

  const handleFormSubmit = (data) => {
    console.log("Property form submitted:", data);

    if (onSubmit) {
      onSubmit(data);
    } else {
      // Default behavior if no onSubmit is provided
      if (isEditing) {
        console.log(`PUT /api/properties/${property.id} with data:`, data);
        alert("Property updated successfully!");
        navigate(`/properties/${property.id}`);
      } else {
        console.log("POST /api/properties with data:", data);
        alert("Property created successfully!");
        navigate("/my-properties");
      }
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Property Title"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.propertyType}>
              <InputLabel id="property-type-label">Property Type</InputLabel>
              <Select
                labelId="property-type-label"
                label="Property Type"
                {...register("propertyType", {
                  required: "Property type is required",
                })}
                defaultValue={isEditing ? property.propertyType : ""}
              >
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors.propertyType && (
                <Typography variant="caption" color="error">
                  {errors.propertyType.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.listingType}>
              <InputLabel id="listing-type-label">Listing Type</InputLabel>
              <Select
                labelId="listing-type-label"
                label="Listing Type"
                {...register("listingType", {
                  required: "Listing type is required",
                })}
                defaultValue={isEditing ? property.listingType : ""}
              >
                {listingTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors.listingType && (
                <Typography variant="caption" color="error">
                  {errors.listingType.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Location & Details
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.location}>
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                labelId="location-label"
                label="Location"
                {...register("location", { required: "Location is required" })}
                defaultValue={isEditing ? property.location : ""}
              >
                {locations.map((location) => (
                  <MenuItem key={location.id} value={location.name}>
                    {location.name}
                  </MenuItem>
                ))}
                {locations.flatMap((location) =>
                  location.subLocations.map((subLocation) => (
                    <MenuItem key={subLocation.id} value={subLocation.name}>
                      {subLocation.name} ({location.name})
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.location && (
                <Typography variant="caption" color="error">
                  {errors.location.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be greater than 0" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Bedrooms"
              type="number"
              {...register("bedrooms", {
                required: "Number of bedrooms is required",
                min: { value: 0, message: "Cannot be negative" },
              })}
              error={!!errors.bedrooms}
              helperText={errors.bedrooms?.message}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Bathrooms"
              type="number"
              {...register("bathrooms", {
                required: "Number of bathrooms is required",
                min: { value: 0, message: "Cannot be negative" },
              })}
              error={!!errors.bathrooms}
              helperText={errors.bathrooms?.message}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Area (m²)"
              type="number"
              {...register("area", {
                required: "Area is required",
                min: { value: 1, message: "Area must be greater than 0" },
              })}
              error={!!errors.area}
              helperText={errors.area?.message}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Update Property" : "Create Property"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default PropertyForm;
