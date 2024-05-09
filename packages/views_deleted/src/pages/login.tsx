import * as React from "react";
import { LoginForm } from "../components/login-form";
import { useConfig } from "@melony/core";

export function LoginPage() {
	const {
		config: { ui },
	} = useConfig();

	return (
		<div className="flex flex-col gap-10 items-center justify-center w-full h-full">
			<div className="font-semibold text-2xl">{ui?.title || "Melony"}</div>
			<LoginForm />
		</div>
	);
}
