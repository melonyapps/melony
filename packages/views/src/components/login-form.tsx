"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@melony/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@melony/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@melony/ui/card";
import { useLogin } from "@melony/core/react";
import { Label } from "@melony/ui/label";
import { Input } from "@melony/ui/input";
import { useMelonyNavigate } from "../hooks/use-melony-navigate";

export function LoginForm() {
  const navigate = useMelonyNavigate();
  const { mutate: login, isLoading } = useLogin();

  const formSchema = z.object({
    email: z.string().min(3).optional(),
    password: z.string().min(3).optional(),
    provider: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = (data?: z.infer<typeof formSchema>) => {
    login(data, {
      onSuccess: (res: any) => {
        if (res?.err) {
          // TODO: set error message
        }

        if (res?.success) {
          navigate("/");
        }

        if (res?.redirectUrl) {
          window.location.href = res?.redirectUrl;
        }
      },
    });
  };

  return (
    <Card className="mx-auto min-w-[380px] max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        {/* <CardDescription>
          Enter your email below to login to your account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin, console.log)}>
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                Login
              </Button>
            </div>
          </form>
        </Form>

        <hr className="my-4" />

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
        </Button>
      </CardContent>
    </Card>
  );
}
