// client/src/pages/SalesmanList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../../utils/utils";

const SalesmanList = () => {
  const [salesmen, setSalesmen] = useState([]);

  useEffect(() => {
    axios
      .get(`${NODE_API_ENDPOINT}/salesman`)
      .then((response) => setSalesmen(response.data))
      .catch((error) => console.error("Error fetching salesmen:", error));
  }, []);

  return (
    <div>
      <h1>Salesman List</h1>
      <ul>
        {salesmen.map((salesman) => (
          <li key={salesman._id}>
            <Link to={`${salesman._id}`}>{salesman.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesmanList;
