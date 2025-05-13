import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
  Grid,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { listingTypes, locations, propertyTypes } from "../data/dummyData";

function PropertySearchForm({ onSearch, compact = false }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      location: "",
      propertyType: "",
      listingType: "",
      minPrice: 0,
      maxPrice: 5000000,
      bedrooms: "",
    },
  });

  const [priceRange, setPriceRange] = useState([0, 5000000]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setValue("minPrice", newValue[0]);
    setValue("maxPrice", newValue[1]);
  };

  const formatPrice = (value) => `$${value.toLocaleString()}`;

  const onSubmit = (data) => {
    if (onSearch) {
      onSearch(data);
    } else {
      const searchParams = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== "" && value !== 0) {
          searchParams.append(key, value);
        }
      });
      navigate(`/properties?${searchParams.toString()}`);
    }
  };

  const renderLocationSelect = () => (
    <FormControl fullWidth>
      <InputLabel id="location-label">Location</InputLabel>
      <Select
        labelId="location-label"
        label="Location"
        {...register("location")}
        defaultValue=""
        startAdornment={
          <InputAdornment position="start">
            <LocationOnIcon fontSize="small" />
          </InputAdornment>
        }
      >
        <MenuItem value="">Any Location</MenuItem>
        {locations.map((location) => (
          <MenuItem key={location.id} value={location.name}>
            {location.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderSelect = (label, name, values) => (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        label={label}
        {...register(name)}
        defaultValue=""
      >
        <MenuItem value="">Any {label}</MenuItem>
        {values.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderBedroomsSelect = () => (
    <FormControl fullWidth>
      <InputLabel id="bedrooms-label">Bedrooms</InputLabel>
      <Select
        labelId="bedrooms-label"
        label="Bedrooms"
        {...register("bedrooms")}
        defaultValue=""
      >
        <MenuItem value="">Any</MenuItem>
        {[1, 2, 3, 4, 5].map((n) => (
          <MenuItem key={n} value={n.toString()}>
            {n}+
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderPriceSlider = () => (
    <Box>
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        valueLabelFormat={formatPrice}
        min={0}
        max={5000000}
        step={50000}
        aria-labelledby="price-range-slider"
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">{formatPrice(priceRange[0])}</Typography>
        <Typography variant="body2">{formatPrice(priceRange[1])}</Typography>
      </Box>
    </Box>
  );

  return (
    <Paper
      elevation={compact ? 0 : 3}
      sx={{
        p: compact ? 2 : 4,
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      {!compact && (
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Find Your Dream Property
        </Typography>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={compact ? 2 : 3}>
          <Grid item xs={12} sm={6} md={4}>
            {renderLocationSelect()}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSelect("Property Type", "propertyType", propertyTypes)}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSelect("Listing Type", "listingType", listingTypes)}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderBedroomsSelect()}
          </Grid>
          <Grid item xs={12} md={8}>
            {renderPriceSlider()}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size={compact ? "medium" : "large"}
              startIcon={<SearchIcon />}
              sx={{ py: compact ? 1 : 1.5 }}
            >
              {compact ? "Search" : "Search Properties"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default PropertySearchForm;
