import * as React from "react";
import {
  AuthContext,
  AuthProviderProps,
  DataContext,
  DataProviderProps,
} from "@melony/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@melony/ui/theme-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@melony/ui/accordion";
import { ProjectProvider, ProjectsPopover } from "./projects";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { useLocalStorage } from "../../ui/src/hooks";
import { CollectionsNav } from "./collections";
import { ViewLayout, ViewsNav } from "./views";
import {
  CreatePage,
  ListPage,
  LoginPage,
  SettingsPage,
  ShowPage,
} from "./pages";
import { AccountPopover } from "./auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

export function MelonyStudio({
  authProvider,
  dataProvider,
}: {
  authProvider: AuthProviderProps;
  dataProvider: DataProviderProps;
}) {
  const [selectedProjectId, setSelectedProjectId] = useLocalStorage({
    key: "selected-project-id",
    defaultValue: "",
  });

  const [extendedSections, setExtendedSections] = useLocalStorage<string[]>({
    key: "collapsed-sections",
    defaultValue: ["views", "collections"],
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={authProvider}>
          <DataContext.Provider value={dataProvider}>
            <ThemeProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProjectProvider projectId={selectedProjectId}>
                      <Layout
                        title={
                          <ProjectsPopover
                            selectedId={selectedProjectId}
                            onClickProject={setSelectedProjectId}
                          />
                        }
                        nav={
                          <Accordion
                            type="multiple"
                            className="w-full"
                            defaultValue={extendedSections}
                            onValueChange={setExtendedSections}
                          >
                            <AccordionItem value="views">
                              <AccordionTrigger>Views</AccordionTrigger>
                              <AccordionContent>
                                <ViewsNav />
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="collections">
                              <AccordionTrigger>Collections</AccordionTrigger>
                              <AccordionContent>
                                <CollectionsNav />
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        }
                        account={<AccountPopover />}
                      >
                        <Outlet />
                      </Layout>
                    </ProjectProvider>
                  }
                >
                  <Route index element={<></>} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route
                    path="p/:projectId"
                    element={
                      <ViewLayout>
                        <Outlet />
                      </ViewLayout>
                    }
                  >
                    <Route path="c/:cSlug">
                      <Route path="v/:vSlug" element={<Outlet />}>
                        <Route index element={<ListPage />} />
                        <Route path="create" element={<CreatePage />} />
                        <Route path=":docId" element={<ShowPage />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<div>Not found.</div>} />
              </Routes>
            </ThemeProvider>
          </DataContext.Provider>
        </AuthContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
