import { NavItem } from "@/types";
import { UserRole } from "@prisma/client";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    shortcut: ["g", "d"],
  },
  {
    title: "News Management",
    icon: "news",
    shortcut: ["g", "n"],
    allowedRoles: [UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.JOURNALIST],
    items: [
      { title: "Post News", url: "/dashboard/news/post-news" },
      { title: "All News List", url: "/dashboard/news" },
      {
        title: "Scheduled News",
        url: "/dashboard/news/scheduled",
        disabled: true,
      },
    ],
  },
  {
    title: "Categories",
    icon: "category",
    shortcut: ["g", "c"],
    allowedRoles: [UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.JOURNALIST],
    items: [
      { title: "Add Category", url: "/dashboard/categories/add-category" },
      { title: "All Categories", url: "/dashboard/categories" },
      // { title: "Disabled Category", url: "/dashboard/categories/disabled" },
    ],
  },
  {
    title: "User Management",
    url: "/dashboard/users",
    icon: "users",
    allowedRoles: [UserRole.ADMIN, UserRole.SUPERADMIN],
    items: [
      {
        title: "All Users",
        url: "/dashboard/users",
      },
      {
        title: "Add User",
        url: "/dashboard/users/add-user",
      },
    ],
  },
  {
    title: "Media Library",
    icon: "media",
    shortcut: ["g", "m"],
    allowedRoles: [UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.JOURNALIST],
    items: [
      { title: "Upload Media", url: "/dashboard/media/upload" },
      { title: "Image Gallery", url: "/dashboard/media/images" },
      { title: "Video Gallery", url: "/dashboard/media/videos" },
    ],
  },
  {
    title: "Comments & Feedback",
    icon: "comments",
    shortcut: ["g", "f"],
    allowedRoles: [UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.JOURNALIST],

    items: [
      {
        title: "Approved Comments",
        url: "/dashboard/comments/approved",
        disabled: true,
      },
      {
        title: "Pending Comments",
        url: "/dashboard/comments/pending",
        disabled: true,
      },
      {
        title: "Spam & Reported",
        url: "/dashboard/comments/spam",
        disabled: true,
      },
    ],
  },
  {
    title: "Settings",
    icon: "settings",
    shortcut: ["g", "s"],
    // disabled: true,
    items: [
      { title: "Website Settings", url: "/dashboard/settings" },
      {
        title: "Email & Notifications",
        url: "/dashboard/settings/email",
        disabled: true,
      },
      {
        title: "Security & Permissions",
        url: "/dashboard/settings/security",
        disabled: true,
      },
    ],
  },
  {
    title: "Analytics & Reports",
    icon: "analytics",
    shortcut: ["g", "a"],
    allowedRoles: [UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.JOURNALIST],
    items: [
      {
        title: "Traffic Report",
        url: "/dashboard/analytics/traffic",
        disabled: true,
      },
      {
        title: "Popular News",
        url: "/dashboard/analytics/popular",
        disabled: true,
      },
      {
        title: "User Engagement",
        url: "/dashboard/analytics/engagement",
        disabled: true,
      },
      {
        title: "SEO Performance",
        url: "/dashboard/analytics/seo",
        disabled: true,
      },
    ],
  },
  {
    title: "Advertisement",
    icon: "ads",
    shortcut: ["g", "v"],
    allowedRoles: [UserRole.ADMIN, UserRole.SUPERADMIN],
    items: [
      { title: "Advertisement Overview", url: "/dashboard/ads" },
      { title: "Create New Ad", url: "/dashboard/ads/create" },
      {
        title: "Horizontal Ads",
        url: "/dashboard/ads/horizontal",
      },
      {
        title: "Vertical Ads",
        url: "/dashboard/ads/vertical",
      },
      {
        title: "Square Ads",
        url: "/dashboard/ads/square",
      },
      {
        title: "Ad Performance",
        url: "/dashboard/ads/performance",
      },
    ],
  },
  {
    title: "Notifications",
    icon: "bell",
    shortcut: ["g", "n"],
    allowedRoles: [UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.JOURNALIST],
    items: [
      {
        title: "New Comments",
        url: "/dashboard/notifications/comments",
        disabled: true,
      },
      {
        title: "Breaking News Alerts",
        url: "/dashboard/notifications/alerts",
        disabled: true,
      },
      {
        title: "Article Approval",
        url: "/dashboard/notifications/approvals",
        disabled: true,
      },
    ],
  },
];
