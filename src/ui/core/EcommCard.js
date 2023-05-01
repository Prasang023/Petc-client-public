import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import { Avatar, IconButton, CardMedia } from "@material-ui/core";

const EcommCard = props => {
  const {  title, price, description, imageUrl } = props;
  return (
    <Card style={{ height: "350px" }} elevation={0}>
      <CardMedia style={{ height: "200px", objectFit: "cover" }} image={imageUrl} />
      <CardContent spacing={2}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" component="p" style={{color: "#464646"}}>
          {description}
        </Typography>
        <Typography variant="h5" style={{ fontWeight: 600 }} color="primary">{price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" variant="outlined" color="primary">BUY NOW</Button>
        <Button size="medium" variant="outlined" color="primary">MORE</Button>
      </CardActions>
    </Card>
  );
};

export default EcommCard;