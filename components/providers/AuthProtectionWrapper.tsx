"use client";

import { useAuthProtection } from "@/hooks/useAuthProtection";

export default function AuthProtectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use the hook to handle auth protection
  useAuthProtection();

  return <>{children}</>;
}
