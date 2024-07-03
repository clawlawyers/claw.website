import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTheme, useMediaQuery } from "@mui/material";
import { NODE_API_ENDPOINT } from "../../utils/utils";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell style={{ width: "5%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ width: "15%" }} component="th" scope="row">
          {row.referralCode}
        </TableCell>
        <TableCell align="right" style={{ width: "15%" }}>
          {row.generatedBy.phoneNumber}
        </TableCell>
        <TableCell align="right" style={{ width: "15%" }}>
          {row.generatedBy.firstName}
        </TableCell>
        <TableCell align="right" style={{ width: "15%" }}>
          {row.generatedBy.lastName}
        </TableCell>
        <TableCell align="right" style={{ width: "10%" }}>
          {row.redeemed ? "Yes" : "No"}
        </TableCell>
        <TableCell align="right" style={{ width: "10%" }}>
          {row.redeemedBy.length}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, overflowX: "auto" }}>
              <Typography variant="h6" gutterBottom component="div">
                Redeemed By
              </Typography>
              <Table size="small" aria-label="redeemed by users">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "12%", whiteSpace: "nowrap" }}>
                      Phone Number
                    </TableCell>
                    <TableCell style={{ width: "12%", whiteSpace: "nowrap" }}>
                      First Name
                    </TableCell>
                    <TableCell style={{ width: "12%", whiteSpace: "nowrap" }}>
                      Last Name
                    </TableCell>
                    <TableCell style={{ width: "12%", whiteSpace: "nowrap" }}>
                      Plan Name
                    </TableCell>
                    <TableCell style={{ width: "12%", whiteSpace: "nowrap" }}>
                      Total Tokens Used
                    </TableCell>
                    <TableCell style={{ width: "12%", whiteSpace: "nowrap" }}>
                      Total Tokens Available
                    </TableCell>
                    <TableCell style={{ width: "12%", whiteSpace: "nowrap" }}>
                      Daily Engagement Time (mins)
                    </TableCell>
                    <TableCell style={{ width: "12%", whiteSpace: "nowrap" }}>
                      Monthly Engagement Time (hours)
                    </TableCell>
                    <TableCell style={{ width: "12%", whiteSpace: "nowrap" }}>
                      Total Engagement Time (hours)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.redeemedBy.map((user) => (
                    <TableRow key={user.phoneNumber}>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.plan?.planName || "-"}</TableCell>
                      <TableCell>{user.plan?.token?.used || 0}</TableCell>
                      <TableCell>{user.plan?.token?.total || 0}</TableCell>
                      <TableCell>{user.engagedTime?.daily || 0}</TableCell>
                      <TableCell>{user.engagedTime?.monthly || 0}</TableCell>
                      <TableCell>{user.engagedTime?.total || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    referralCode: PropTypes.string.isRequired,
    redeemed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    generatedBy: PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    redeemedBy: PropTypes.arrayOf(
      PropTypes.shape({
        phoneNumber: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        plan: PropTypes.shape({
          planName: PropTypes.string.isRequired,
          token: PropTypes.shape({
            used: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
          }).isRequired,
        }),
        engagedTime: PropTypes.shape({
          days: PropTypes.string.isRequired,
          hours: PropTypes.string.isRequired,
          months: PropTypes.string.isRequired,
          totalSeconds: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const [referralCodes, setReferralCodes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchReferralCodes = async () => {
    try {
      const response = await fetch(`${NODE_API_ENDPOINT}/admin/referralcode`);
      if (!response.ok) {
        throw new Error("Failed to fetch referral codes");
      }
      const dataObject = await response.json();
      const dataArray = Object.values(dataObject);
      setReferralCodes(dataArray);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchReferralCodes();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "80vh",
        width: isMobile ? "100%" : "80%",
        margin: "0 auto",
        overflow: "auto",
      }}
    >
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "5%" }} />
            <TableCell style={{ width: "15%", whiteSpace: "nowrap" }}>
              Referral Code
            </TableCell>
            <TableCell
              align="right"
              style={{ width: "15%", whiteSpace: "nowrap" }}
            >
              Generated By Phone
            </TableCell>
            <TableCell
              align="right"
              style={{ width: "15%", whiteSpace: "nowrap" }}
            >
              Generated By First Name
            </TableCell>
            <TableCell
              align="right"
              style={{ width: "15%", whiteSpace: "nowrap" }}
            >
              Generated By Last Name
            </TableCell>
            <TableCell
              align="right"
              style={{ width: "10%", whiteSpace: "nowrap" }}
            >
              Redeemed
            </TableCell>
            <TableCell
              align="right"
              style={{ width: "10%", whiteSpace: "nowrap" }}
            >
              Total Redeemed By
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referralCodes.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
