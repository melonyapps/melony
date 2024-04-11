"use client";

import { AccountPopover } from "@melony/views";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();

  return (
    <AccountPopover
      onLogoutSuccess={() => {
        router.push("/login");
      }}
    />
  );
}
