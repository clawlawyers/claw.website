import React, { useState, useEffect } from "react";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import Styles from "./Users.module.css";
import DataTable from "../components/DataTable/DataTable";
import axios from "axios";
import { Select, MenuItem, Checkbox, ListItemText } from "@mui/material";

const PlanSelectEditor = ({ id, value, api }) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    api.setEditCellValue({
      id,
      field: "planNames",
      value: typeof value === "string" ? value.split(",") : value,
    });
  };

  return (
    <Select
      multiple
      value={value}
      onChange={handleChange}
      renderValue={(selected) => selected.join(", ")}
    >
      {[
        "PROC_500_1",
        "PRO_10000_4",
        "PRO_1000_1",
        "PRO_100_1",
        "PRO_5000_1",
        "PRO_5000_2",
        "PRO_5000_4",
        "PRO_500_1",
        "PRO_500_2",
        "PRO_500_4",
        "PRO_U_4",
        "TOPUP_5_1",
        "TRAIL_10_1",
        "free",
        "student",
      ].map((plan) => (
        <MenuItem key={plan} value={plan}>
          <Checkbox checked={value.indexOf(plan) > -1} />
          <ListItemText primary={plan} />
        </MenuItem>
      ))}
    </Select>
  );
};

const columns = [
  { field: "phoneNumber", headerName: "Phone Number", width: 150 },
  {
    field: "planNames",
    headerName: "Plans",
    width: 200,
    editable: true,
    renderCell: (params) => params.value.join(", "),
    renderEditCell: (params) => (
      <PlanSelectEditor id={params.id} value={params.value} api={params.api} />
    ),
  },
  { field: "totalTokenUsed", headerName: "Tokens Used", width: 120 },
  { field: "numberOfSessions", headerName: "Total Sessions", width: 120 },
  {
    field: "StateLocation",
    headerName: "State",
    width: 150,
    editable: true,
    type: "singleSelect",
    valueOptions: [
      "None",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry",
      "Ladakh",
      "Jammu and Kashmir",
    ],
    valueFormatter: (params) => {
      return params.value === "None" || params.value === ""
        ? "..."
        : params.value;
    },
  },
  {
    field: "dailyEngagementTime",
    headerName: "Daily Engagement Time",
    width: 120,
    valueGetter: (params) => params.row.engagementTime.daily,
  },
  {
    field: "monthlyEngagementTime.monthly",
    headerName: "Monthly Engagement Time",
    width: 120,
    valueGetter: (params) => params.row.engagementTime.monthly,
  },
  {
    field: "totalEngagementTime",
    headerName: "Total Engagement Time",
    width: 120,
    valueGetter: (params) => params.row.engagementTime.total,
  },
  {
    field: "averageSessionEngagementTime",
    headerName: "Total Engagement Time",
    width: 120,
  },

  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },
];

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === "") {
            reject(new Error("Error while saving user: name cannot be empty."));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    []
  );
};

export default function Users() {
  const mutateRow = useFakeMutation();

  const [users, setUsers] = useState([]);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const processRowUpdate = React.useCallback(
    async (newRow, oldRow) => {
      const updatedFields = Object.keys(newRow).filter(
        (key) => newRow[key] !== oldRow[key]
      );

      try {
        // Make the HTTP request to save in the backend
        if (updatedFields.includes("StateLocation")) {
          if (newRow.StateLocation === "None") {
            newRow.StateLocation = "";
          }
          await axios.patch(`${NODE_API_ENDPOINT}/admin/updateUserLocation`, {
            location: newRow.StateLocation,
            id: newRow.mongoId,
          });
        }

        // Add other field-specific API calls here
        if (updatedFields.includes("planNames")) {
          console.log(newRow.planNames);
          await axios.patch(`${NODE_API_ENDPOINT}/admin/updateUserPlans`, {
            planNames: newRow.planNames,
            id: newRow.mongoId,
          });
        }

        const response = await mutateRow(newRow);
        setSnackbar({
          children: "User successfully saved",
          severity: "success",
        });

        // Update the local state with the new row data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.mongoId === newRow.mongoId ? { ...user, ...newRow } : user
          )
        );
        return response;
      } catch (error) {
        setSnackbar({ children: error.message, severity: "error" });
        throw error;
      }
    },
    [mutateRow]
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${NODE_API_ENDPOINT}/admin/user`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUsers();
  }, []);

  // console.log(users);

  const rows = users.map((user, index) => ({
    id: index + 1,
    ...user,
  }));

  return (
    <div className="users">
      <div className={Styles.info}>
        <h1>Users</h1>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={rows}
        processRowUpdate={processRowUpdate}
        handleProcessRowUpdateError={handleProcessRowUpdateError}
        snackbar={snackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </div>
  );
}
