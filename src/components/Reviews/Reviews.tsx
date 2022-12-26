import React, { useContext, useState, useEffect } from "react";

// @mui
import { styled } from '@mui/material/styles';
import { Grid, Rating, Button, Typography, LinearProgress, Stack, Link } from '@mui/material';

import Review from "../Review";
import ReviewsContext from "../ReviewsProvider";


// const RatingStyle = styled(Rating)(({ theme }) => ({
//   marginBottom: theme.spacing(1),
// }));

// const GridStyle = styled(Grid)(({ theme }) => ({
//   padding: theme.spacing(3),
//   display: 'flex',
//   alignItems: 'center',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   '&:nth-of-type(2)': {
//     [theme.breakpoints.up('md')]: {
//       borderLeft: `solid 1px ${theme.palette.divider}`,
//       borderRight: `solid 1px ${theme.palette.divider}`,
//     },
//   },
// }));

const Reviews = () => {
  const {
    reviewsCount,
    reviews,
    userReview,
    loadMore,
    loadingReviews,
    averageScore
  } = useContext(ReviewsContext)
  const [loadingMore, setLoadingMore] = useState(false)
  const [reviewsJSX, setReviewsJSX] = useState<React.ReactNode[] | null>(null)
  const [userReviewJSX, setUserReviewJSX] = useState<React.ReactNode>(null)
  useEffect(() => {
    setReviewsJSX(reviews.map(review => {
      return (
        <Review data={review} key={review.id} />
      );
    }));
  }, [reviews]);
  useEffect(() => {
    if (userReview) {
      setUserReviewJSX(
        <div className="d-flex flex-column">
          <p className="fw-bold mb-1">Your review:</p>
          <Review data={userReview} />
        </div>
      )
    }
  }, [userReview]);
  const loadMoreReviews = async () => {
    setLoadingMore(true);
    await loadMore();
    setLoadingMore(false);
  }
  return (
    <div>
      {
        loadingReviews ?
          <p className="small fs-6">
            Loading reviews...
          </p>
        :
          (reviews.length > 0 || userReview) ?
            <div className="d-flex flex-column">
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Average rating
                </Typography>
                <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
                  {averageScore}/5
                </Typography>
                <Rating readOnly value={averageScore} precision={0.1} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ({reviewsCount}
                  &nbsp;review{reviewsCount === 1 ? "" : "s"})
                </Typography>
              </Grid>
              <div>
                {userReviewJSX}
                {reviewsJSX}
              </div>
              {
                (
                  (reviews.length > 0) &&
                  (reviews.length < (userReview ? reviewsCount-1 : reviewsCount))
                ) &&
                <button
                  className="btn btn-primary"
                  onClick={loadMoreReviews}
                  disabled={loadingMore ? true : undefined}
                >Load more reviews</button>
              }
            </div>
          : <p className="small fs-6">There are no reviews</p>
      };
    </div>
  );
};

export default Reviews;