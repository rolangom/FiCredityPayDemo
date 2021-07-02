import React from "react";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Badge from '@material-ui/core/Badge';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useItems } from "../../common/modules/items";
import { ellipsify } from "../../common/utils";
import { useCart } from "../../common/config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export function TopBar() {
  const classes = useStyles();
  const cartItemLen = useCart(state => state.cart.length);
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            FiCredityPay
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Badge badgeContent={cartItemLen} color="secondary">
            <IconButton
              aria-label="shopping cart"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={handleMenu}
              color="inherit"
            >
              <ShoppingCart />
            </IconButton>
          </Badge>
        </Toolbar>
      </AppBar>
    </div>
  )
}


const useHomeStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 72,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 900,
      // height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

function Home() {
  const { isLoading, isFetching, data } = useItems();
  const classes = useHomeStyles();
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={250} className={classes.gridList} cols={3}>
        {data?.map((it) => (
          <GridListTile key={it.id} cols={1}>
            <img src={it.photoURL} alt={it.title} />
            <GridListTileBar
              title={it.title}
              subtitle={<span>{ellipsify(it.descr, 35)}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${it.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

}

export default Home;