import React, { useEffect, useState } from "react";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";

const Couponcode = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [deactivateCode, setDeactivateCode] = useState("");
  const [deleteCode, setDeleteCode] = useState("");
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, [coupons]);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${NODE_API_ENDPOINT}/admin/allcoupons`);
      setCoupons(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createCoupon = async () => {
    try {
      const response = await axios.post(`${NODE_API_ENDPOINT}/admin/create`, {
        code,
        discount,
        expirationDate,
      });
      alert("Coupon created: " + response.data.code);
    } catch (error) {
      console.error(error);
    }
  };

  const deactivateCoupon = async () => {
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/admin/deactivate`,
        {
          code: deactivateCode,
        }
      );
      alert("Coupon deactivated: " + response.data.code);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCoupon = async () => {
    try {
      const response = await axios.delete(`${NODE_API_ENDPOINT}/admin/delete`, {
        data: { code: deleteCode },
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={{ position: "absolute" }}>
      <h2>Create Coupon</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        type="number"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />
      <input
        type="date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <button onClick={createCoupon} style={{ backgroundColor: "yellow" }}>
        Create
      </button>

      <h2>Deactivate Coupon</h2>
      <input
        type="text"
        value={deactivateCode}
        onChange={(e) => setDeactivateCode(e.target.value)}
      />
      <button onClick={deactivateCoupon} style={{ backgroundColor: "yellow" }}>
        Deactivate
      </button>
      <br />

      <h2>Delete Coupon</h2>
      <input
        type="text"
        value={deleteCode}
        onChange={(e) => setDeleteCode(e.target.value)}
      />
      <button onClick={deleteCoupon} style={{ backgroundColor: "red" }}>
        Delete
      </button>
      <h2>All Coupons</h2>
      <ul>
        {coupons.map((coupon) => (
          <li key={coupon._id}>
            Code: {coupon.code}, Discount: {coupon.discount}%, Expiration Date:{" "}
            {new Date(coupon.expirationDate).toLocaleDateString()}, Active:{" "}
            {coupon.isActive ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Couponcode;
