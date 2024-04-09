import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ViewBody, ViewHeader } from "./views";
import { DocumentForm, DocumentProvider } from "./documents";
import { useAuth, useGetDocument } from "@melony/core";
import { Button } from "@melony/ui/button";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login({
      onSuccess: (data) => {
        navigate("/");
      },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Button onClick={handleLogin}>Continue with Google</Button>
    </div>
  );
}

export function ListPage({}: {}): JSX.Element {
  return (
    <div className="flex flex-col h-screen">
      <ViewHeader />

      <div className="h-full overflow-auto">
        <ViewBody />
      </div>
    </div>
  );
}

export function CreatePage({}: {}): JSX.Element {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-4 px-4 h-[52px] border-b">
        <div className="text-lg">Create doc</div>
      </div>

      <div className="h-full overflow-auto p-4 container mx-auto max-w-5xl">
        <DocumentForm
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      </div>
    </div>
  );
}

export function ShowPage({}: {}): JSX.Element {
  const params = useParams();

  const cSlug = params?.cSlug || "";
  const docId = params?.docId || "";

  const { data: docRes, isLoading } = useGetDocument(cSlug, docId);

  if (isLoading) return <>Loading doc...</>;

  return (
    <DocumentProvider data={docRes?.data}>
      <div className="flex flex-col h-screen">
        <div className="flex items-center gap-4 h-[52px] px-4 border-b">
          <div className="text-lg">Create doc</div>
        </div>

        <div className="h-full overflow-auto p-4 container mx-auto max-w-5xl">
          <DocumentForm
            onSubmit={(data) => {
              console.log(data);
            }}
          />
        </div>
      </div>
    </DocumentProvider>
  );
}

export function SettingsPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-4 px-4 h-[52px] border-b">
        <div className="text-lg">Settings</div>
      </div>
      settings
    </div>
  );
}
