import { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Avatar,
  Divider,
  Button,
  TextField,
  Paper,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { currentUser } from "../data/dummyData";

function PropertyReviews({ reviews, propertyId }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Review submitted:", data);

    // Create a new review object
    const newReview = {
      id: Date.now(), // Generate a temporary ID
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      propertyId,
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date().toISOString(),
    };

    // Add the new review to the local state
    setLocalReviews([newReview, ...localReviews]);

    // Reset the form and hide it
    reset();
    setShowReviewForm(false);
  };

  const calculateAverageRating = () => {
    if (localReviews.length === 0) return 0;
    const sum = localReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / localReviews.length;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Reviews
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating value={calculateAverageRating()} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {calculateAverageRating().toFixed(1)} ({localReviews.length}{" "}
              {localReviews.length === 1 ? "review" : "reviews"})
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? "Cancel" : "Write a Review"}
        </Button>
      </Box>

      {showReviewForm && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Share Your Experience
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="legend">Your Rating</Typography>
                <Rating
                  name="rating"
                  defaultValue={5}
                  precision={1}
                  {...register("rating", { required: true })}
                  onChange={(_, value) => {
                    register("rating").onChange({ target: { value } });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Review"
                  multiline
                  rows={4}
                  {...register("comment", {
                    required: "Please enter your review",
                  })}
                  error={!!errors.comment}
                  helperText={errors.comment?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit Review
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      {localReviews.length > 0 ? (
        localReviews.map((review, index) => (
          <Box key={review.id}>
            {index > 0 && <Divider sx={{ my: 3 }} />}
            <Box sx={{ display: "flex", mb: 2 }}>
              <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                {review.userName.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" component="div">
                  {review.userName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(review.createdAt)}
                </Typography>
              </Box>
            </Box>
            <Rating
              value={review.rating}
              readOnly
              size="small"
              sx={{ mb: 1 }}
            />
            <Typography variant="body1">{review.comment}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No reviews yet. Be the first to share your experience!
        </Typography>
      )}
    </Box>
  );
}

export default PropertyReviews;
