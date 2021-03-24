import { FC, ReactNode } from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(3),
      minHeight: `calc(100vh - 33px)`,
      background: theme.palette.background.paper,
      marginLeft: theme.spacing(7) + 1,
    },
    childrenWrapper: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      maxHeight: "180px",
      maxWidth: "500px",
      width: "60%"
    },
  })
);

interface Props {
  children: ReactNode;
  onSubmit?: any,
}

export const FormLayout: FC<Props> = ({ children, onSubmit }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={clsx(classes.content)}>
        <form className={classes.childrenWrapper} onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};