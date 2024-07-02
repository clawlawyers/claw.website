import Styles from "../Pricing.module.css";

const Monthly = ({ handleCartAddition }) => {
  return (
    <div
      className={Styles.pricingContainer}
      style={{ transition: "opacity 0.5s ease, visibility 0.5s ease" }}
    >
      <div className={Styles.pricingSection}>
        <table className={Styles.pricingTable}>
          <thead>
            <tr style={{ fontWeight: "800" }}>
              <th style={{ textAlign: "left" }}>Items</th>
              <th>Token Count</th>
              <th>Users/Sessions</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ color: "black" }}>
            <tr>
              <td style={{ textAlign: "left" }}>Tokens</td>
              <td>100</td>
              <td>1</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹250/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(100, 1, 250, "Monthly")}
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>Tokens</td>
              <td>500</td>
              <td>1</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹500/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(500, 1, 500, "Monthly")}
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>Tokens</td>
              <td>500</td>
              <td>2</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹650/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(500, 2, 650, "Monthly")}
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>Tokens</td>
              <td>500</td>
              <td>4</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹850/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(500, 4, 850, "Monthly")}
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={Styles.pricingSection}>
        <div
          style={{
            display: "flex",
            gap: "50%",
            width: "100%",
          }}
        >
          <h1 style={{ fontWeight: "800" }}>Monthly Add On</h1>{" "}
          <p className={Styles.pricingNote}>
            *Min Purchase Required of
            <span style={{ color: "#008080" }}> Rs500</span>
          </p>
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
              <td>Minimum tokens - 100</td>
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

export default Monthly;
