"use client";

import Auth from "@/components/auth/Auth";
import { Suspense } from "react";

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      <Auth />
    </Suspense>
  );
}
