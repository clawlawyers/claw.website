import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const UserPurchases = () => {
  const currentUser = useSelector((state) => state.auth.user);
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
      setFilteredTableData(data?.data?.history);
      setTableData(data?.data?.history);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to download invoice PDF
  const handleDownloadInvoice = async (planName, clientId) => {
    try {
      const response = await fetch(
        `${NODE_API_ENDPOINT}/gpt/generate-invoice`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client: { _id: clientId },
            planName: planName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
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
              }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Plan Name</TableCell>
                <TableCell sx={{ color: "white" }}>Start Date</TableCell>
                <TableCell sx={{ color: "white" }}>End Date</TableCell>
                <TableCell sx={{ color: "white" }}>Coupon</TableCell>
                <TableCell sx={{ color: "white" }}>Payment</TableCell>
                <TableCell sx={{ color: "white" }}>Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{ background: "linear-gradient(90deg,#BDFFE7,#62FFC5)" }}>
              {filteredTableData.length > 0 ? (
                filteredTableData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>{row.planName}</TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(row.expiresAt).toDateString()}
                    </TableCell>
                    <TableCell>
                      {row.referralCodeId || row.isCouponCode}
                    </TableCell>
                    <TableCell>{row.Paidprice}</TableCell>
                    <TableCell align="center">
                      <svg
                        className="cursor-pointer"
                        onClick={() =>
                          handleDownloadInvoice(row.planName, currentUser._id)
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24">
                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z" />
                      </svg>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      )}
    </div>
  );
};

export default UserPurchases;
