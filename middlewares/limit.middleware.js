import rateLimit from "express-rate-limit";

// Define the rate limit rule
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 1 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});

export default apiLimiter;