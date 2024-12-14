export const FLASK_API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://gpt.clawlaw.in/api/v1"
    : "http://20.193.128.165:80/api/v1";

export const NODE_API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://claw-backend.onrender.com/api/v1"
    : "http://localhost:8000/api/v1";

export const ADIRA_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? // ? "https://claw-app-dev.onrender.com/api/v1"
      "https://adira.clawlaw.in"
    : "https://adira.clawlaw.in";

export const OTP_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://claw-app.onrender.com"
    : "https://claw-app.onrender.com";
// : "http://localhost:7000";

export const WARROOM_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? // ? "https://claw-app-dev.onrender.com/api/v1"
      "https://warroom.clawlaw.in/"
    : "https://warroom.clawlaw.in/";

// export const OTP_ENDPOINT = "https://claw-app.onrender.com"
