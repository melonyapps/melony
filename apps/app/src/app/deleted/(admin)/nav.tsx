"use client";

import { Navigation } from "@melony/views";
import { usePathname, useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Navigation
      pathname={pathname}
      onClickItem={(item) => {
        router.push(item.to);
      }}
    />
  );
}
