import React from "react";
import { Link, NavLink, useHistory } from 'react-router-dom';
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
import { useCart } from "../../common/modules/cart";
import { IItem } from "../../common/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 'auto',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color: 'inherit',
      textDecoration: 'inherit',
    },
  }),
);

export function TopBar() {
  const classes = useStyles();
  const cartItemLen = useCart(state => state.getLength());
  const history = useHistory();
  function handleMenu() {
    history.push('/cart');
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
            <Typography variant="h6" className={classes.title}>
              <NavLink to="/" className={classes.link}>
                FiCredityPay
              </NavLink>
            </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
          >
            <NavLink to="/profile" className={classes.link}>
              <AccountCircle />
            </NavLink>
          </IconButton>
          <Badge badgeContent={cartItemLen} color="secondary">
            <IconButton
              aria-label="shopping cart"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
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


function GridItem(props: { item: IItem }) {
  const classes = useHomeStyles();
  const { item: it } = props;
  const history = useHistory();
  const onInfoClick = () => history.push(`/items/${it.id}`, it);
  return (
    <GridListTile cols={1}>
      <img src={it.photoURL} alt={it.title} />
      <GridListTileBar
        title={it.title}
        subtitle={<span>{it.price.toLocaleString(undefined, { style: "currency", currency: it.currency })}</span>}
        actionIcon={
          <IconButton onClick={onInfoClick} aria-label={`info about ${it.title}`} className={classes.icon}>
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
  );
}

function Home() {
  const { isLoading, isFetching, data } = useItems();
  const classes = useHomeStyles();
  if (isLoading) {
    return <CircularProgress className={classes.root} />;
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList} cols={3}>
        {data?.map((it) => (
          <GridItem key={it.id} item={it} />
        ))}
      </GridList>
    </div>
  );

}

export default Home;