import { FC, ReactNode } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "250px",
    },
  })
);

interface Props {
  onClose: () => void,
  open: boolean,
  children?: ReactNode,
}

export const MyDialog: FC<Props> = ({ onClose, open, children }) => {
  const classes = useStyles();
  return (
    <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm"
        fullWidth>
            <div className={classes.container}>
                {children}
            </div>
    </Dialog>
  );
};