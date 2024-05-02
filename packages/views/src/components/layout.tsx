"use client";

import * as React from "react";
import { AppShell } from "@melony/ui/app-shell";
import { ProjectContext, useConfig } from "@melony/core/react";
import { Loader2 } from "lucide-react";
import { Navigation as MelonyNavigation } from "./navigation";
import { AccountPopover } from "./account-popover";
import { useMelonyNavigate } from "../hooks/use-melony-navigate";

export function Layout({
  children,
}: {
  children: JSX.Element | React.ReactNode;
}) {
  const navigate = useMelonyNavigate();

  const isLoading = false;

  const {
    config: { id, ui },
  } = useConfig();

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      </div>
    );

  return (
    <ProjectContext.Provider value={{ projectId: id }}>
      <AppShell
        logo={"l"}
        title={ui?.title || "Melony"}
        nav={<MelonyNavigation />}
        account={<AccountPopover />}
      >
        {children}
      </AppShell>
    </ProjectContext.Provider>
  );
}
