// src/components/signup-form.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import CommonButton from "../button/CommonButton";

// This is a Server Component (no "use client" needed)
// Works perfectly with your existing LoginForm

export function SignupForm({ className }: { className?: string }) {
  return (
    <form className={className} action="/api/auth/signup" method="POST">
      <div className="grid gap-6">
        {/* Name Field */}
        <div className="grid gap-2">
          <Label className="text-primary" htmlFor="name">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
          />
        </div>

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

        {/* Password Field */}
        <div className="grid gap-2">
          <Label className="text-primary" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="grid gap-2">
          <Label className="text-primary" htmlFor="confirm-password">
            Confirm Password
          </Label>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Submit Button */}
        <CommonButton text={"Create Account"} href={"/sign-up"} />

        {/* Login Link */}
        <p className="text-center text-sm text-primary">
          Already have an account?{" "}
          <Link href="/login" className="font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}
