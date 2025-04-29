"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../../../../_components/table/data-table-column-header";
import { format } from "date-fns";
import Image from "next/image";
import { NewsItem } from "./data/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { EditNewsDialog } from "./edit-news-dialog";
import { deleteNews } from "../../news-action";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, X, FileVideo, FileX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateNews } from "../../news-action";
import { toast } from "sonner";

// Define the type for your news data

function StatusCell({ row }: { row: Row<NewsItem> }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(
    row.getValue("status") as string
  );
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    const originalStatus = row.getValue("status") as string;
    try {
      setCurrentStatus(newStatus);
      setIsEditing(false);

      await updateNews({
        id: row.original.id,
        title: row.original.title,
        content: row.original.content,
        categories: row.original.categories.map(
          (cat: any) => cat.category.name
        ),
        mediaId: row.original.mediaId,
        status: newStatus as "PUBLISHED" | "PRIVATE" | "SCHEDULED",
        scheduledAt: null,
      });

      toast.success("Status updated");
      router.refresh();
    } catch (error) {
      setCurrentStatus(originalStatus);
      toast.error("Failed to update status");
    }
  };

  return (
    <div
      onDoubleClick={(e) => {
        e.preventDefault();
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <Select
          value={currentStatus}
          onValueChange={handleStatusChange}
          open={true}
          onOpenChange={(open) => {
            if (!open) setIsEditing(false);
          }}
        >
          <SelectTrigger className="h-8 w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="PRIVATE">Private</SelectItem>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <div
          className={`text-center select-none font-medium rounded-full px-2.5 py-1 text-xs cursor-pointer ${
            currentStatus === "PRIVATE"
              ? "bg-yellow-100 text-yellow-800"
              : currentStatus === "SCHEDULED"
              ? "bg-purple-100 text-purple-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {currentStatus}
        </div>
      )}
    </div>
  );
}

export const columns = (categories: any[]): ColumnDef<NewsItem>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "media",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Media" />
    ),
    cell: ({ row }) => {
      const media = row.original.media;
      return (
        <div className="relative h-20 w-28 overflow-hidden rounded-md bg-slate-200">
          {media?.type === "IMAGE" ? (
            <Image
              src={media.url}
              alt={media.title}
              fill
              className="object-cover"
              onError={(e: any) => {
                e.target.src = "/images/placeholder.jpg";
              }}
              unoptimized
              loading="lazy"
            />
          ) : media?.type === "VIDEO" ? (
            <div className="flex h-full items-center justify-center">
              <FileVideo className="h-8 w-8 text-slate-500" />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <FileX className="h-8 w-8 text-slate-500" />
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categories" />
    ),
    cell: ({ row }) => {
      const categories = row.original.categories || [];
      const displayCategories = categories.slice(0, 3);
      const remainingCount = categories.length - 3;

      return (
        <div className="flex flex-col gap-1">
          {displayCategories.map((cat) => (
            <div
              key={cat.category.id}
              className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800"
            >
              {cat.category.name}
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="text-xs text-muted-foreground">
              +{remainingCount} more
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
    cell: ({ row }) => {
      const content = row.getValue("content") as string;
      return (
        <div className="max-w-[400px] truncate">
          {content.length > 50 ? `${content.substring(0, 50)}...` : content}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Post Date & Time" />
    ),
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "PPpp");
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusCell row={row} />,
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} categories={categories} />
    ),
  },
];

export function DataTableRowActions({
  row,
  categories,
}: {
  row: Row<NewsItem>;
  categories: any[];
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteNews(row.original.id);
      toast.success("News deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete news");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              news item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditNewsDialog
        news={row.original}
        categories={categories}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}
