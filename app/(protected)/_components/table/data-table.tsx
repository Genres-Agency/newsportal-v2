"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User2,
  Shield,
  Crown,
  PenTool,
  Ban,
  Eye,
  EyeOff,
  ListFilter,
  Folder,
  Folders,
} from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  filterKey?: string;
  filterOptions?: {
    label: string;
    value: string;
    iconName?: string;
  }[];
  categoryOptions?: {
    label: string;
    value: string;
  }[];
  searchPlaceholder?: string;
  filterPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  filterKey,
  filterOptions,
  categoryOptions,
  searchPlaceholder = "Search...",
  filterPlaceholder = "Filter...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      user: <User2 className="h-4 w-4 text-muted-foreground" />,
      shield: <Shield className="h-4 w-4 text-muted-foreground" />,
      crown: <Crown className="h-4 w-4 text-muted-foreground" />,
      pen: <PenTool className="h-4 w-4 text-muted-foreground" />,
      ban: <Ban className="h-4 w-4 text-muted-foreground" />,
      eye: <Eye className="h-4 w-4 text-muted-foreground" />,
      eyeOff: <EyeOff className="h-4 w-4 text-muted-foreground" />,
    };
    return icons[iconName] || null;
  };

  return (
    <div>
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder={searchPlaceholder}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {filterKey && filterOptions && (
          <Select
            onValueChange={(value) =>
              table
                .getColumn(filterKey)
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={filterPlaceholder} />
            </SelectTrigger>
            <SelectContent align="start" className="w-[180px]">
              <SelectItem value="all" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4 text-muted-foreground" />
                  <p>All</p>
                </div>
              </SelectItem>
              {filterOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    {option.iconName && getIcon(option.iconName)}
                    <p>{option.label}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {categoryOptions && (
          <Select
            onValueChange={(value) =>
              table
                .getColumn("category")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent align="start" className="min-w-[180px]">
              <SelectItem value="all" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Folders className="h-4 w-4 text-muted-foreground" />
                  <p>All Categories</p>
                </div>
              </SelectItem>
              {categoryOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-muted-foreground" />
                    <p>{option.label}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
