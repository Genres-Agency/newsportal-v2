import { UserRole } from "@prisma/client";

type RouteAccess = {
  [key: string]: UserRole[];
};

export const routeRoleAccess: RouteAccess = {
  //   "/dashboard": [UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.JOURNALIST],
  "/dashboard/overview": [
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
    UserRole.JOURNALIST,
  ],
  "/dashboard/users": [UserRole.ADMIN, UserRole.SUPERADMIN],
  "/dashboard/users/add-user": [UserRole.ADMIN, UserRole.SUPERADMIN],
  "/dashboard/settings": [UserRole.SUPERADMIN],
  "/dashboard/news": [UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.JOURNALIST],
  "/dashboard/news/post-news": [
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
    UserRole.JOURNALIST,
  ],
  "/dashboard/categories": [
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
    UserRole.JOURNALIST,
  ],
  "/dashboard/categories/add-category": [
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
    UserRole.JOURNALIST,
  ],
  "/dashboard/media": [
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
    UserRole.JOURNALIST,
  ],
  "/dashboard/media/upload": [
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
    UserRole.JOURNALIST,
  ],
  "/dashboard/media/images": [
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
    UserRole.JOURNALIST,
  ],
  "/dashboard/media/videos": [
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
    UserRole.JOURNALIST,
  ],
  "/dashboard/ads": [UserRole.ADMIN, UserRole.SUPERADMIN],
  "/dashboard/ads/create": [UserRole.ADMIN, UserRole.SUPERADMIN],
  "/dashboard/ads/popup": [UserRole.ADMIN, UserRole.SUPERADMIN],
  "/dashboard/ads/horizontal": [UserRole.ADMIN, UserRole.SUPERADMIN],
  "/dashboard/ads/vertical": [UserRole.ADMIN, UserRole.SUPERADMIN],
  "/dashboard/ads/square": [UserRole.ADMIN, UserRole.SUPERADMIN],
  "/dashboard/ads/performance": [UserRole.ADMIN, UserRole.SUPERADMIN],
};

export const hasRouteAccess = (
  pathname: string,
  userRole?: UserRole
): boolean => {
  if (!userRole) return false;

  // Find the most specific matching route
  const matchingRoute = Object.keys(routeRoleAccess)
    .sort((a, b) => b.length - a.length) // Sort by length descending to match most specific route first
    .find((route) => pathname.startsWith(route));

  if (!matchingRoute) return true; // If no specific route found, allow access
  return routeRoleAccess[matchingRoute].includes(userRole);
};
