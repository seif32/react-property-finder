import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ImageIcon from "@mui/icons-material/Image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

function PropertyManagementItem({ property }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/properties/${property.id}/edit`);
    handleMenuClose();
  };

  const handleManageImages = () => {
    navigate(`/properties/${property.id}/images`);
    handleMenuClose();
  };

  const handleView = () => {
    navigate(`/properties/${property.id}`);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    console.log(`DELETE /api/properties/${property.id}`);
    setDeleteDialogOpen(false);
    // In a real app, you would refresh the property list after deletion
    alert("Property deleted successfully!");
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          mb: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: 200 },
            height: { xs: 200, sm: "auto" },
            objectFit: "cover",
          }}
          image={property.images[0]?.imageUrl || "/placeholder.svg"}
          alt={property.title}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", position: "relative", pb: 1 }}>
            <Box sx={{ position: "absolute", top: 16, right: 16 }}>
              <IconButton
                aria-label="property actions"
                onClick={handleMenuOpen}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>

            <Typography component="div" variant="h6">
              {property.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon fontSize="small" color="action" />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                {property.location}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Chip
                label={property.listingType}
                color={
                  property.listingType === "Sale" ? "primary" : "secondary"
                }
                size="small"
              />
              <Chip
                label={property.propertyType}
                size="small"
                variant="outlined"
              />
            </Box>

            <Typography variant="h6" color="primary" gutterBottom>
              {formatPrice(property.price)}
              {property.listingType === "Rent" && "/month"}
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BedIcon fontSize="small" color="action" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 0.5 }}
                >
                  {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BathtubIcon fontSize="small" color="action" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 0.5 }}
                >
                  {property.bathrooms}{" "}
                  {property.bathrooms === 1 ? "Bath" : "Baths"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SquareFootIcon fontSize="small" color="action" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 0.5 }}
                >
                  {property.area} m²
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Property</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Property</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleManageImages}>
          <ListItemIcon>
            <ImageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Manage Images</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: "error.main" }}>
            Delete Property
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{property.title}"? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PropertyManagementItem;
