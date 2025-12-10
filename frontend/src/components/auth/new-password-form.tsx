// src/components/new-password-form.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import CommonButton from "../button/CommonButton";

export function NewPasswordForm({ className }: { className?: string }) {
  return (
    <form
      className={className}
      action="/api/auth/set-new-password"
      method="POST"
    >
      <div className="grid gap-6">
        {/* New Password */}
        <div className="grid gap-2">
          <Label className="text-primary" htmlFor="password">
            New Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Confirm New Password */}
        <div className="grid gap-2">
          <Label className="text-primary" htmlFor="confirm-password">
            Confirm New Password
          </Label>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        {/* You can include a hidden token field if needed */}
        {/* <input type="hidden" name="token" value={searchParams.token} /> */}

        <CommonButton text={"Update Password"} href={"/new-password"} />

        <p className="text-center text-sm text-primary">
          Back to{" "}
          <Link href="/login" className="font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}
