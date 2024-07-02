import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Styles from "./DataTable.module.css";
import { Alert, Snackbar } from "@mui/material";

const DataTable = (props) => {
  return (
    <Box sx={{ height: 600, width: "calc(100% - 16px)", overflowX: "auto" }}>
      <DataGrid
        className={Styles.dataGrid}
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[props.rows.length]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        hideFooterPagination
        processRowUpdate={(newRow, oldRow) =>
          props.processRowUpdate(newRow, oldRow)
        }
        onProcessRowUpdateError={props.handleProcessRowUpdateError}
      />
      {!!props.snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={props.handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...props.snackbar} onClose={props.handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};

export default DataTable;
