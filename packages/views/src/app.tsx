"use client";
import * as React from "react";
import { AuthContext, ConfigProvider, DataContext } from "@melony/core/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { dataProvider as melonyDataProvider } from "@melony/data-provider";
import { authProvider as melonyAuthProvider } from "@melony/auth-provider";
import { ThemeProvider } from "@melony/ui/theme-provider";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { Navigation } from "./components/navigation";
import { AccountPopover } from "./components/account-popover";
import { CollectionWrapper } from "./components/collection-wrapper";

import { ListPage } from "./pages/list";
import { LoginPage } from "./pages/login";
import { SessionProvider } from "next-auth/react";
import { CreatePage } from "./pages/create";
import { ShowPage } from "./pages/show";
import { EditPage } from "./pages/edit";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

type MelonyAppProps = {};

export function MelonyApp({}: MelonyAppProps) {
  const defaultDataProvider = melonyDataProvider({
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
  });

  const defaultAuthProvider = melonyAuthProvider({
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
  });

  return (
    <SessionProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={defaultAuthProvider}>
            <DataContext.Provider value={defaultDataProvider}>
              <ConfigProvider>
                <ThemeProvider>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Layout
                          nav={<Navigation />}
                          account={<AccountPopover />}
                        >
                          <Outlet />
                        </Layout>
                      }
                    >
                      <Route index element={<></>} />
                      <Route
                        path="c/:collectionSlug"
                        element={<CollectionWrapper />}
                      >
                        <Route path="v/:viewSlug" element={<Outlet />}>
                          <Route index element={<ListPage />} />
                          <Route path="d/create" element={<CreatePage />} />
                          <Route
                            path="d/show/:documentId"
                            element={<ShowPage />}
                          />
                          <Route
                            path="d/edit/:documentId"
                            element={<EditPage />}
                          />
                        </Route>
                      </Route>
                    </Route>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="*" element={<div>Not found.</div>} />
                  </Routes>
                </ThemeProvider>
              </ConfigProvider>
            </DataContext.Provider>
          </AuthContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </SessionProvider>
  );
}
