export const FLASK_API_ENDPOINT = process.env.NODE_ENV === "production" ? "https://gpt.clawlaw.in/api/v1" : "http://localhost:5000/api/v1";

export const NODE_API_ENDPOINT = process.env.NODE_ENV === "production" ? "http://localhost:8000/api/v1" : "http://localhost:8000/api/v1";

