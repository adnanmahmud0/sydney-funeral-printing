
import { NewPasswordForm } from "@/components/auth/new-password-form";
import Logo from "@/components/logo/Logo";

export default function SetNewPassword() {
  return (
    <>
      <div className="text-center">
        {/* Top logo */}
        <Logo />
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Welcome back
        </h1>
        <p className="mt-2 text-primary">
          Enter your credentials to access your account
        </p>
      </div>

      <NewPasswordForm className="mt-8" />
    </>
  );
}
