"use client";

import { Navigation } from "@melony/views";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  return (
    <Navigation
      onClickItem={(item) => {
        router.push(item.to);
      }}
    />
  );
}
