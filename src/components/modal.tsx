import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as React from "react";

interface ModalDialogProps {
  show: boolean;
  closeModal: () => void;
  confirmModalAction: () => void;
  dialogTitle: string | null;
  dialogContent?: string;
}

const ModalDialog: React.SFC<ModalDialogProps> = props => {
  const dialogTitle = props.dialogTitle && (
    <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
  );

  return (
    <Dialog
      open={props.show}
      onClose={props.closeModal}
      data-cy="confirmation-modal"
      data-testid="confirmation-modal"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {dialogTitle}
      {props.dialogContent && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.dialogContent}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={props.closeModal} color="primary">
          Cancel
        </Button>
        <Button
          data-cy="confirmDialogBtn"
          data-testid="confirmDialogBtn"
          onClick={props.confirmModalAction}
          color="primary"
          autoFocus={true}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;
