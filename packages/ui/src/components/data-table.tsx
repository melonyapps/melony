import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowWrapper?: any;
  isLoading?: boolean;
  onClickRow: (data: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowWrapper,
  isLoading,
  onClickRow,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const RowWrapperComponent = rowWrapper || <></>;

  const renderBody = () => {
    if (isLoading)
      return Array.from([1, 2, 3, 4]).map((item) => (
        <TableRow key={item}>
          {columns.map((cell, i) => (
            <TableCell key={i}>
              <Skeleton className="h-4 w-[220px]" />
            </TableCell>
          ))}
        </TableRow>
      ));

    return table.getRowModel().rows?.length ? (
      table.getRowModel().rows.map((row) => (
        <RowWrapperComponent data={row.original} key={row.id}>
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            onClick={() => {
              onClickRow(row.original);
            }}
            className="cursor-pointer"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        </RowWrapperComponent>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="hover:bg-[transparent]">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="truncate">
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
      <TableBody>{renderBody()}</TableBody>
    </Table>
  );
}
