"use client";

import * as React from "react";
import { Button } from "@melony/ui";
import { SortingProps, useCollection } from "@melony/core";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@melony/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@melony/ui";
import { ArrowUpDown } from "lucide-react";

export function Sort() {
	const [sortIsOpen, setSortIsOpen] = React.useState(false);

	const { schema, params, sort } = useCollection();

	return (
		<Popover open={sortIsOpen} onOpenChange={setSortIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline">
					<ArrowUpDown className="h-4 w-4 mr-2" />
					Sort
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-2" align="start">
				<div className="flex gap-2">
					<div className="flex-1">
						<Select
							value={params?.sort?.field}
							onValueChange={(value) =>
								sort({
									field: value,
									direction: params?.sort?.direction || "desc",
								})
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="- Sort" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{schema.map((field) => {
										return (
											<SelectItem key={field.slug} value={field.slug}>
												{field?.label || field.slug}
											</SelectItem>
										);
									})}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div>
						<Select
							value={params?.sort?.direction}
							onValueChange={(value: SortingProps["direction"]) =>
								sort({
									field: params?.sort?.field || "unknown",
									direction: value,
								})
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="- Dir" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value={"asc"}>ASC</SelectItem>
									<SelectItem value={"desc"}>DESC</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
