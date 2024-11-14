import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CourseCard({ course }) {
  const { title, description, price, imageLink } = course;
  return (
    <div data-testid="course-card">
      <CardMedia sx={{ height: 140 }} image={imageLink} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography className="!mt-2 !font-bold">${price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </div>
  );
}
