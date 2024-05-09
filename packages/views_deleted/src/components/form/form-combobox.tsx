"use client";

import React from "react";
import {
	CollectionProvider,
	useCollection,
	useDocument,
	useSuggestions,
} from "@melony/core";
import { FormControl } from "@melony/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@melony/ui";
import { Button } from "@melony/ui";
import { cn } from "@melony/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@melony/ui";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { DocumentFieldProps } from "@melony/core";
import { Avatar, AvatarImage } from "@melony/ui";
import { Badge } from "@melony/ui";

interface IOption {
	label: string;
	value: string;
	image?: string;
	color?: string;
}

export function FormCombobox({
	field,
	collectionSlug,
	label,
}: {
	field: ControllerRenderProps<FieldValues, string>;
} & DocumentFieldProps) {
	return (
		<CollectionProvider slug={collectionSlug}>
			<FormComboboxContent field={field} label={label || ""} />
		</CollectionProvider>
	);
}

const FormComboboxContent = ({
	field,
	label,
}: {
	field: ControllerRenderProps<FieldValues, string>;
	label: string;
}) => {
	const { slug: collectionSlug, data: collectionData } = useCollection();
	const { data: docData } = useDocument();
	const [open, setOpen] = React.useState(false);

	const fullFieldDoc = docData?.[`${field.name}_full`] || {};

	const image = collectionData?.image
		? fullFieldDoc?.[collectionData?.image]
		: fullFieldDoc?.image;

	const {
		data: suggestions = {
			docs: [],
			meta: { currentCollection: { fields: [] } },
		},
		isLoading,
	} = useSuggestions({
		collectionSlug,
	});

	const options: IOption[] = suggestions.docs.map((doc: any) => {
		const title = collectionData?.title
			? doc?.[collectionData?.title]
			: doc?.title;

		const image = collectionData?.image
			? doc?.[collectionData?.image]
			: doc?.image;

		return {
			label: title,
			value: doc._id,
			image,
			color: doc?.[collectionData?.color || "color"],
		};
	});

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant="outline"
						role="combobox"
						className={cn(
							"w-[280px] justify-between px-1.5",
							!field.value && "text-muted-foreground",
						)}
					>
						{/* <div className="flex items-center min-w-0">
							{image && (
								<Avatar className="h-5 w-5 mr-2">
									<AvatarImage src={image} />
								</Avatar>
							)}
							<span className="block truncate">
								{field.value
									? options.find((option) => option.value === field.value)
											?.label
									: "- Select"}
							</span>
						</div> */}

						<Badge
							variant="secondary"
							color={fullFieldDoc?.[collectionData?.color || "color"]}
						>
							<div className="flex items-center">
								{image && (
									<Avatar className="h-5 w-5 mr-2">
										<AvatarImage src={image} />
									</Avatar>
								)}
								{field.value
									? options.find((option) => option.value === field.value)
											?.label
									: "- Select"}
							</div>
						</Badge>

						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="p-0" align="start">
				<Command label={label}>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandEmpty>{isLoading ? "Loading..." : "Empty."}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(val) => {
										field.onChange(val);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											option.value === field.value
												? "opacity-100"
												: "opacity-0",
										)}
									/>

									<Badge variant="secondary" color={option?.color}>
										<div className="flex items-center">
											{option?.image && (
												<Avatar className="h-5 w-5 mr-2">
													<AvatarImage src={option.image} />
												</Avatar>
											)}
											{option.label}
										</div>
									</Badge>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
