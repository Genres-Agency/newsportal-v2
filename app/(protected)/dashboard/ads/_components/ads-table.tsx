"use client";

import { Advertisement } from "@prisma/client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteAdvertisement, updateAdvertisement } from "../ads-action";
import { useRouter } from "next/navigation";

interface AdsTableProps {
  ads: (Advertisement & {
    media: {
      url: string;
      type: string;
    };
  })[];
}

export const AdsTable = ({ ads }: AdsTableProps) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deleteAdvertisement(id);
      toast.success("Advertisement deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete advertisement");
    }
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "PUBLISHED" ? "PRIVATE" : "PUBLISHED";
      await updateAdvertisement(id, { status: newStatus });
      toast.success("Status updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Media</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Variant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Campaign Period</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ads.map((ad) => (
            <TableRow key={ad.id}>
              <TableCell>
                <div className="relative h-20 w-20">
                  <Image
                    src={ad.media.url}
                    alt={ad.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </TableCell>
              <TableCell>{ad.title}</TableCell>
              <TableCell>
                <Badge variant="outline">{ad.variant}</Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant={ad.status === "PUBLISHED" ? "default" : "secondary"}
                  size="sm"
                  onClick={() => handleStatusChange(ad.id, ad.status)}
                >
                  {ad.status}
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    Start: {format(new Date(ad.startDate!), "MMM dd, yyyy")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    End: {format(new Date(ad.endDate!), "MMM dd, yyyy")}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push(`/dashboard/ads/${ad.id}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(ad.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
