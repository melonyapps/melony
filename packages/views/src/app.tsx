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
import { Layout } from "./components/layout";
import { CollectionWrapper } from "./components/collection-wrapper";

import { ListPage } from "./pages/list";
import { LoginPage } from "./pages/login";
import { CreatePage } from "./pages/create";
import { ShowPage } from "./pages/show";
import { EditPage } from "./pages/edit";
import { MelonyProvider } from "./components/melony-provider";
import { Navigation } from "./components/navigation";
import { AccountPopover } from "./components/account-popover";

type MelonyAppProps = {};

export function MelonyApp({}: MelonyAppProps) {
  return (
    <BrowserRouter>
      <MelonyProvider>
        <Routes>
          <Route path="/" element={<LayoutWrapper />}>
            <Route index element={<></>} />
            <Route path="c/:collectionSlug" element={<CollectionWrapper />}>
              <Route path="v/:viewSlug" element={<Outlet />}>
                <Route index element={<ListPage />} />
                <Route path="d/create" element={<CreatePage />} />
                <Route path="d/show/:documentId" element={<ShowPage />} />
                <Route path="d/edit/:documentId" element={<EditPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<div>Not found.</div>} />
        </Routes>
      </MelonyProvider>
    </BrowserRouter>
  );
}

const LayoutWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout
      navigation={
        <Navigation
          pathname={location.pathname}
          onClickItem={(item) => {
            navigate(item.to);
          }}
        />
      }
      account={
        <AccountPopover
          onLogoutSuccess={() => {
            navigate("/login");
          }}
        />
      }
    >
      <Outlet />
    </Layout>
  );
};
