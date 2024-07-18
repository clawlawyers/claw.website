import React from "react";
import Drive from "../../assets/icons/drive.svg";
import DropBox from "../../assets/icons/dropbox.svg";
import pc from "../../assets/icons/local.svg";
import styles from "../../CourtRoom/CourtroomAi/UploadDoc.module.css";
const Devices = () => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        backgroundColor: " rgba(0, 0, 0, 0.555)",
        height: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className={styles.images}>
        <img src={Drive} alt="" />
        <p>Upload from Drive</p>
      </div>
      <div className={styles.verticalLine}></div>{" "}
      {/* Add a vertical line here */}
      <div className={styles.images}>
        <img src={DropBox} alt="" />
        <p>Upload from Drive</p>
      </div>
      <div className={styles.verticalLine}></div>{" "}
      {/* Add a vertical line here */}
      <div className={styles.images}>
        <img src={pc} alt="" />
        <p>Upload from Drive</p>
      </div>
    </section>
  );
};

export default Devices;
