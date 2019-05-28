import { createStyles, Theme } from "@material-ui/core/styles";

export const styles = (theme: Theme) =>
  createStyles({
    tableLoader: {
      height: "100%",
      textAlign: "center",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem"
    },
    errorMessage: {
      padding: "0.4rem"
    }
    // looks like jss does not support @page right now, it throws error if I uncomment this code
    // will disable table print option for now, but once this is fixed, we can re-enable it and uncomment this
    // https://github.com/cssinjs/jss/issues/620
    // "@page": {
    //   size: 'A4 landscape',
    //   margin: '0.1cm'
    // }
  });
