import CircularProgress from "@material-ui/core/CircularProgress";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { ErrorOutline } from "@material-ui/icons";
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions
} from "mui-datatables";
import React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "./table.styles";

type ITableProps = {
  /* Columns of the table to be rendered */
  columns: Array<{
    name: string;
    options?: { filter: boolean; sort?: boolean; display?: any };
  }>;
  /* Title to be shown in the top left of the table */
  title: string;
  /* Array of Arrays where each subarray is a row with the entries corresponding to columns in order */
  data: React.ReactNode[][];
  /* Further options that can be found in the mui-datatable API */
  options?: MUIDataTableOptions;
  /* Is table loading data? */
  loading?: boolean;
  /* Error in data fetching? */
  error?: { message: string } | null;
  /* Elevation of paper component containing table */
} & WithStyles<typeof styles>;
function TableLoader(props: { classes: { tableLoader: string } }) {
  return (
    <div data-testid="table-loader" className={props.classes.tableLoader}>
      <CircularProgress />
    </div>
  );
}

function TableError(props: Pick<ITableProps, "error" | "classes">) {
  return (
    <div data-testid="table-error" className={props.classes.tableLoader}>
      <ErrorOutline />
      <p
        className={props.classes.errorMessage}
      >{`Something went wrong: ${props.error && props.error.message}`}</p>
    </div>
  );
}

export function Table(props: ITableProps) {
  console.log(props.error, props.loading);
  const { title, columns, options, error, loading, data } = props;

  const getMuiTheme = () =>
    createMuiTheme({
      typography: {
        useNextVariants: true
      },
      overrides: {
        MuiPaper: {
          // @ts-ignore
          root: {
            width: "100%"
          }
        },
        // @ts-ignore
        MUIDataTableBodyRow: {
          // @ts-ignore
          root: {
            cursor: "pointer"
          }
        },
        MUIDataTableSelectCell: {
          // @ts-ignore
          root: {
            background: "white"
          }
        },
        MuiTableCell: {
          root: {
            padding: "10px"
          }
        }
      }
    });
  /**
   * Render multiple potential table views
   * A Blank, Loading, Partial, Error, and Ideal Table Stateshould all be handled here.
   */

  const tableProps: {
    columns: MUIDataTableColumnDef[];
    title: string;
    options: MUIDataTableOptions;
    data: React.ReactNode[][];
  } = {
    title,
    columns,
    options: {
      ...options,
      selectableRows: false,
      filter: false,
      filterType: "textField",
      print: false,
      elevation: 1
    },
    data: [[""]]
  };

  if (loading === true) {
    tableProps.columns = [
      {
        name: "",
        options: {
          customBodyRender: () => <TableLoader classes={props.classes} />
        }
      }
    ];
    tableProps.data = [[""]];
    tableProps.options.selectableRows = false;
    tableProps.options.customFooter = () => {
      return <tbody />;
    };
    return <MUIDataTable {...tableProps} />;
  } else if (error != null) {
    tableProps.columns = [
      {
        name: " ",
        options: {
          filter: false,
          customBodyRender: () => (
            <TableError classes={props.classes} error={props.error} />
          )
        }
      }
    ];
    tableProps.options.customFooter = () => {
      return <tbody />;
    };
    tableProps.data = [["error"]];
    return (
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable {...tableProps} />
      </MuiThemeProvider>
    );
  } else {
    tableProps.data = data;
    return (
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable {...tableProps} />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Table);
