import { Skeleton } from "@mui/material";

export default function PropertyCard() {
  return (
    <div>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </div>
  );
}
