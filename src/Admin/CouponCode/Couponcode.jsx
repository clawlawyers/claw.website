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
  }, []);

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
    <>
      <h2 className="text-2xl font-bold mb-4">All Coupons</h2>
      <div className="container mx-auto p-4">
        <div
          style={{
            position: "sticky",
            width: "300px",
            marginLeft: "80px",
          }}
        >
          <h2>Create Coupon</h2>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Name"
          />
          <br />

          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="discount"
          />
          <br />
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
          <br />
          <button onClick={createCoupon} style={{ backgroundColor: "yellow" }}>
            Create
          </button>
          <br />
          <br />

          <h2>Deactivate Coupon</h2>
          <input
            type="text"
            value={deactivateCode}
            onChange={(e) => setDeactivateCode(e.target.value)}
          />
          <button
            onClick={deactivateCoupon}
            style={{ backgroundColor: "yellow" }}
          >
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
        </div>
        <table
          className="table-auto w-full mb-4"
          style={{
            overflow: "auto",
            color: "yellow",
            marginLeft: "100px",
            position: "sticky",
          }}
        >
          <thead>
            <tr>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Expiration Date</th>
              <th className="px-4 py-2">Active</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td className="border px-4 py-2">{coupon.code}</td>
                <td className="border px-4 py-2">{coupon.discount}%</td>
                <td className="border px-4 py-2">
                  {new Date(coupon.expirationDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {coupon.isActive ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Couponcode;
