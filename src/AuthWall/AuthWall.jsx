import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "../hooks/useAuthState";
import { useLocation, Outlet, useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Modal, Typography } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { close } from "../features/popup/popupSlice";

export default function AuthWall() {
  const currentUser = useSelector((state) => state.auth.user);
  const { isAuthLoading } = useAuthState();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  const handleLogin = () => {
    // Assuming you have a route set up for login
    const searchParams = new URLSearchParams({
      callbackUrl: pathname,
    }).toString();
    navigate(`/login?${searchParams}`);
    // navigate(`/login?callbackUrl=${pathname}`);
  };

  useEffect(() => {
    if (!isAuthLoading && !currentUser) {
      console.log("User is not logged in");
      setisOpen(true);
    }
  }, [isAuthLoading, currentUser]);

  const handleClose = () => {
    setisOpen(false);
  };

  if (isAuthLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <CircularProgress style={{ color: "white" }} />
        <div>Loading Auth...</div>
      </div>
    );
  } else if (!isAuthLoading && !currentUser) {
    return (
      <>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Login Required
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              style={{ color: "black" }}
            >
              You must be logged in to access this page.
            </Typography>
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              style={{
                border: "none",
                backgroundColor: "rgb(0, 128, 128)",
                borderRadius: 15,
                padding: 10,
              }}
            >
              Go to Login
            </Button>
          </Box>
        </Modal>
      </>
    );
  } else if (currentUser) {
    return <Outlet />;
  } else {
    return <div>Error</div>;
  }
}
