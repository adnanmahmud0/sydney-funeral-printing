// src/components/login-form.tsx


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import CommonButton from "../button/CommonButton";

// Remove "use client" from the top if it exists!
// This file is now a Server Component

export function LoginForm({ className }: { className?: string }) {
  return (
    <form className={className} action="/api/auth/signin" method="POST">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label className="text-primary" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label className="text-primary" htmlFor="password">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-sm underline-offset-4 hover:underline text-primary"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <CommonButton text={"Login"} href={"/login"} />

        <p className="text-center text-sm text-primary">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
