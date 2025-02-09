import { EyeOff, Eye } from "lucide-react";
import { UserRole } from "@prisma/client";

export const statuses = [
  {
    value: "PRIVATE",
    label: "Private",
    iconName: "eyeOff",
  },
  {
    value: "PUBLISHED",
    label: "Published",
    iconName: "eye",
  },
];

export const getCategoryOptions = (categories: any[]) => {
  return categories
    .filter((category) => category.status === "PUBLISHED")
    .map((category) => ({
      label: category.name,
      value: category.name,
    }));
};

export const userRoles = [
  {
    value: UserRole.USER,
    label: "User",
    iconName: "user",
  },
  {
    value: UserRole.ADMIN,
    label: "Admin",
    iconName: "shield",
  },
  {
    value: UserRole.JOURNALIST,
    label: "Journalist",
    iconName: "pen",
  },
  {
    value: UserRole.SUPERADMIN,
    label: "Super Admin",
    iconName: "star",
  },
];
