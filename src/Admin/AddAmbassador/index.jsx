import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import toast from "react-hot-toast";

const AddAmbassadorForm = () => {
  const [client, setClient] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    collegeName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`${NODE_API_ENDPOINT}/admin/generateReferralCode`, { client })
      .then((response) => {
        console.log(response.data);
        toast.success(`Ambassador added and code is`);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to add ambassador" + err.message);
      });
  };

  return (
    <Container
      maxWidth="sm"
      style={{ backgroundColor: "white", height: "90%", borderRadius: "5px" }}
    >
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Client Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="ID"
            name="_id"
            value={client._id}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="First Name"
            name="firstName"
            value={client.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={client.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="College Name"
            name="collegeName"
            value={client.collegeName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddAmbassadorForm;
