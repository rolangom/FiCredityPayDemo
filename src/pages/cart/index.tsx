import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import PaymentIcon from '@material-ui/icons/Payment';
import Button from '@material-ui/core/Button';
import { useCart } from '../../common/modules/cart';
import { ICartItem, IItem } from '../../common/types';
import { useItems } from '../../common/modules/items';
import { currency } from '../../common/config';
import Maybe from '../../common/components/Maybe';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 900,
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
    },
    inline: {
      display: 'inline',
    },
  }),
);

function CartItemQtySelect(props: { itemId: IItem['id'], qty: number, onChange: (it: ICartItem) => void }) {
  const { itemId, qty, onChange } = props;
  const numList = Array(props.qty + 10).fill(undefined).map((_, i) => i);
  const onChangeHandler = (ev: React.ChangeEvent<{ name?: string | undefined; value: unknown }>, child: React.ReactNode) =>
    onChange({ itemId, qty: ev.target.value as number });
  return (
    <Select
      labelId="Quantity"
      value={qty}
      onChange={onChangeHandler}
    >
      {numList.map(n => <MenuItem value={n}>{n}</MenuItem>)}
    </Select>
  );
}

function CartItem(props: { id: IItem['id'], qty: number, item: IItem, classes: ReturnType<typeof useStyles>, onChange: (it: ICartItem) => void, }) {
  const { qty, id, item, classes, onChange } = props;
  console.log('CartItem', item);
  const subtitle = ` x ${item.price.toLocaleString(undefined, { style: "currency", currency })}`;
  const onDeleteHandler = () => onChange({ itemId: id, qty: 0 });
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar variant="square" alt={item.title} src={item.image} />
      </ListItemAvatar>
      <ListItemText
        primary={item.title}
        secondary={
          <React.Fragment>
            <CartItemQtySelect itemId={id} qty={qty} onChange={onChange} />
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
            >
              {subtitle}
            </Typography>
          </React.Fragment>
        }
      />
      <ListItemSecondaryAction>
        <Typography className={classes.inline}>{(qty * item.price).toLocaleString(undefined, { style: "currency", currency })}</Typography>
        <IconButton onClick={onDeleteHandler} edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

function TotalItem(props: { cart: Record<IItem['id'], number>, items: Map<IItem['id'], IItem>, classes: ReturnType<typeof useStyles> }) {
  const { cart, items, classes } = props;
  const total = Object.entries(cart).map(([key, qty]) => items.get(Number(key))!.price * qty).reduce((acc, it) => acc + it, 0);
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText primary="Total" />
        <ListItemSecondaryAction>
          <Typography variant="h5" className={classes.inline}>${total.toLocaleString()}</Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <br />
      <ListItem alignItems="flex-start">
        <ListItemSecondaryAction>
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PaymentIcon />}
          >
            Checkout!
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  )
}

function Cart() {
  const { isLoading, isFetching, data } = useItems();
  const classes = useStyles();
  const { cart, set: updateCartItem } = useCart();
  const items = React.useMemo(() => data && new Map<number, IItem>(data.map(it => [it.id, it])), [data]);
  if (isFetching || isLoading) {
    return <CircularProgress className="top_bar_margin" />
  }
  return (  
    <div className="top_bar_margin">
      {/* <h1>Cart</h1> */}
      <List className={classes.root}>
        {items && cart && Object.entries(cart).map(([key, qty]) => (
          <CartItem
            key={key}
            id={Number(key)}
            qty={qty}
            item={items.get(Number(key))!}
            classes={classes}
            onChange={updateCartItem}
          />
        ))}
        <Divider />
        <Maybe component={React.Fragment} visible={!!(items && cart)}>
          <TotalItem items={items!} cart={cart} classes={classes} />
        </Maybe>
      </List>
    </div>
  );
}

export default Cart;
