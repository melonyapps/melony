"use client";

import React from "react";
import { Field } from "@melony/core";
import { FormField, FormItem, FormLabel, FormMessage } from "@melony/ui";
import { useFormContext } from "react-hook-form";
import { FIELDS_MAP } from "./fields-map";

export function FormFields({ schema }: { schema: Field[] }) {
	const { control } = useFormContext();

	return (
		<div className="flex flex-col">
			{schema.map((schemaField) => {
				const Comp =
					FIELDS_MAP[schemaField?.type || "TEXT"]?.["form"] || (() => <></>);
				const name = schemaField?.label || schemaField.slug;

				return (
					<FormField
						key={schemaField.slug}
						control={control}
						name={schemaField.slug}
						render={({ field }) => {
							return (
								<FormItem>
									<div className="grid grid-cols-12">
										<div className="col-span-3 py-2.5 px-4">
											<FormLabel>{name}</FormLabel>
										</div>
										<div className="col-span-9 py-1.5 px-4">
											<Comp field={field} {...schemaField} />
											<FormMessage />
										</div>
									</div>
								</FormItem>
							);
						}}
					/>
				);
			})}
		</div>
	);
}
