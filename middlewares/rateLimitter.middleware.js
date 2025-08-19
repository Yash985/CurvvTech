import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests, please try again after 1 min.",
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
