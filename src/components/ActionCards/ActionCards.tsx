import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

interface ActionCard {
  imageString: string;
  routerPath: string;
  actionName: string;
  description: string;
}

export default function ActionAreaCard(props: ActionCard) {
  return (
    <Card sx={{ maxWidth: 220 }} style={{ padding: "10px", margin: "10px" }}>
      <Link to={props.routerPath} style={{ textDecoration: 'none' }}>
        <CardActionArea>
          <CardMedia component="img" image={props.imageString} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" >
              {props.actionName}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
