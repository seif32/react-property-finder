import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function PropertyImageUploader({ propertyId, initialImages = [] }) {
  const [images, setImages] = useState(initialImages);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  const handleAddImage = () => {
    setCurrentImage(null);
    setImageUrl("");
    setDescription("");
    setIsPrimary(false);
    setOpenDialog(true);
  };

  const handleEditImage = (image) => {
    setCurrentImage(image);
    setImageUrl(image.imageUrl);
    setDescription(image.description);
    setIsPrimary(image.isPrimary);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveImage = () => {
    if (!imageUrl) return;

    if (currentImage) {
      // Edit existing image
      console.log(`PUT /api/property-images/${currentImage.id} with data:`, {
        imageUrl,
        description,
        isPrimary,
      });

      const updatedImages = images.map((img) => {
        if (img.id === currentImage.id) {
          return { ...img, imageUrl, description, isPrimary };
        }
        // If this image is set as primary, make sure other images are not primary
        return isPrimary ? { ...img, isPrimary: false } : img;
      });

      setImages(updatedImages);
    } else {
      // Add new image
      console.log(`POST /api/property-images with data:`, {
        propertyId,
        imageUrl,
        description,
        isPrimary,
      });

      const newImage = {
        id: Date.now(), // Temporary ID for dummy data
        propertyId,
        imageUrl,
        description,
        isPrimary,
      };

      // If new image is primary, update other images
      const updatedImages = isPrimary
        ? images.map((img) => ({ ...img, isPrimary: false }))
        : [...images];

      setImages([...updatedImages, newImage]);
    }

    setOpenDialog(false);
  };

  const handleDeleteImage = (imageId) => {
    if (confirm("Are you sure you want to delete this image?")) {
      console.log(`DELETE /api/property-images/${imageId}`);
      setImages(images.filter((img) => img.id !== imageId));
    }
  };

  const handleSetPrimary = (imageId) => {
    console.log(`PUT /api/property-images/${imageId}/set-primary`);

    setImages(
      images.map((img) => ({
        ...img,
        isPrimary: img.id === imageId,
      }))
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">Property Images</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={handleAddImage}
        >
          Add Image
        </Button>
      </Box>

      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item key={image.id} xs={12} sm={6} md={4}>
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="200"
                image={image.imageUrl}
                alt={image.description}
                sx={{ objectFit: "cover" }}
              />
              {image.isPrimary && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    bgcolor: "primary.main",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  Primary
                </Box>
              )}
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Box>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditImage(image)}
                    aria-label="Edit image"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteImage(image.id)}
                    aria-label="Delete image"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                {!image.isPrimary && (
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleSetPrimary(image.id)}
                    aria-label="Set as primary image"
                  >
                    <StarBorderIcon />
                  </IconButton>
                )}
              </CardActions>
            </Card>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: "block" }}
            >
              {image.description || "No description"}
            </Typography>
          </Grid>
        ))}

        {images.length === 0 && (
          <Grid item xs={12}>
            <Box
              sx={{
                border: "2px dashed",
                borderColor: "divider",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography variant="body1" color="text.secondary" gutterBottom>
                No images added yet
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddPhotoAlternateIcon />}
                onClick={handleAddImage}
              >
                Add First Image
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Image Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {currentImage ? "Edit Image" : "Add New Image"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              margin="normal"
              helperText="Enter a valid image URL"
            />

            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  color="primary"
                />
              }
              label="Set as primary image"
              sx={{ mt: 1 }}
            />

            {imageUrl && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom>
                  Preview:
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 1,
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveImage}
            variant="contained"
            color="primary"
            disabled={!imageUrl}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PropertyImageUploader;
