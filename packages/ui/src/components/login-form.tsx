"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "./providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { useApp } from "./providers/app-provider";

export function LoginForm() {
	const { handleLogin } = useAuth();
	const { loginAction } = useApp();

	const { mutate: login, isPending } = useMutation({
		mutationKey: ["login"],
		mutationFn: loginAction,
		onSuccess: () => {
			handleLogin();
		},
	});

	const formSchema = z.object({
		email: z.string().min(3),
		password: z.string().min(3),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: "", password: "" },
	});

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		login(data);
	};

	return (
		<Card className="mx-auto min-w-[380px] max-w-lg">
			<CardHeader>
				<CardTitle className="text-lg">Login</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit, console.log)}>
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name={"email"}
								render={({ field }) => {
									return (
										<FormItem>
											<Label htmlFor="email">Email</Label>
											<FormControl>
												<Input id="email" type="email" {...field} required />
											</FormControl>
										</FormItem>
									);
								}}
							/>

							<FormField
								control={form.control}
								name={"password"}
								render={({ field }) => {
									return (
										<FormItem>
											<Label htmlFor="password">Password</Label>
											<FormControl>
												<Input
													id="password"
													type="password"
													{...field}
													required
												/>
											</FormControl>
										</FormItem>
									);
								}}
							/>

							<Button type="submit" className="w-full" disabled={isPending}>
								Login
							</Button>
						</div>
					</form>
				</Form>

				{/* <hr className="my-4" />

				<Button
					variant="outline"
					className="w-full"
					onClick={() =>
						handleLogin({
							provider: "google",
						})
					}
					disabled={isLoading}
				>
					Login with Google
				</Button> */}
			</CardContent>
		</Card>
	);
}
