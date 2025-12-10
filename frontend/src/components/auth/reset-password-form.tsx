// src/components/reset-password-form.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import CommonButton from "../button/CommonButton";

// Server Component (no "use client" needed)

export function ResetPasswordForm({ className }: { className?: string }) {
  return (
    <form className={className} action="/api/auth/reset-password" method="POST">
      <div className="grid gap-6">
        {/* Email Field */}
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

        {/* Submit Button */}
        <CommonButton text={"Send Reset Link"} href={"/reset-password"} />

        {/* Back to Login Link */}
        <p className="text-center text-sm text-primary">
          Remember your password?{" "}
          <Link href="/login" className="font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}
