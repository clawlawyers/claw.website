import Styles from "../Pricing.module.css";

const Yearly = ({ handleCartAddition }) => {
  return (
    <div
      className={Styles.pricingContainer}
      style={{ transition: "opacity 1s ease, visibility 1s ease" }}
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
              <td>1000</td>
              <td>1</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹2499/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(1000, 1, 2499, "Yearly")}
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>Tokens</td>
              <td>5000</td>
              <td>1</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹4999/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(5000, 1, 4999, "Yearly")}
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>Tokens</td>
              <td>5000</td>
              <td>2</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹6499/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(5000, 2, 6499, "Yearly")}
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>Tokens</td>
              <td>5000</td>
              <td>4</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹8499/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(5000, 4, 8499, "Yearly")}
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>Tokens</td>
              <td>10000</td>
              <td>4</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹14999/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(10000, 4, 14999, "Yearly")}
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "left" }}>Tokens</td>
              <td>Unlimited</td>
              <td>4</td>
              <td style={{ color: "#008080", textAlign: "right" }}>₹99999/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() =>
                    handleCartAddition(1000000000, 4, 99999, "Yearly")
                  }
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <div className={Styles.pricingSection}>
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
            <span style={{ color: "#008080" }}> Rs499</span>
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
              <td style={{ color: "#008080", textAlign: "right" }}>₹499/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(100, 1, 499, "AddOn")}
                  className={Styles.pricingButton}
                >
                  Get it Now
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Yearly;
