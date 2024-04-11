import { Layout } from "@melony/views";
import Nav from "./nav";
import Account from "./account";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: ChatLayoutProps) {
  return (
    <Layout navigation={<Nav />} account={<Account />}>
      {children}
    </Layout>
  );
}
