"use client";

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
import React from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	onClickRow: (data: TData) => void;
	onSelect?: (old: any) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading,
	onClickRow,
	onSelect,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: (val) => {
			setRowSelection(val);
			onSelect && onSelect(val);
		},
		state: {
			rowSelection,
		},
	});

	const renderBody = () => {
		if (isLoading)
			return Array.from([1, 2, 3]).map((item) => (
				<TableRow key={item}>
					{columns.map((cell, i) => (
						<TableCell key={i}>
							<Skeleton className="h-4 w-full" />
						</TableCell>
					))}
				</TableRow>
			));

		return table.getRowModel().rows?.length ? (
			table.getRowModel().rows.map((row) => (
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
												header.getContext(),
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
