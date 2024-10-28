import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const UserPurchases = () => {
  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser);
  const [loading, setLoading] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);
  const [filteredTableData, setFilteredTableData] = React.useState([]);
  const [searchPlan, setSearchPlan] = React.useState("");

  React.useEffect(() => {
    getPurchases();
  }, [currentUser]);

  const getPurchases = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/getPurchaseHistory`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch purchases");
      }

      const data = await res.json();
      console.log(data);
      setFilteredTableData(data?.data?.history);
      setTableData(data?.data?.history);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (searchPlan === "") {
      setFilteredTableData(tableData);
    } else {
      const filterPlan = tableData.filter((x) =>
        x.planName.toLowerCase().includes(searchPlan.toLowerCase())
      );
      setFilteredTableData(filterPlan);
    }
  }, [searchPlan]);

  return (
    <div className="m-auto w-[80%]">
      <div className="pb-10 flex justify-between">
        <h2 className="font-bold text-[#00DDE5]">All Purchases</h2>
        <input
          placeholder="Search your purchase"
          className="rounded-full w-2/6 px-3 text-sm text-black"
          value={searchPlan}
          onChange={(e) => setSearchPlan(e.target.value)}
        />
      </div>
      {loading ? (
        <>
          <div className="w-full h-16 animate-pulse bg-slate-800"></div>
          <br />
          <div className="w-full h-16 animate-pulse bg-slate-800"></div>
        </>
      ) : (
        <Box sx={{ borderRadius: "8px", overflow: "hidden", boxShadow: 1 }}>
          <Table aria-label="simple table">
            <TableHead
              sx={{
                background: "#afafaf",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <TableRow sx={{}}>
                <TableCell sx={{ color: "white" }}>Plan Name</TableCell>
                <TableCell sx={{ color: "white" }} align="">
                  Start Date
                </TableCell>
                <TableCell sx={{ color: "white" }} align="">
                  End Date
                </TableCell>
                <TableCell sx={{ color: "white" }} align="">
                  Coupon
                </TableCell>
                <TableCell sx={{ color: "white" }} align="">
                  Payment
                </TableCell>
                <TableCell sx={{ color: "white" }} align="">
                  Receipt
                </TableCell>
              </TableRow>
            </TableHead>
            <br />
            {filteredTableData.length > 0 ? (
              <TableBody
                sx={{ background: "linear-gradient(90deg,#BDFFE7,#62FFC5)" }}
              >
                {filteredTableData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.planName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(row.createdAt).toDateString()}
                    </TableCell>
                    <TableCell align="">
                      {new Date(row.expiresAt).toDateString()}
                    </TableCell>
                    <TableCell align="">
                      {row.referralCodeId
                        ? row.referralCodeId
                        : row.isCouponCode}
                    </TableCell>
                    <TableCell align="">{row.Paidprice}</TableCell>
                    <TableCell align="center">
                      <svg
                        className="cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z" />
                      </svg>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              "No Data Found"
            )}
          </Table>
        </Box>
      )}
    </div>
  );
};

export default UserPurchases;
