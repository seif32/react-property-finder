import { useState } from "react";
import { Box, Grid, Modal } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

function PropertyImageGallery({ images }) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <>
      <Grid container spacing={1}>
        {/* Main image */}
        <Grid item xs={12} md={8}>
          <Box
            onClick={() => handleOpen(0)}
            sx={{
              height: { xs: 250, md: 400 },
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              position: "relative",
              "&:hover::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <img
              src={images[0].imageUrl || "/placeholder.svg"}
              alt={images[0].description}
              className="w-full h-full object-cover"
            />
          </Box>
        </Grid>

        {/* Thumbnail grid */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={1}>
            {images.slice(1, 5).map((image, index) => (
              <Grid item xs={6} key={image.id}>
                <Box
                  onClick={() => handleOpen(index + 1)}
                  sx={{
                    height: { xs: 120, md: 196 },
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    "&:hover::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <img
                    src={image.imageUrl || "/placeholder.svg"}
                    alt={image.description}
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && images.length > 5 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      +{images.length - 5} more
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Full-screen image modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 1000,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1,
            outline: "none",
            borderRadius: 2,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <img
              src={images[selectedIndex].imageUrl || "/placeholder.svg"}
              alt={images[selectedIndex].description}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <Box
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <CloseIcon />
            </Box>
            <Box
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </Box>
            <Box
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default PropertyImageGallery;
