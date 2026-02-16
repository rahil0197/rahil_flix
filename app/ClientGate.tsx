"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ClientGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const profile = localStorage.getItem("rsf_profile");
    const isProfiles = pathname === "/profiles";
    if (!profile && !isProfiles) router.replace("/profiles");
  }, [pathname, router]);

  return <>{children}</>;
}
