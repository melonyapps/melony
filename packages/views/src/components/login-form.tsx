import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@melony/ui/form";
import * as React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormFields } from "../components/form/form-fields";
import { Button } from "@melony/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@melony/ui/card";
import { useLogin } from "@melony/core/react";

export function LoginForm() {
  const { mutate: login, isLoading } = useLogin();

  const formSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const handleLogin = () => {
    login(undefined, {
      onSuccess: (res: any) => {
        window.location.href = res?.redirectUrl;
      },
    });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      {/* <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin, (err) => console.log(err))}
            className="space-y-8"
          >
            <FormFields
              fields={[{ key: "username", title: "Username", type: "TEXT" }]}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent> */}
      <CardFooter>
        <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
