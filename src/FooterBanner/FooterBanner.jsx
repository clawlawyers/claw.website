import React, { useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import YouTubeIcon from "@mui/icons-material/YouTube";

import Styles from "./FooterBanner.module.css";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { Link } from "react-router-dom";

function FooterBanner() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubscribe(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${NODE_API_ENDPOINT}/mailinglist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Api Error");
      toast.success("Added to Mailing List");
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setEmail("");
      setIsLoading(false);
    }
  }
  return (
    <div className={Styles.footerContainer}>
      <div className={Styles.footerContent}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            flexWrap: "wrap",
          }}>
          <div>
            <h3>Claw</h3>
            <p className={Styles.muted}>
              We offer a comprehensive legal service tailored to your needs. Our
              platform combines advanced case search capabilities with the
              prowess of GPT-powered solutions, ensuring swift and accurate
              resolutions to your legal queries. From researching case law to
              drafting documents, we're your trusted ally in navigating the
              complexities of the legal landscape.
            </p>
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#008080",
                  borderRadius: 100,
                  border: "none",
                  color: "white",
                  padding: 10,
                }}>
                <PhoneInTalkIcon />
              </div>
              <div>
                <p className={Styles.muted} style={{ margin: 0 }}>
                  Have a question
                </p>
                <p style={{ margin: 0, color: "#008080", fontWeight: 600 }}>
                  +91 9316164924
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#008080",
                  borderRadius: 100,
                  border: "none",
                  color: "white",
                  padding: 10,
                }}>
                <MailOutlineIcon />
              </div>
              <div>
                <p className={Styles.muted} style={{ margin: 0 }}>
                  Contact us
                </p>
                <p style={{ margin: 0, color: "#008080", fontWeight: 600 }}>
                  claw.lawyers@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <h3>News letter</h3>
            <p className={Styles.muted}>
              Be the first one to know about discounts, offers and events.
              Unsubscribe whenever you like.
            </p>
            <form
              onSubmit={handleSubscribe}
              style={{ display: "flex", gap: 5 }}>
              <div
                style={{
                  marginTop: "20px",
                  flex: 1,
                  display: "flex",
                  gap: 10,
                  backgroundColor: "#32404D",
                  padding: "12px 14px",
                }}>
                <MailOutlineIcon />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  disabled={isLoading}
                  placeholder="Email Address"
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "transparent",
                    fontSize: 16,
                    padding: 0,
                    border: "none",
                    outline: "none",
                    color: "white",
                  }}
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#008080",
                  border: "none",
                  color: "white",
                  borderRadius: 4,
                }}>
                <p className="hover:scale-105">
                  {" "}
                  {isLoading ? (
                    <CircularProgress style={{ padding: 10 }} />
                  ) : (
                    "Submit"
                  )}
                </p>
              </button>
            </form>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <div className={Styles.hover}>
              <a
                href="https://www.linkedin.com/company/claw-lawyers/"
                target="_blank"
                rel="noreferrer">
                <LinkedInIcon />
              </a>
            </div>
            <div className={Styles.hover}>
              <a
                href="https://www.instagram.com/claw__lawyers?igsh=a25qZzJkZW84anBt"
                target="_blank"
                rel="noreferrer">
                <InstagramIcon />
              </a>
            </div>
            <div className={Styles.hover}>
              <a
                href="https://youtube.com/@clawlegaltech?si=iehyWC9uSmzk657K"
                target="_blank"
                rel="noreferrer">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}>
        <div className={Styles.footerNav}>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `${Styles.muted} ${
                isActive ? Styles.active : ""
              } hover:text-md hover:scale-105 `
            }
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive
                ? "rgba(0, 129, 127, 1)"
                : "rgba(94, 110, 128, 1)",
              fontWeight: isActive ? "bold" : "normal",
            })}>
            About us
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${Styles.muted} ${
                isActive ? Styles.active : ""
              } hover:text-md hover:scale-105 `
            }
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive
                ? "rgba(0, 129, 127, 1)"
                : "rgba(94, 110, 128, 1)",
              fontWeight: isActive ? "bold" : "normal",
            })}>
            Contact
          </NavLink>

          <NavLink
            to="/privacyPolicy"
            className={({ isActive }) =>
              `${Styles.muted} ${
                isActive ? Styles.active : ""
              } hover:text-md hover:scale-105`
            }
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive
                ? "rgba(0, 129, 127, 1)"
                : "rgba(94, 110, 128, 1)",
              fontWeight: isActive ? "bold" : "normal",
            })}>
            Privacy Policy
          </NavLink>

          <NavLink
            to="/refund-and-cancellation-policy"
            className={({ isActive }) =>
              `${Styles.muted} ${
                isActive ? Styles.active : ""
              } hover:text-md hover:scale-105 `
            }
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive
                ? "rgba(0, 129, 127, 1)"
                : "rgba(94, 110, 128, 1)",
              fontWeight: isActive ? "bold" : "normal",
            })}>
            Refund & Cancellation Policy
          </NavLink>

          <NavLink
            to="/terms-and-conditions"
            className={({ isActive }) =>
              `${Styles.muted} ${
                isActive ? Styles.active : ""
              }  hover:text-md hover:scale-105 `
            }
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive
                ? "rgba(0, 129, 127, 1)"
                : "rgba(94, 110, 128, 1)",
              fontWeight: isActive ? "bold" : "normal",
            })}>
            Terms & Conditions
          </NavLink>
          <NavLink
            to="/shipping-and-delivery"
            className={({ isActive }) =>
              `${Styles.muted} ${
                isActive ? Styles.active : ""
              }  hover:text-md hover:scale-105`
            }
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive
                ? "rgba(0, 129, 127, 1)"
                : "rgba(94, 110, 128, 1)",
              fontWeight: isActive ? "bold" : "normal",
            })}>
            Shipping & Delivery
          </NavLink>
        </div>
        <div className={Styles.muted}>© 2000-2021, All Rights Reserved</div>
      </div>
    </div>
  );
}

export default FooterBanner;
