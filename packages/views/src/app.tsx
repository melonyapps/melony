"use client";

import * as React from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useParams } from "next/navigation";
import { CollectionProvider, DocumentProvider } from "@melony/core/react";
import { Card } from "@melony/ui/card";

import { ListPage } from "./pages/list";
import { LoginPage } from "./pages/login";
import { CreatePage } from "./pages/create";
import { ShowPage } from "./pages/show";
import { EditPage } from "./pages/edit";

import { Layout } from "./components/layout";
import { MelonyProvider } from "./components/melony-provider";
import { Navigation } from "./components/navigation";
import { AccountPopover } from "./components/account-popover";
import { Table } from "./components/table";
import { useMelonyParams } from "./hooks/use-melony-params";
import { Stack } from "./components/stack";
import { Heading } from "./components/heading";
import { Between } from "./components/between";
import { CreateButton } from "./components/create-button";
import { SearchInput } from "./components/search-input";
import { AdvancedFilter } from "./components/advanced-filter";
import { Sort } from "./components/sort";
import { Container } from "./components/container";
import { DocumentHeading } from "./components/document-heading";
import { DocumentDetails } from "./components/document-details";
import { DocumentForm } from "./components/document-form";
import { DocumentSubcollections } from "./components/document-subcollections";
import { EditButton } from "./components/edit-button";
import { View } from "./components/view";
import { useMelonyPathname } from "./hooks/use-melony-pathname";

type MelonyAppProps = {};

// export function MelonyApp({}: MelonyAppProps) {
//   return (
//     <BrowserRouter>
//       <MelonyProvider>
//         <Routes>
//           <Route path="/" element={<LayoutWrapper />}>
//             <Route index element={<></>} />
//             <Route path="c/:collectionSlug" element={<CollectionWrapper />}>
//               <Route path="v/:viewSlug" element={<Outlet />}>
//                 <Route index element={<ListPage />} />
//                 <Route path="d/create" element={<CreatePage />} />
//                 <Route path="d/show/:documentId" element={<ShowPage />} />
//                 <Route path="d/edit/:documentId" element={<EditPage />} />
//               </Route>
//             </Route>
//           </Route>
//           <Route path="login" element={<LoginPage />} />
//           <Route path="*" element={<div>Not found.</div>} />
//         </Routes>
//       </MelonyProvider>
//     </BrowserRouter>
//   );
// }

export function MelonyApp({}: MelonyAppProps) {
  const { params } = useMelonyParams();
  const pathname = useMelonyPathname();

  const renderView = () => {
    return <Table />;
  };

  const renderContent = () => {
    if (params) {
      switch (params.length) {
        // c/:collectionSlug/v/:viewSlug
        case 4:
          return (
            <Layout>
              <CollectionProvider
                slug={params[1] as string}
                viewSlug={params[3]}
              >
                <Container>
                  <Stack horizontal gapSize="sm">
                    <Heading>პროექტები</Heading>
                    <Between />
                    <CreateButton />
                  </Stack>

                  <Stack horizontal gapSize="sm">
                    <SearchInput />
                    <AdvancedFilter />
                    <Sort />
                  </Stack>

                  <View />
                </Container>
              </CollectionProvider>
            </Layout>
          );

        // c/:collectionSlug/v/:viewSlug/d/:docId|create
        case 6:
          if (params[5] === "create") {
            return (
              <Layout>
                <CollectionProvider slug={params[1] as string}>
                  <Container>
                    <Stack horizontal gapSize="sm">
                      <Heading>Create</Heading>
                    </Stack>

                    <DocumentForm />
                  </Container>
                </CollectionProvider>
              </Layout>
            );
          }

          return (
            <Layout>
              <CollectionProvider slug={params[1] as string}>
                <DocumentProvider id={params[5] as string}>
                  <Container>
                    <Stack horizontal gapSize="sm">
                      <DocumentHeading />
                      <Between />
                      <EditButton />
                    </Stack>

                    <Card>
                      <DocumentDetails />
                    </Card>

                    <DocumentSubcollections />
                  </Container>
                </DocumentProvider>
              </CollectionProvider>
            </Layout>
          );

        case 7:
          return (
            <Layout>
              <CollectionProvider slug={params[1] as string}>
                <DocumentProvider id={params[6]}>
                  <Container>
                    <Stack horizontal gapSize="sm">
                      <Heading>Edit</Heading>
                    </Stack>

                    <DocumentForm />
                  </Container>
                </DocumentProvider>
              </CollectionProvider>
            </Layout>
          );

        case 1:
          switch (pathname) {
            case "/login":
              return (
                <div className="h-screen">
                  <LoginPage />
                </div>
              );

            default:
              return <>Not found</>;
          }

        default:
          return <>Not found</>;
      }
    }

    return <Layout>{""}</Layout>;
  };

  return <MelonyProvider>{renderContent()}</MelonyProvider>;
}
