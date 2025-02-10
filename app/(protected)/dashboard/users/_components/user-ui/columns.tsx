"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../../../../_components/table/data-table-column-header";
import { format } from "date-fns";
import { UserItem } from "./data/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateUserRole, banUser } from "../../user-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { canChangeUserRole, getAvailableRoles } from "./utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

// Define a softer color palette
const colorPalette = [
  "rgba(255, 87, 51, 0.2)", // Soft Red
  "rgba(51, 255, 87, 0.2)", // Soft Green
  "rgba(51, 87, 255, 0.2)", // Soft Blue
  "rgba(241, 196, 15, 0.2)", // Soft Yellow
  "rgba(142, 68, 173, 0.2)", // Soft Purple
  "rgba(230, 126, 34, 0.2)", // Soft Orange
];

// Function to get a color based on the user's name
const getColorFromName = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length; // Use the first character of the name
  return colorPalette[index];
};

const RoleCell = ({ row }: { row: any }) => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const targetUserRole = row.getValue("role") as UserRole;
  const isBanned = targetUserRole === UserRole.BANNED;

  const canChange =
    currentUser && canChangeUserRole(currentUser.role, targetUserRole);
  const availableRoles = currentUser
    ? getAvailableRoles(currentUser.role, targetUserRole)
    : [];

  const handleRoleUpdate = async (newRole: string) => {
    try {
      await updateUserRole(row.original.id, newRole as UserRole);
      toast.success("User role updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const handleBanUser = async () => {
    try {
      await banUser(row.original.id);
      toast.success("User banned successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to ban user");
    }
  };

  if (!canChange) {
    return <div className="capitalize">{targetUserRole}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize">
          {targetUserRole}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Change Role</DropdownMenuLabel>
        {availableRoles.map((role) => (
          <DropdownMenuItem key={role} onClick={() => handleRoleUpdate(role)}>
            {role.toLowerCase()}
          </DropdownMenuItem>
        ))}
        {!isBanned && (
          <DropdownMenuItem
            onClick={handleBanUser}
            className="text-red-600 hover:text-red-700"
          >
            Ban User
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<UserItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Avatar",
    cell: ({ row }) => {
      const user = row.original;
      const backgroundColor = user.image
        ? "transparent"
        : getColorFromName(user.name || "U");

      return (
        <Avatar
          style={{
            backgroundColor,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user.image ? (
            <AvatarImage src={user.image} />
          ) : (
            <AvatarFallback style={{ color: "#333" }}>
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          )}
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      const isBanned = user.role === UserRole.BANNED;

      return (
        <div
          className={cn(
            "flex items-center",
            isBanned && "bg-red-50 rounded-md p-1"
          )}
        >
          <RoleCell row={row} />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt;
      if (!date) return null;
      return format(new Date(date), "PPpp");
    },
  },
];
