// app/(auth)/layout.tsx

import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* ← LEFT SIDE: Beautiful full-screen image */}
      <div className="relative hidden lg:block">
        <img
          src="/auth/auth-banner.png"
          alt="Welcome to Acme Inc"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
        />
      </div>

      {/* ← RIGHT SIDE: Form + logo */}
      <div className="flex flex-col justify-between bg-background">
        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center px-8">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Optional footer */}
        <div className="p-8 text-center text-sm text-primary ">
          © 2025 Acme Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
}
