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
import { userRoles } from "./data/data";
import { updateUserRole } from "../../user-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { canChangeUserRole, getAvailableRoles } from "./utils";
import { useCurrentUser } from "@/hooks/use-current-user";

const RoleCell = ({ row }: { row: any }) => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const targetUserRole = row.getValue("role") as UserRole;

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
      return (
        <Avatar>
          <AvatarImage src={user.image || undefined} />
          <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
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
    cell: ({ row }) => <RoleCell row={row} />,
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
