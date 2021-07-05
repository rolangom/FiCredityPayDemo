import React from 'react';
import create from 'zustand';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Maybe from '../components/Maybe';

interface IMessage {
  title?: string,
  descr: string,
  severity?: "info" | "error" | "warning" | "success",
  // type?: 'alert'|'toast',
  undoAction?: () => void,
  autoHideDuration?: number,
}

interface IMessagesStore {
  messages: IMessage[],
  // getFirstAlert(): IMessage|undefined,
  // getFirstToast(): IMessage|undefined,
  addMessage(msg: IMessage): void,
  shift(): void,
}


export const useMessages = create<IMessagesStore>((set, get) => ({
  messages: [],
  // getFirstAlert: () => get().messages.find(it => it.type === 'alert'),
  // getFirstToast: () => get().messages.find(it => it.type === 'toast'),
  addMessage: (msg: IMessage) => set(state => ({ messages: state.messages.concat(msg) })),
  shift: () => set(state => ({ messages: state.messages.slice(1) })),
}));


const defaultAutoHideDuration = 5000;

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export function SnakbarMessages() {
  const maybeFirstSnakMsg = useMessages(state => state.messages[0]);
  const handleClose = useMessages(state => state.shift);
  const classes = useStyles();

  if (maybeFirstSnakMsg === undefined) return null;

  function localUndoAction() {
    maybeFirstSnakMsg.undoAction!();
    handleClose();
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={true}
      autoHideDuration={maybeFirstSnakMsg.autoHideDuration ?? defaultAutoHideDuration}
      onClose={handleClose}
      onExited={handleClose}
      message={maybeFirstSnakMsg.descr}
      action={
        <React.Fragment>
          <Maybe
            component={Button}
            visible={!!maybeFirstSnakMsg.undoAction}
            color="secondary"
            size="small"
            onClick={localUndoAction}
          >
            UNDO
          </Maybe>
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

export default SnakbarMessages;
