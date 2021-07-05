import React from "react";
import firebase from "firebase";
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useMessages } from "../../common/modules/messages";
import { useUser } from "../../common/utils";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 900,
    margin: 'auto',
    marginTop: 70,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Profile() {
  const user = useUser();
  const classes = useStyles();
  const history = useHistory();
  const { addMessage } = useMessages();
  const handleSignout = () => {
    firebase.auth().signOut()
      .then(() => history.push('/'))
      .then(() => addMessage({ descr: 'You have sign out succesfully!'}));
  }

  if (user == null) {
    return <CircularProgress className="top_bar_margin center" />;
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Profile
        </Typography>
        <Typography variant="h5" component="h2">
          {user.displayName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {user.email}
        </Typography>

        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={handleSignout}
          >
            Sign out!
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default Profile;
