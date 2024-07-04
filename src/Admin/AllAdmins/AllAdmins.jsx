import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function EditToolbar(props) {
  const { onAddClick } = props;

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={onAddClick}>
        Add New Admin
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState("");
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [newPhoneNumber, setNewPhoneNumber] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${NODE_API_ENDPOINT}/admin/getAdmins`
        );
        const data = response.data;

        // Transform the data
        const transformedData = data.flatMap((item) =>
          item.users.map((user) => ({
            id: user.mongoId,
            phoneNumber: user.phoneNumber,
            planName: user.planName,
            tokenUsed: user.tokenUsed,
          }))
        );

        setRows(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const updatedRow = rows.find((row) => row.id === id);

    try {
      if (updatedRow.isNew) {
        // Make an API call to add a new record in the backend
        await axios.post("/api/addUser", updatedRow);
        console.log("Data added successfully");
      } else {
        // Make an API call to update the data in the backend
        await axios.put(`/api/updateUser/${id}`, updatedRow);
        console.log("Data updated successfully");
      }

      setRows((prevRows) =>
        prevRows.map((row) => (row.id === id ? { ...row, isNew: false } : row))
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDeleteClick = (id) => () => {
    console.log(id);
    setSelectedRowId(id);
    setDialogType("delete");
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    setRows(rows.filter((row) => row.id !== selectedRowId));

    // Make an API call to delete the data in the backend
    try {
      await axios.post(
        `${NODE_API_ENDPOINT}/admin/cly4i25op00006ojek0jzn20p/removeUser`,
        {
          userId: selectedRowId,
        }
      );
      console.log("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setOpen(false);
    setSelectedRowId(null);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "phoneNumber",
      headerName: "Mobile Number",
      width: 180,
    },
    {
      field: "planName",
      headerName: "Plan",
      width: 180,
    },
    {
      field: "tokenUsed",
      headerName: "Token Used",
      type: "number",
      width: 120,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedRowId(null);
    setNewPhoneNumber("");
  };

  const handleAddNewUser = () => {
    setDialogType("add");
    setOpen(true);
  };

  const handleConfirmAdd = async () => {
    const id = Math.random().toString(36).substring(2);
    const newRow = {
      id,
      phoneNumber: newPhoneNumber,
      planName: "",
      tokenUsed: 0,
      isNew: true,
    };

    try {
      const fetchData = async () => {
        try {
          const updatedUser = await axios.post(
            `${NODE_API_ENDPOINT}/admin/cly4i25op00006ojek0jzn20p/addAdminUser`,
            { phoneNumber: newPhoneNumber }
          );

          const response = await axios.get(
            `${NODE_API_ENDPOINT}/admin/getAdmins`
          );
          const data = response.data;

          // Transform the data
          const transformedData = data.flatMap((item) =>
            item.users.map((user) => ({
              id: user.mongoId,
              phoneNumber: user.phoneNumber,
              planName: user.planName,
              tokenUsed: user.tokenUsed,
            }))
          );

          setRows(transformedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } catch (error) {
      console.error("Error adding new user:", error);
    }

    setOpen(false);
    setNewPhoneNumber("");
  };

  return (
    <Box
      style={{ backgroundColor: "white", borderRadius: "5px" }}
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooterPagination
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: () => <EditToolbar onAddClick={handleAddNewUser} />,
        }}
      />

      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogType === "delete"
            ? "Confirm Deletion"
            : dialogType === "add"
            ? "Add New Admin"
            : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogType === "delete"
              ? "Are you sure you want to delete this admin?"
              : dialogType === "add"
              ? "Please enter the user's mobile number to add as new admin."
              : ""}
          </DialogContentText>
          {dialogType === "add" && (
            <TextField
              autoFocus
              margin="dense"
              id="phoneNumber"
              label="Mobile Number"
              type="text"
              fullWidth
              variant="standard"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={
              dialogType === "delete"
                ? handleConfirmDelete
                : dialogType === "add"
                ? handleConfirmAdd
                : null
            }
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
