/**
 * Routes that accessible by guest users (no authentication needed)
 */
export const publicRoutes = [
    "/",

];
/**
 * Routes that are used for authentication process
 * These routes will re-direct the logged-in users to /settings
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
]

/**
 * this will never be blocked to any type of user
 * */ 
export const apiAuthPrefix = "api/auth/";

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";