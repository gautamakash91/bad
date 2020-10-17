import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography
} from "@material-ui/core";
import React from "react";
import ns from "./ns.png";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch("https://nextstacks-backend-01.herokuapp.com/v1/get_active_domains", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.status) {
          var result = [];
          responseJson.result.map((s) => (
            result.push(s)
          ))

          this.setState({
            data: result
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state.data);
    if(this.state.data.length === 0){
      return null
    }
    return (
      <Grid container>
        <Grid item xs={12}>
          <img 
            src={ns}
            style={{width: 100}} 
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
          >
            NEXTSTACKS DOMAINS
          </Typography>
        </Grid>
        <List>
          {this.state.data.map((s, index) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={s.domain_image} />
              </ListItemAvatar>
              <ListItemText
                primary={s.domain_name}
                secondary={s.short_description}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    )
  }
}