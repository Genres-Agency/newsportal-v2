/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/verify",
  "/api/news",
  "/api/news/latest",
  "/api/news/political",
  "/api/news/category",
  "/api/news/category/latest",
  "/api/news/category/[slug]",
  "/api/news/category/sec-news/[slug]",
  "/news",
  "/news/[slug]",
  "/news/category",
  "/news/category/[slug]",
  "/news/search",
  "/latest",
  "/bangladesh",
  "/international",
  "/politics",
  "/sports",
  "/technology",
  "/entertainment",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const BANNED_REDIRECT = "/banned";
