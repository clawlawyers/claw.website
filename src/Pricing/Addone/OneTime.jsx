import Styles from "../Pricing.module.css";

const OneTime = ({ handleCartAddition }) => {
  return (
    <div
      className={Styles.pricingContainer}
      style={{ transition: "opacity 0.5s ease, visibility 0.5s ease" }}
    >
      <div className={Styles.pricingSection}>
        <div
          style={{
            display: "flex",
            gap: "50%",
            width: "100%",
          }}
        >
          <h1 style={{ fontWeight: "800" }}>Monthly Add On</h1>
        </div>
        <table className={Styles.pricingTable}>
          <thead>
            <tr style={{ fontWeight: "800" }}>
              <th style={{ textAlign: "left" }}>Items</th>
              <th>Token Count</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ color: "black" }}>
            <tr>
              <td style={{ textAlign: "left" }}>Case Search</td>
              <td>10</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹100/-</td>
              <td style={{ textAlign: "left" }}>
                <button className={Styles.pricingButton}>Get it Now</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OneTime;
