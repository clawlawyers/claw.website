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
              <td style={{ color: "#008080", textAlign: "right" }}>₹2500/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(1000, 1, 2500, "Yearly")}
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
              <td style={{ color: "#008080", textAlign: "right" }}>₹5000/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(5000, 1, 5000, "Yearly")}
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
              <td style={{ color: "#008080", textAlign: "right" }}>₹6500/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(5000, 2, 6500, "Yearly")}
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
              <td style={{ color: "#008080", textAlign: "right" }}>₹8500/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(5000, 4, 6500, "Yearly")}
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
              <td style={{ color: "#008080", textAlign: "right" }}>₹15000/-</td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() => handleCartAddition(10000, 4, 15000, "Yearly")}
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
              <td style={{ color: "#008080", textAlign: "right" }}>
                ₹100000/-
              </td>
              <td style={{ textAlign: "left" }}>
                <button
                  onClick={() =>
                    handleCartAddition(1000000000, 4, 100000, "Yearly")
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

export default Yearly;
