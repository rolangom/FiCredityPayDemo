import React from 'react';
import { useLocation, useParams, Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import TextField from '@material-ui/core/TextField';
import { IItem } from '../../common/types';
import { useCart } from '../../common/modules/cart';
import { useMessages } from '../../common/modules/messages';
import { currency } from '../../common/config';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


function DetailActions(props: { item: IItem }) {
  const { item } = props;
  const [qty, setQty] = React.useState(1);
  const { addMessage } = useMessages();
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (ev) =>setQty(Number(ev.target.value));
  const { add: addToCart, } = useCart();
  const onAddClickHandler = () => {
    addToCart({ itemId: item.id, qty });
    setQty(1) // reset
    const undoAction = () => addToCart({ itemId: item.id, qty: -qty });
    addMessage({ descr: `${qty} ${item.title} added.`, undoAction });
  }
  return (
    <>
      <TextField
        label="Quantity"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={qty}
        onChange={onChangeHandler}
      />
      <IconButton onClick={onAddClickHandler} aria-label="add to cart">
        <AddShoppingCart />
      </IconButton>
    </>
  );
}

function Detail() {
  // const { id } = useParams<{ id: string }>()
  const { state: item } = useLocation<IItem>();
  const history = useHistory();
  const classes = useStyles();

  if (!item) {
    return <Redirect to="/" />;
  }

  return (
    <Dialog open={true} onClose={history.goBack}>
      <CardHeader
        title={item.title}
        subheader={item.category}
      />
      <CardMedia
        className={classes.media}
        image={item.image}
        title={item.title}
      />
      <CardContent>
        <Typography variant="h3">{item.price.toLocaleString(undefined, { style: "currency", currency })} </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.description}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <DetailActions item={item} />
        {/* 
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>
    </Dialog>
  )

}

export default Detail;