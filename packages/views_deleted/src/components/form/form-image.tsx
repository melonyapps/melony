import React, { ChangeEvent } from "react";
import { InputFieldProps } from "@melony/core";
import { FormControl } from "@melony/ui";
import { Input } from "@melony/ui";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@melony/ui";
import { Button } from "@melony/ui";
import { useUpload } from "@melony/core";

const packFiles = (files: any) => {
	const data = new FormData();

	[...files].map((file, i) => {
		data.append(`files`, file, file.name);
	});

	return data;
};

export function FormImage({
	field,
}: {
	field: ControllerRenderProps<FieldValues, string>;
} & InputFieldProps) {
	const { mutate, isLoading, error } = useUpload();

	const inputRef = React.useRef<HTMLInputElement | null>(null);

	const hanldeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = packFiles(e.currentTarget.files);

		if (data && mutate) {
			mutate(data, {
				onSuccess: (data: any) => {
					field.onChange(data.files?.[0].downloadUrl);
				},
			});
		}
	};

	return (
		<div className="flex gap-4 items-center">
			<Avatar className="rounded-md w-12 h-12">
				<AvatarImage src={field.value} />
				<AvatarFallback></AvatarFallback>
			</Avatar>
			<FormControl>
				<div>
					<Input
						ref={inputRef}
						type="file"
						onChange={hanldeUpload}
						className="hidden"
					/>
					<Button
						type="button"
						size="sm"
						variant="secondary"
						disabled={isLoading}
						onClick={() => {
							inputRef.current && inputRef.current.click();
						}}
					>
						Upload
					</Button>
				</div>
			</FormControl>
		</div>
	);
}
