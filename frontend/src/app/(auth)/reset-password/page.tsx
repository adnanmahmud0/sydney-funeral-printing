import { LoginForm } from "@/components/auth/login-form";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import Logo from "@/components/logo/Logo";

export default function ResetPassword() {
  return (
    <>
      <div className="text-center">
        {/* Top logo */}
        <Logo />
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Reset Password
        </h1>
        <p className="mt-2 text-primary">
          Enter your email and we&apos;ll send you a link to reset your password
        </p>
      </div>

      <ResetPasswordForm className="mt-8" />
    </>
  );
}
