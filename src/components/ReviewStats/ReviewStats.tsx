import React, { useEffect, useState } from "react";
// @mui
import { Rating } from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

interface IStats {
  averageScore: number;
  reviewsCount: number | null;
}
const defaultStatsState: IStats = {
  averageScore: 5,
  reviewsCount: null
}

interface ReviewStatsProps {
  slug: string;
  apiURL: string;
}
const ReviewStats = (props: ReviewStatsProps) => {
  const { apiURL, slug } = props
  const [stats, setStats] = useState<IStats>(defaultStatsState)
  useEffect(() => {
    const fetchStats = async () => {
      const url = `${apiURL}/api/ratings/reviews/${slug}/stats`
      try {
        const data_res = await fetch(url)
        const data = await data_res.json()
        if (!data_res.ok) {
          throw data
        }
        setStats(data)
      } catch(err) {
        console.log("Error fetching reviews stats")
        console.log(err)
        setStats({
          averageScore: 5,
          reviewsCount: 0
        })
      }
    }
    fetchStats()
  }, [])
  return (
    <div className="d-flex">
      <div>
        <Rating
          icon={<StarRoundedIcon fontSize="inherit" />}
          emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
          readOnly value={stats.averageScore} precision={0.1}
        />
      </div>
      <p className="ms-2 mb-0 d-flex align-items-end" style={{margin: 0}}>
        {
          (stats.reviewsCount === null) ?
            "loading reviews"
          : "("+stats.reviewsCount + " review"+(stats.reviewsCount !== 1 ? "s" : "")+")"
        }
      </p>
    </div>
  )
}

export default ReviewStats
