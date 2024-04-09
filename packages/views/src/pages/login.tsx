import * as React from "react";
import { LoginForm } from "../components/login-form";

export function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginForm />
    </div>
  );
}
