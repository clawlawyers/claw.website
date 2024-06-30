import React from "react";
import { Card, CardContent, Button, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const ShakeCard = styled(Card)(({ theme }) => ({
  "&:hover": {
    animation: "shake 0.5s",
  },
  "@keyframes shake": {
    "0%": { transform: "translateX(0)" },
    "10%": { transform: "translateX(-10px)" },
    "20%": { transform: "translateX(10px)" },
    "30%": { transform: "translateX(-10px)" },
    "40%": { transform: "translateX(10px)" },
    "50%": { transform: "translateX(-10px)" },
    "60%": { transform: "translateX(10px)" },
    "70%": { transform: "translateX(-10px)" },
    "80%": { transform: "translateX(10px)" },
    "90%": { transform: "translateX(-10px)" },
    "100%": { transform: "translateX(0)" },
  },
}));

const PricingTable = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3} justifyContent="center">
        {/* One Time Card */}
        <Grid item>
          <ShakeCard>
            <CardContent>
              <Typography variant="h5">One Time</Typography>
              <Typography variant="h6">₹25/-</Typography>
              <Typography>Items: Tokens</Typography>
              <Typography>Token Count: 5</Typography>
              <Typography>Users/Sessions: 1</Typography>
              <Button variant="contained" color="primary">
                Get it now
              </Button>
            </CardContent>
          </ShakeCard>
        </Grid>

        {/* Monthly Card */}
        <Grid item>
          <ShakeCard style={{ backgroundColor: "#c0ffb3" }}>
            <CardContent>
              <Typography variant="h5">Monthly</Typography>
              <Typography variant="h6">₹250/-</Typography>
              <Typography>Items: Tokens</Typography>
              <Typography>Token Count: 100</Typography>
              <Typography>Users/Sessions: 1</Typography>
              <Button variant="contained" color="primary">
                Get it now
              </Button>
            </CardContent>
          </ShakeCard>
        </Grid>

        {/* Yearly Card */}
        <Grid item>
          <ShakeCard>
            <CardContent>
              <Typography variant="h5">Yearly</Typography>
              <Typography variant="h6">₹100000/-</Typography>
              <Typography>Items: Tokens</Typography>
              <Typography>Token Count: Unlimited</Typography>
              <Typography>Users/Sessions: 4</Typography>
              <Button variant="contained" color="primary">
                Get it now
              </Button>
            </CardContent>
          </ShakeCard>
        </Grid>
      </Grid>

      {/* Additional Token Options */}
      <div style={{ marginTop: "20px" }}>
        <Grid container spacing={3} justifyContent="center">
          {/* Tokens 100 */}
          <Grid item>
            <ShakeCard>
              <CardContent>
                <Typography>Tokens</Typography>
                <Typography>Token Count: 100</Typography>
                <Typography>Users/Sessions: 1</Typography>
                <Typography>₹250/-</Typography>
                <Button variant="contained" color="primary">
                  Get it Now
                </Button>
              </CardContent>
            </ShakeCard>
          </Grid>

          {/* Tokens 500 (2 sessions) */}
          <Grid item>
            <ShakeCard>
              <CardContent>
                <Typography>Tokens</Typography>
                <Typography>Token Count: 500</Typography>
                <Typography>Users/Sessions: 2</Typography>
                <Typography>₹450/-</Typography>
                <Button variant="contained" color="primary">
                  Get it Now
                </Button>
              </CardContent>
            </ShakeCard>
          </Grid>

          {/* Tokens 500 (4 sessions) */}
          <Grid item>
            <ShakeCard>
              <CardContent>
                <Typography>Tokens</Typography>
                <Typography>Token Count: 500</Typography>
                <Typography>Users/Sessions: 4</Typography>
                <Typography>₹850/-</Typography>
                <Button variant="contained" color="primary">
                  Get it Now
                </Button>
              </CardContent>
            </ShakeCard>
          </Grid>
        </Grid>

        {/* Monthly Add On */}
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Monthly Add On</Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <ShakeCard>
                <CardContent>
                  <Typography>Case Search</Typography>
                  <Typography>Minimum tokens: 100</Typography>
                  <Typography>₹100/-</Typography>
                  <Typography>*Min Purchase Required of ₹500</Typography>
                  <Button variant="contained" color="primary">
                    Get it Now
                  </Button>
                </CardContent>
              </ShakeCard>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
