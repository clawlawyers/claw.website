import React from "react";
import courtroom from "../../assets/images/Courtroom.png";
import feature1 from "../../assets/images/image 2.png";
import feature2 from "../../assets/images/image 3.png";
import feature3 from "../../assets/images/image 4.png";
import laptop from "../../assets/images/image 1.png";
import plus from "../../assets/images/Group 53.png";
import Styles from "./CourtRoomHome.module.css";
import arrw from "../../assets/images/Vector 1.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className={Styles.topcontainer}>
        <div>
          <h1>What is Courtroom ?</h1>
          <br />
          <h3 style={{ fontSize: "25px", color: "#B7B2B2" }}>
            Explore our flexible pricing options designed to cater to a range of
            legal requirements. Select the plan that best fits your needs and
            budget.
          </h3>
          <br />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "25px",
            }}
          >
            <Link to="/court-room/book-now">
              <button className={Styles.CourtRoomBtn}>Book A Courtroom</button>
            </Link>
            <Link to="/court-room/login">
              <button className={Styles.CourtRoomBtn}>
                Enter Your Courtroom
              </button>
            </Link>
          </div>
        </div>
        <img
          alt="court-room"
          style={{
            backgroundColor: "transparent",
            height: "50%",
            width: "50%",
          }}
          src={courtroom}
        />
      </div>

      <div className={Styles.topcontainer}>
        <div className={Styles.courtRoomCard}>
          <br />
          <img
            alt="Feature Heading"
            src={feature1}
            style={{ height: 90, width: 90, borderRadius: 0 }}
          />
          <br />
          <h1 style={{ fontSize: "25px" }}>Feature Heading</h1>
          <br />
          <h3 style={{ fontSize: "22px", color: "#B7B2B2" }}>
            Explore our flexible pricing options designed to cater to a range of
            legal requirements.
          </h3>
        </div>

        <div className={Styles.courtRoomCard}>
          <br />
          <img
            alt="Feature Heading"
            src={feature2}
            style={{ height: 90, width: 90, borderRadius: 0 }}
          />
          <br />
          <h1 style={{ fontSize: "25px" }}>Feature Heading</h1>
          <br />
          <h3 style={{ fontSize: "22px", color: "#B7B2B2" }}>
            Explore our flexible pricing options designed to cater to a range of
            legal requirements.
          </h3>
        </div>

        <div className={Styles.courtRoomCard}>
          <br />
          <img
            alt="Feature Heading"
            src={feature3}
            style={{ height: 90, width: 90, borderRadius: 0 }}
          />
          <br />
          <h1 style={{ fontSize: "25px" }}>Feature Heading</h1>
          <br />
          <h3 style={{ fontSize: "22px", color: "#B7B2B2" }}>
            Explore our flexible pricing options designed to cater to a range of
            legal requirements.
          </h3>
        </div>
      </div>

      <div
        style={{
          marginTop: "200px",
          margin: "5px 150px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "700px",
          }}
        >
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
        </div>
        <div style={{ display: "grid", placeItems: "center" }}>
          <div style={{ height: "400px" }}>
            <img
              alt="courtRoom Preiview"
              src={laptop}
              style={{ borderRadius: 0, width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "700px",
          }}
        >
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
          <img alt="plus" src={plus} style={{ width: 20, height: 20 }} />
        </div>
      </div>

      <div style={{ width: "40%", marginLeft: "600px" }}>
        <img
          alt="arrow"
          src={arrw}
          style={{ borderRadius: 0, width: "100%", height: "100%" }}
        />
      </div>

      <div style={{ display: "flex", marginTop: "150px" }}>
        <div style={{ marginLeft: "200px", width: "700px" }}>
          <h1>PHASE1/STEP1</h1>
          <h3 style={{ fontSize: "22px", color: "#B7B2B2" }}>
            Explore our flexible pricing options designed to cater to a range of
            legal requirements. Select the plan that best fits your needs and
            budget.
          </h3>
        </div>
        <div>
          <div style={{ display: "grid", placeItems: "center" }}>
            <div style={{ height: "400px", width: "max-content" }}>
              <img
                alt="courtRoom Preiview"
                src={laptop}
                style={{ borderRadius: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "150px" }}>
        <div>
          <div style={{ display: "grid", placeItems: "center" }}>
            <div style={{ height: "400px", width: "max-content" }}>
              <img
                alt="courtRoom Preiview"
                src={laptop}
                style={{ borderRadius: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginRight: "100px", width: "700px" }}>
          <h1>PHASE1/STEP1</h1>
          <h3 style={{ fontSize: "22px", color: "#B7B2B2" }}>
            Explore our flexible pricing options designed to cater to a range of
            legal requirements. Select the plan that best fits your needs and
            budget.
          </h3>
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "150px" }}>
        <div style={{ marginLeft: "200px", width: "700px" }}>
          <h1>PHASE1/STEP1</h1>
          <h3 style={{ fontSize: "22px", color: "#B7B2B2" }}>
            Explore our flexible pricing options designed to cater to a range of
            legal requirements. Select the plan that best fits your needs and
            budget.
          </h3>
        </div>
        <div>
          <div style={{ display: "grid", placeItems: "center" }}>
            <div style={{ height: "400px", width: "max-content" }}>
              <img
                alt="courtRoom Preiview"
                src={laptop}
                style={{ borderRadius: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.whyCourtRoom}>
        <div>
          <h1 style={{ fontWeight: "700" }}>Why Claw Courtroom ?</h1>
        </div>
        <div style={{ display: "flex", gap: "100px" }}>
          <div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
              }}
            >
              24+
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Language Support
            </h3>
          </div>
          <div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
              }}
            >
              100%
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              factual Clauses
            </h3>
          </div>
          <div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "5rem",
                letterSpacing: "0.016rem",
              }}
            >
              1,000 +
            </h1>
            <h3
              style={{
                color: "#B7B2B2",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Cases Solved
            </h3>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", placeItems: "center", marginTop: "80px" }}>
        <div className={Styles.third} style={{ width: "75%" }}>
          <div style={{ width: "50%" }}>
            <h1 style={{ color: "#008080", fontWeight: 800, textWrap: "wrap" }}>
              Want To take a Courtroom for yourself ?
            </h1>
          </div>

          <button
            style={{
              backgroundColor: "#008080",
              color: "white",
              padding: "12px 40px",
              borderRadius: 10,
              border: "none",
              fontSize: 27,
            }}
          >
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
