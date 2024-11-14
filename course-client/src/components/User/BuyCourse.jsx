import { Button, CardActions } from "@mui/material";

const BuyCourse = (Card) => {
  return function (props) {
    const enrolToCourse = async () => {
      const data = await fetch(
        `http://localhost:3000/user/courses/${props.course._id}`,
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const json = await data.json();
      console.log(json);
    };

    return (
      <div>
        <Card {...props} />
        <CardActions>
          <Button variant="contained" onClick={enrolToCourse}>
            Enrol
          </Button>
        </CardActions>
      </div>
    );
  };
};

export default BuyCourse;
